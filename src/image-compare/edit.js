/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUploadCheck, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, Button, Dashicon } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        beforeImageUrl = '',
        beforeImageId = 0,
        afterImageUrl = '',
        afterImageId = 0,
    } = attributes;

    const blockProps = useBlockProps();

    const onSelectBeforeImage = (media) => {
        setAttributes({
            beforeImageUrl: media.url,
            beforeImageId: media.id,
        });
    };

    const onRemoveBeforeImage = () => {
        setAttributes({
            beforeImageUrl: '',
            beforeImageId: 0,
        });
    };

    const onSelectAfterImage = (media) => {
        setAttributes({
            afterImageUrl: media.url,
            afterImageId: media.id,
        });
    };

    const onRemoveAfterImage = () => {
        setAttributes({
            afterImageUrl: '',
            afterImageId: 0,
        });
    };

    // Handle slider functionality in editor
    useEffect(() => {
        const moveDivisor = () => {
            const slider = document.getElementById('awesome-image-slider');
            const handle = document.getElementById('awesome-image-handle');
            const divisor = document.getElementById('awesome-image-divisor');

            if (slider && handle && divisor) {
                handle.style.left = slider.value + '%';
                divisor.style.width = slider.value + '%';
            }
        };

        moveDivisor();

        const slider = document.getElementById('awesome-image-slider');
        if (slider) {
            slider.addEventListener('input', moveDivisor);
        }

        return () => {
            if (slider) {
                slider.removeEventListener('input', moveDivisor);
            }
        };
    }, [beforeImageUrl, afterImageUrl]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Before Image', 'awesome-blocks')} initialOpen={true}>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectBeforeImage}
                                allowedTypes={['image']}
                                value={beforeImageId}
                                render={({ open }) => (
                                    <div className="ab-media-upload-wrapper">
                                        {!beforeImageUrl ? (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                                className="ab-media-upload-button"
                                            >
                                                <Dashicon icon="format-image" />
                                                {__('Upload Before Image', 'awesome-blocks')}
                                            </Button>
                                        ) : (
                                            <div className="ab-media-preview">
                                                <img src={beforeImageUrl} alt={__('Before Image', 'awesome-blocks')} />
                                                <div className="ab-media-actions">
                                                    <Button
                                                        onClick={open}
                                                        variant="secondary"
                                                        isSmall
                                                    >
                                                        <Dashicon icon="edit" />
                                                    </Button>
                                                    <Button
                                                        onClick={onRemoveBeforeImage}
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
                </PanelBody>

                <PanelBody title={__('After Image', 'awesome-blocks')} initialOpen={true}>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectAfterImage}
                                allowedTypes={['image']}
                                value={afterImageId}
                                render={({ open }) => (
                                    <div className="ab-media-upload-wrapper">
                                        {!afterImageUrl ? (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                                className="ab-media-upload-button"
                                            >
                                                <Dashicon icon="format-image" />
                                                {__('Upload After Image', 'awesome-blocks')}
                                            </Button>
                                        ) : (
                                            <div className="ab-media-preview">
                                                <img src={afterImageUrl} alt={__('After Image', 'awesome-blocks')} />
                                                <div className="ab-media-actions">
                                                    <Button
                                                        onClick={open}
                                                        variant="secondary"
                                                        isSmall
                                                    >
                                                        <Dashicon icon="edit" />
                                                    </Button>
                                                    <Button
                                                        onClick={onRemoveAfterImage}
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
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="awesome-image-wrap">
                    {!beforeImageUrl || !afterImageUrl ? (
                        <div className="awesome-image-placeholder">
                            <Dashicon icon="format-image" size={40} />
                            <p>{__('Please upload both images to see the comparison slider', 'awesome-blocks')}</p>
                        </div>
                    ) : (
                        <div className="awesome-image-container">
                            <span className="label before-label button">Before</span>
                            <span className="label after-label button">After</span>

                            <div className="awesome-image-comparison">
                                <figure
                                    className="awesome-image-figure"
                                    style={{ backgroundImage: `url(${beforeImageUrl})` }}
                                >
                                    <div id="awesome-image-handle" className="awesome-image-handle"></div>
                                    <div
                                        id="awesome-image-divisor"
                                        className="awesome-image-divisor"
                                        style={{ backgroundImage: `url(${afterImageUrl})` }}
                                    ></div>
                                </figure>
                                <input
                                    id="awesome-image-slider"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value="50"
                                    className="awesome-image-slider"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
