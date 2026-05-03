/**
 * Awesome Slider - Frontend JavaScript
 * Initializes Slick Slider with animations
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    function initAwesomeSlider() {
        // Check if jQuery is available
        if (typeof jQuery === 'undefined') {
            console.warn('Awesome Slider: jQuery is not loaded');
            return;
        }

        // Check if Slick is available
        if (typeof jQuery.fn.slick === 'undefined') {
            console.warn('Awesome Slider: Slick Slider is not loaded');
            return;
        }

        var $ = jQuery;

        // Awesome_Block Slider
        function initAwesome_BlockSliders() {
            $('.awesome_block_banner__slider .slider:not(.slick-initialized)').each(
            function () {
                var $this = $(this);

                // Destroy any existing instance first
                if ($this.hasClass('slick-initialized')) {
                    $this.slick('unslick');
                }

                // Get settings from data attributes
                var autoplay = $this.data('autoplay') === 'yes';
                var autoplaySpeed = parseInt($this.data('autoplay-speed')) || 5000;
                var speed = parseInt($this.data('animation-speed')) || 800;
                var showArrow = $this.data('show-arrow') === 'yes';
                var showDots = $this.data('show-dots') === 'yes';

                // Initialize slick slider with correct settings
                $this.slick({
                    autoplay: autoplay,
                    autoplaySpeed: autoplaySpeed,
                    speed: speed,
                    arrows: showArrow,
                    dots: showDots,
                    prevArrow: '<div class="slick-nav prev-arrow"><i></i></div>',
                    nextArrow: '<div class="slick-nav next-arrow"><i></i></div>',
                    pauseOnHover: false,
                    lazyLoad: 'progressive',
                });

                // Initialize animations for first slide with proper timing
                setTimeout(function () {
                    initSlideAnimations($this.find('.slick-active'));
                    $this.find('.slick-active .slide__img img').addClass('zooming');
                }, 100);

                // Handle slide changes with proper animation sequence
                $this.on(
                    'beforeChange',
                    function (event, slick, currentSlide, nextSlide) {
                        // Reset animations on all slides
                        resetSlideAnimations($(slick.$slides));
                    }
                );

                $this.on('afterChange', function (event, slick, currentSlide) {
                    // Initialize animations on current slide with slight delay for smooth transition
                    setTimeout(function () {
                        initSlideAnimations($(slick.$slides[currentSlide]));
                    }, 100);

                    // Add zooming effect to current slide image
                    $(slick.$slides[currentSlide])
                        .find('.slide__img img')
                        .addClass('zooming');

                    // Remove zooming from other slides
                    $(slick.$slides)
                        .not(slick.$slides[currentSlide])
                        .find('.slide__img img')
                        .removeClass('zooming');
                });
            }
            );

            // Handle arrow click animations
            $(document)
                .off('click', '.slick-nav')
                .on('click', '.slick-nav', function (e) {
                    var $arrow = $(this);

                    // Add animation class
                    $arrow.addClass('animate');
                    setTimeout(function () {
                        $arrow.removeClass('animate');
                    }, 0); // Match the animation duration from CSS
                });
        }

        function resetSlideAnimations($slides) {
            $slides.each(function () {
                var $slide = $(this);
                // Reset all content to hidden state
                $slide.find('.slide__content').css({
                    opacity: 0,
                });

                // Reset individual animation elements
                $slide.find('[data-animation-in]').each(function () {
                    var $element = $(this);
                    var animationName = $element.data('animation-in');
                    $element.removeClass('animated ' + animationName).css({
                        opacity: 0,
                        transform: getInitialTransform(animationName),
                    });
                });
            });
        }

        function getInitialTransform(animationName) {
            // Set initial transform based on animation type
            switch (animationName) {
                case 'fadeInUp':
                    return 'translate3d(0, 40px, 0)';
                case 'fadeInDown':
                    return 'translate3d(0, -40px, 0)';
                case 'fadeInLeft':
                    return 'translate3d(-40px, 0, 0)';
                case 'fadeInRight':
                    return 'translate3d(40px, 0, 0)';
                default:
                    return 'translate3d(0, 0, 0)';
            }
        }

        function initSlideAnimations($slide) {
            // First show the slide content container
            $slide.find('.slide__content').animate(
                {
                    opacity: 1,
                },
                300
            );

            // Then animate elements with proper sequencing
            $slide.find('[data-animation-in]').each(function (index) {
                var $element = $(this);
                var animationName = $element.data('animation-in');
                var delayIn = parseFloat($element.data('delay-in')) || 0;
                var baseDelay = 300; // Base delay for the sequence
                var finalDelay = baseDelay * index + delayIn * 1000;

                setTimeout(function () {
                    $element
                        .css({
                            opacity: 1,
                            transform: 'translate3d(0, 0, 0)',
                            transition: 'opacity 0.8s ease, transform 0.8s ease',
                        })
                        .addClass('animated ' + animationName);
                }, finalDelay);
            });
        }

        // Initial initialization
        initAwesome_BlockSliders();

        // Re-init on window resize
        $(window).on('resize', function () {
            setTimeout(initAwesome_BlockSliders, 300);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAwesomeSlider);
    } else {
        initAwesomeSlider();
    }

    // Also initialize for Elementor live preview
    if (typeof elementor !== 'undefined') {
        elementor.hooks.addAction(
            'panel/open_editor/widget/awesome-slider',
            function () {
                setTimeout(initAwesomeSlider, 300);
            }
        );

        elementor.channels.editor.on('change', function () {
            setTimeout(initAwesomeSlider, 300);
        });

        elementor.on('preview:loaded', function () {
            setTimeout(initAwesomeSlider, 300);
        });

        elementor.channels.editor.on('section:activated', function () {
            setTimeout(initAwesomeSlider, 300);
        });
    }
})();
