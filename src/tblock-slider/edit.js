/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    TextControl,
    ToggleControl,
    SelectControl,
    Button,
    Dashicon,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        slides = [],
        autoplay = true,
        autoplaySpeed = 5000,
        animationSpeed = 800,
        showArrow = true,
        showDots = true,
    } = attributes;

    const blockProps = useBlockProps();
    const sliderRef = useRef(null);
    const isSliderInitialized = useRef(false);

    // Add a new slide
    const addSlide = () => {
        const newSlide = {
            id: Date.now(),
            title: 'New Slide',
            topTitle: 'Subtitle',
            buttonText: 'Learn More',
            buttonUrl: '#',
            buttonStyle: 'success',
            contentPosition: 'center',
            imageUrl: '',
            imageId: 0,
            imageAlt: '',
        };
        setAttributes({ slides: [...slides, newSlide] });
    };

    // Remove a slide
    const removeSlide = (index) => {
        const newSlides = slides.filter((_, i) => i !== index);
        setAttributes({ slides: newSlides });
    };

    // Update slide attribute
    const updateSlide = (index, key, value) => {
        const newSlides = [...slides];
        newSlides[index][key] = value;
        setAttributes({ slides: newSlides });
    };

    // Select image for slide
    const onSelectImage = (index, media) => {
        updateSlide(index, 'imageUrl', media.url);
        updateSlide(index, 'imageId', media.id);
        updateSlide(index, 'imageAlt', media.alt || '');
    };

    // Remove image from slide
    const onRemoveImage = (index) => {
        updateSlide(index, 'imageUrl', '');
        updateSlide(index, 'imageId', 0);
        updateSlide(index, 'imageAlt', '');
    };

    // Initialize Slick Slider in editor
    useEffect(() => {
        if (typeof jQuery !== 'undefined' && typeof jQuery.fn.slick !== 'undefined' && sliderRef.current) {
            const $slider = jQuery(sliderRef.current);

            // Destroy if already initialized
            if ($slider.hasClass('slick-initialized')) {
                $slider.slick('unslick');
            }

            // Initialize Slick
            $slider.slick({
                autoplay: autoplay,
                autoplaySpeed: autoplaySpeed,
                speed: animationSpeed,
                arrows: showArrow,
                dots: showDots,
                prevArrow: '<div class="slick-nav prev-arrow"><i></i></div>',
                nextArrow: '<div class="slick-nav next-arrow"><i></i></div>',
                pauseOnHover: false,
            });

            isSliderInitialized.current = true;
        }

        // Cleanup on unmount
        return () => {
            if (sliderRef.current && typeof jQuery !== 'undefined') {
                const $slider = jQuery(sliderRef.current);
                if ($slider.hasClass('slick-initialized')) {
                    $slider.slick('unslick');
                }
            }
        };
    }, [slides, autoplay, autoplaySpeed, animationSpeed, showArrow, showDots]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Slider Settings', 'theme-blocks' )} initialOpen={true}>
                    <PanelRow>
                        <ToggleControl
                            label={__('Autoplay', 'theme-blocks' )}
                            checked={autoplay}
                            onChange={() => setAttributes({ autoplay: !autoplay })}
                        />
                    </PanelRow>
                    {autoplay && (
                        <PanelRow>
                            <TextControl
                                label={__('Autoplay Speed (ms)', 'theme-blocks' )}
                                type="number"
                                value={autoplaySpeed}
                                onChange={(value) => setAttributes({ autoplaySpeed: parseInt(value) })}
                            />
                        </PanelRow>
                    )}
                    <PanelRow>
                        <TextControl
                            label={__('Animation Speed (ms)', 'theme-blocks' )}
                            type="number"
                            value={animationSpeed}
                            onChange={(value) => setAttributes({ animationSpeed: parseInt(value) })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__('Show Arrows', 'theme-blocks' )}
                            checked={showArrow}
                            onChange={() => setAttributes({ showArrow: !showArrow })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__('Show Dots', 'theme-blocks' )}
                            checked={showDots}
                            onChange={() => setAttributes({ showDots: !showDots })}
                        />
                    </PanelRow>
                </PanelBody>

                <PanelBody title={__('Manage Slides', 'theme-blocks' )} initialOpen={false}>
                    {slides.map((slide, index) => (
                        <div key={slide.id} style={{ marginBottom: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <strong>{__('Slide', 'theme-blocks' )} {index + 1}</strong>
                                {slides.length > 1 && (
                                    <Button
                                        onClick={() => removeSlide(index)}
                                        variant="secondary"
                                        isDestructive
                                        isSmall
                                    >
                                        <Dashicon icon="trash" />
                                    </Button>
                                )}
                            </div>

                            <PanelRow>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => onSelectImage(index, media)}
                                        allowedTypes={['image']}
                                        value={slide.imageId}
                                        render={({ open }) => (
                                            <div>
                                                {!slide.imageUrl ? (
                                                    <Button onClick={open} variant="secondary" isSmall>
                                                        <Dashicon icon="format-image" />
                                                        {__('Upload Image', 'theme-blocks' )}
                                                    </Button>
                                                ) : (
                                                    <div style={{ position: 'relative', display: 'inline-block' }}>
                                                        <img
                                                            src={slide.imageUrl}
                                                            alt={__('Preview', 'theme-blocks' )}
                                                            style={{ maxWidth: '100px', borderRadius: '4px' }}
                                                        />
                                                        <div style={{ marginTop: '5px' }}>
                                                            <Button onClick={open} variant="secondary" isSmall>
                                                                <Dashicon icon="edit" />
                                                            </Button>
                                                            <Button
                                                                onClick={() => onRemoveImage(index)}
                                                                variant="secondary"
                                                                isDestructive
                                                                isSmall
                                                            >
                                                                <Dashicon icon="trash" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </PanelRow>

                            <TextControl
                                label={__('Top Title', 'theme-blocks' )}
                                value={slide.topTitle}
                                onChange={(value) => updateSlide(index, 'topTitle', value)}
                            />
                            <TextControl
                                label={__('Title', 'theme-blocks' )}
                                value={slide.title}
                                onChange={(value) => updateSlide(index, 'title', value)}
                            />
                            <TextControl
                                label={__('Button Text', 'theme-blocks' )}
                                value={slide.buttonText}
                                onChange={(value) => updateSlide(index, 'buttonText', value)}
                            />
                            <TextControl
                                label={__('Button URL', 'theme-blocks' )}
                                value={slide.buttonUrl}
                                onChange={(value) => updateSlide(index, 'buttonUrl', value)}
                            />
                            <SelectControl
                                label={__('Button Style', 'theme-blocks' )}
                                value={slide.buttonStyle}
                                options={[
                                    { label: __('Success (Green)', 'theme-blocks' ), value: 'success' },
                                    { label: __('Light (White)', 'theme-blocks' ), value: 'light' },
                                ]}
                                onChange={(value) => updateSlide(index, 'buttonStyle', value)}
                            />
                            <SelectControl
                                label={__('Content Position', 'theme-blocks' )}
                                value={slide.contentPosition}
                                options={[
                                    { label: __('Left', 'theme-blocks' ), value: 'left' },
                                    { label: __('Center', 'theme-blocks' ), value: 'center' },
                                    { label: __('Right', 'theme-blocks' ), value: 'right' },
                                ]}
                                onChange={(value) => updateSlide(index, 'contentPosition', value)}
                            />
                        </div>
                    ))}

                    <Button
                        onClick={addSlide}
                        variant="primary"
                        style={{ width: '100%', justifyContent: 'center', gap: '8px' }}
                    >
                        <Dashicon icon="plus" />
                        {__('Add Slide', 'theme-blocks' )}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {slides.length === 0 ? (
                    <div className="as-placeholder">
                        <p style={{ textAlign: 'center', padding: '40px', background: '#f9f9f9', borderRadius: '4px' }}>
                            {__('No slides yet. Add slides from the sidebar settings.', 'theme-blocks' )}
                        </p>
                    </div>
                ) : (
                    <section className="theme_block_banner__slider as-editor-preview">
                        <div
                            ref={sliderRef}
                            className="slider"
                            data-autoplay={autoplay ? 'yes' : 'no'}
                            data-autoplay-speed={autoplaySpeed}
                            data-animation-speed={animationSpeed}
                            data-show-arrow={showArrow ? 'yes' : 'no'}
                            data-show-dots={showDots ? 'yes' : 'no'}
                        >
                            {slides.map((slide, index) => {
                                const slideContentClass = `slide__content slide__content__${slide.contentPosition}`;
                                const buttonClass = `btn button-custom ${slide.buttonStyle === 'success' ? 'btn-success text-white' : 'btn-light'}`;
                                const headingClass = `slide__content--headings text-${slide.contentPosition}`;

                                return (
                                    <div key={slide.id} className="slide">
                                        <div className="slide__img">
                                            {slide.imageUrl ? (
                                                <img src={slide.imageUrl} alt={slide.imageAlt || slide.title} />
                                            ) : (
                                                <div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    background: '#e0e0e0',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#999'
                                                }}>
                                                    {__('No Image', 'theme-blocks' )}
                                                </div>
                                            )}
                                        </div>
                                        <div className={slideContentClass}>
                                            <div className={headingClass}>
                                                {slide.topTitle && (
                                                    <p className="top-title">{slide.topTitle}</p>
                                                )}
                                                {slide.title && (
                                                    <h2 className="title">{slide.title}</h2>
                                                )}
                                                {slide.buttonText && (
                                                    <a href={slide.buttonUrl} className={buttonClass}>
                                                        {slide.buttonText}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
