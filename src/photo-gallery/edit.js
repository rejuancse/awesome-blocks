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
                <PanelBody title={__('Gallery Settings', 'awesome-blocks')} initialOpen={true}>
                    <RangeControl
                        label={__('Columns', 'awesome-blocks')}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1}
                        max={6}
                    />

                    <RangeControl
                        label={__('Gutter Spacing (px)', 'awesome-blocks')}
                        value={gutter}
                        onChange={(value) => setAttributes({ gutter: value })}
                        min={0}
                        max={50}
                    />

                    <RangeControl
                        label={__('Border Radius (px)', 'awesome-blocks')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />

                    <SelectControl
                        label={__('Image Size', 'awesome-blocks')}
                        value={imageSize}
                        options={[
                            { label: __('Thumbnail', 'awesome-blocks'), value: 'thumbnail' },
                            { label: __('Medium', 'awesome-blocks'), value: 'medium' },
                            { label: __('Medium Large', 'awesome-blocks'), value: 'medium_large' },
                            { label: __('Large', 'awesome-blocks'), value: 'large' },
                            { label: __('Full', 'awesome-blocks'), value: 'full' },
                        ]}
                        onChange={(value) => setAttributes({ imageSize: value })}
                    />

                    <SelectControl
                        label={__('Aspect Ratio', 'awesome-blocks')}
                        value={aspectRatio}
                        options={[
                            { label: __('Landscape (4:3)', 'awesome-blocks'), value: 'landscape' },
                            { label: __('Portrait (3:4)', 'awesome-blocks'), value: 'portrait' },
                            { label: __('Square (1:1)', 'awesome-blocks'), value: 'square' },
                            { label: __('Original', 'awesome-blocks'), value: 'original' },
                        ]}
                        onChange={(value) => setAttributes({ aspectRatio: value })}
                    />

                    <SelectControl
                        label={__('Hover Effect', 'awesome-blocks')}
                        value={hoverEffect}
                        options={[
                            { label: __('Zoom', 'awesome-blocks'), value: 'zoom' },
                            { label: __('Fade', 'awesome-blocks'), value: 'fade' },
                            { label: __('Slide', 'awesome-blocks'), value: 'slide' },
                            { label: __('None', 'awesome-blocks'), value: 'none' },
                        ]}
                        onChange={(value) => setAttributes({ hoverEffect: value })}
                    />

                    <ToggleControl
                        label={__('Enable Lightbox', 'awesome-blocks')}
                        checked={enableLightbox}
                        onChange={() => setAttributes({ enableLightbox: !enableLightbox })}
                    />

                    <ToggleControl
                        label={__('Show Captions', 'awesome-blocks')}
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
                            <p>{__('No images added yet.', 'awesome-blocks')}</p>
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
                                            {__('Add Images', 'awesome-blocks')}
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
                                                    label={__('Move Left', 'awesome-blocks')}
                                                >
                                                    <Dashicon icon="arrow-left" />
                                                </Button>
                                                <Button
                                                    onClick={() => moveImage(index, index + 1)}
                                                    disabled={index === images.length - 1}
                                                    isSmall
                                                    showTooltip
                                                    label={__('Move Right', 'awesome-blocks')}
                                                >
                                                    <Dashicon icon="arrow-right" />
                                                </Button>
                                                <Button
                                                    onClick={() => onRemoveImage(index)}
                                                    isDestructive
                                                    isSmall
                                                    showTooltip
                                                    label={__('Remove', 'awesome-blocks')}
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
                                                {__('Add More Images', 'awesome-blocks')}
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
