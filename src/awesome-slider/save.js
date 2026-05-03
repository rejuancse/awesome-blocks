/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save Component
 */
export default function Save({ attributes }) {
    const {
        slides = [],
        autoplay = true,
        autoplaySpeed = 5000,
        animationSpeed = 800,
        showArrow = true,
        showDots = true,
    } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <section className="awesome_block_banner__slider">
                <div className="slider"
                    data-autoplay={autoplay ? 'yes' : 'no'}
                    data-autoplay-speed={autoplaySpeed}
                    data-animation-speed={animationSpeed}
                    data-show-arrow={showArrow ? 'yes' : 'no'}
                    data-show-dots={showDots ? 'yes' : 'no'}>

                    {slides.map((slide, index) => {
                        const slideContentClass = `slide__content slide__content__${slide.contentPosition}${index === 0 ? ' slick-active' : ''}`;
                        const buttonClass = `btn button-custom ${slide.buttonStyle === 'success' ? 'btn-success text-white' : 'btn-light'}`;
                        const headingClass = `slide__content--headings text-${slide.contentPosition}`;

                        return (
                            <div key={slide.id} className="slide">
                                <div className="slide__img">
                                    {slide.imageUrl && (
                                        <img src={slide.imageUrl} alt={slide.imageAlt || slide.title} />
                                    )}
                                </div>
                                <div className={slideContentClass}>
                                    <div className={headingClass}>
                                        {slide.topTitle && (
                                            <p className="animated top-title" data-animation-in="fadeInUp" data-delay-in="0.3">
                                                {slide.topTitle}
                                            </p>
                                        )}

                                        {slide.title && (
                                            <h2 className="animated title" data-animation-in="fadeInUp">
                                                {slide.title}
                                            </h2>
                                        )}

                                        {slide.buttonText && (
                                            <a
                                                href={slide.buttonUrl}
                                                className={`${buttonClass} animated`}
                                                data-animation-in="fadeInUp">
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
        </div>
    );
}
