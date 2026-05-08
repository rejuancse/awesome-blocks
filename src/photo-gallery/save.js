/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save Component
 */
export default function Save({ attributes }) {
    const {
        images = [],
        columns = 3,
        gutter = 10,
        enableLightbox = true,
        enableCaptions = true,
        borderRadius = 8,
        hoverEffect = 'zoom',
        aspectRatio = 'landscape',
    } = attributes;

    const blockProps = useBlockProps.save({
        'data-columns': columns,
        'data-gutter': gutter,
        'data-enable-lightbox': enableLightbox,
        'data-hover-effect': hoverEffect,
        'data-border-radius': borderRadius,
        'data-aspect-ratio': aspectRatio,
    });

    if (images.length === 0) {
        return null;
    }

    return (
        <div {...blockProps}>
            <div className="pg-gallery-wrap">
                <div
                    className="pg-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: `${gutter}px`,
                    }}
                >
                    {images.map((image, index) => (
                        <div
                            key={image.id || index}
                            className="pg-item"
                            data-index={index}
                            style={{
                                borderRadius: `${borderRadius}px`,
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            <img
                                src={image.url}
                                alt={image.alt || ''}
                                data-src={image.url}
                                data-alt={image.alt || ''}
                                data-caption={image.caption || ''}
                                className={`pg-image pg-hover-${hoverEffect}`}
                                style={{
                                    width: '100%',
                                    height: aspectRatio === 'original' ? 'auto' : '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    aspectRatio: aspectRatio === 'landscape' ? '4/3' :
                                                  aspectRatio === 'portrait' ? '3/4' :
                                                  aspectRatio === 'square' ? '1/1' : 'auto',
                                }}
                            />

                            {enableCaptions && image.caption && (
                                <div className="pg-caption">{image.caption}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
