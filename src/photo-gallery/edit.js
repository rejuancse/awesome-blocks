/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    ToggleControl,
    Button,
    Dashicon,
    TextControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        images = [],
        columns = 3,
        gutter = 10,
        imageSize = 'medium_large',
        enableLightbox = true,
        enableCaptions = true,
        borderRadius = 8,
        hoverEffect = 'zoom',
        aspectRatio = 'landscape',
    } = attributes;

    const blockProps = useBlockProps();

    const onAddImages = (newImages) => {
        const formattedImages = newImages.map((media) => ({
            id: media.id,
            url: media.url,
            alt: media.alt || '',
            caption: media.caption || '',
        }));
        setAttributes({ images: [...images, ...formattedImages] });
    };

    const onRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setAttributes({ images: newImages });
    };

    const onUpdateImageCaption = (index, caption) => {
        const newImages = [...images];
        newImages[index].caption = caption;
        setAttributes({ images: newImages });
    };

    const onUpdateImageAlt = (index, alt) => {
        const newImages = [...images];
        newImages[index].alt = alt;
        setAttributes({ images: newImages });
    };

    const moveImage = (fromIndex, toIndex) => {
        const newImages = [...images];
        const [movedImage] = newImages.splice(fromIndex, 1);
        newImages.splice(toIndex, 0, movedImage);
        setAttributes({ images: newImages });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Gallery Settings', 'zepblocks' )} initialOpen={true}>
                    <RangeControl
                        label={__('Columns', 'zepblocks' )}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1}
                        max={6}
                    />

                    <RangeControl
                        label={__('Gutter Spacing (px)', 'zepblocks' )}
                        value={gutter}
                        onChange={(value) => setAttributes({ gutter: value })}
                        min={0}
                        max={50}
                    />

                    <RangeControl
                        label={__('Border Radius (px)', 'zepblocks' )}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />

                    <SelectControl
                        label={__('Image Size', 'zepblocks' )}
                        value={imageSize}
                        options={[
                            { label: __('Thumbnail', 'zepblocks' ), value: 'thumbnail' },
                            { label: __('Medium', 'zepblocks' ), value: 'medium' },
                            { label: __('Medium Large', 'zepblocks' ), value: 'medium_large' },
                            { label: __('Large', 'zepblocks' ), value: 'large' },
                            { label: __('Full', 'zepblocks' ), value: 'full' },
                        ]}
                        onChange={(value) => setAttributes({ imageSize: value })}
                    />

                    <SelectControl
                        label={__('Aspect Ratio', 'zepblocks' )}
                        value={aspectRatio}
                        options={[
                            { label: __('Landscape (4:3)', 'zepblocks' ), value: 'landscape' },
                            { label: __('Portrait (3:4)', 'zepblocks' ), value: 'portrait' },
                            { label: __('Square (1:1)', 'zepblocks' ), value: 'square' },
                            { label: __('Original', 'zepblocks' ), value: 'original' },
                        ]}
                        onChange={(value) => setAttributes({ aspectRatio: value })}
                    />

                    <SelectControl
                        label={__('Hover Effect', 'zepblocks' )}
                        value={hoverEffect}
                        options={[
                            { label: __('Zoom', 'zepblocks' ), value: 'zoom' },
                            { label: __('Fade', 'zepblocks' ), value: 'fade' },
                            { label: __('Slide', 'zepblocks' ), value: 'slide' },
                            { label: __('None', 'zepblocks' ), value: 'none' },
                        ]}
                        onChange={(value) => setAttributes({ hoverEffect: value })}
                    />

                    <ToggleControl
                        label={__('Enable Lightbox', 'zepblocks' )}
                        checked={enableLightbox}
                        onChange={() => setAttributes({ enableLightbox: !enableLightbox })}
                    />

                    <ToggleControl
                        label={__('Show Captions', 'zepblocks' )}
                        checked={enableCaptions}
                        onChange={() => setAttributes({ enableCaptions: !enableCaptions })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="pg-gallery-wrap">
                    {images.length === 0 ? (
                        <div className="pg-empty-state">
                            <Dashicon icon="format-gallery" size={60} />
                            <p>{__('No images added yet.', 'zepblocks' )}</p>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onAddImages}
                                    allowedTypes={['image']}
                                    multiple
                                    gallery
                                    value={images.map((img) => img.id)}
                                    render={({ open }) => (
                                        <Button onClick={open} variant="primary" className="pg-upload-btn">
                                            <Dashicon icon="upload" />
                                            {__('Add Images', 'zepblocks' )}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    ) : (
                        <>
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
                                        style={{
                                            borderRadius: `${borderRadius}px`,
                                            overflow: 'hidden',
                                            position: 'relative',
                                        }}
                                    >
                                        <img
                                            src={image.url}
                                            alt={image.alt}
                                            className={`pg-hover-${hoverEffect}`}
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

                                        <div className="pg-item-overlay">
                                            <div className="pg-item-actions">
                                                <Button
                                                    onClick={() => moveImage(index, index - 1)}
                                                    disabled={index === 0}
                                                    isSmall
                                                    showTooltip
                                                    label={__('Move Left', 'zepblocks' )}
                                                >
                                                    <Dashicon icon="arrow-left" />
                                                </Button>
                                                <Button
                                                    onClick={() => moveImage(index, index + 1)}
                                                    disabled={index === images.length - 1}
                                                    isSmall
                                                    showTooltip
                                                    label={__('Move Right', 'zepblocks' )}
                                                >
                                                    <Dashicon icon="arrow-right" />
                                                </Button>
                                                <Button
                                                    onClick={() => onRemoveImage(index)}
                                                    isDestructive
                                                    isSmall
                                                    showTooltip
                                                    label={__('Remove', 'zepblocks' )}
                                                >
                                                    <Dashicon icon="trash" />
                                                </Button>
                                            </div>
                                        </div>

                                        {enableCaptions && image.caption && (
                                            <div className="pg-caption">{image.caption}</div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="pg-add-more">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onAddImages}
                                        allowedTypes={['image']}
                                        multiple
                                        gallery
                                        value={images.map((img) => img.id)}
                                        render={({ open }) => (
                                            <Button onClick={open} variant="secondary">
                                                <Dashicon icon="plus" />
                                                {__('Add More Images', 'zepblocks' )}
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
