/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUploadCheck, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, Button, Dashicon } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';

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
    const sliderRef = useRef(null);
    const handleRef = useRef(null);
    const divisorRef = useRef(null);

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
    const handleSliderInput = (e) => {
        const value = e.target.value;
        if (handleRef.current && divisorRef.current) {
            handleRef.current.style.left = value + '%';
            divisorRef.current.style.width = value + '%';
        }
    };

    useEffect(() => {
        if (sliderRef.current && handleRef.current && divisorRef.current) {
            const initialValue = sliderRef.current.value;
            handleRef.current.style.left = initialValue + '%';
            divisorRef.current.style.width = initialValue + '%';
        }
    }, [beforeImageUrl, afterImageUrl]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Before Image', 'zepblocks' )} initialOpen={true}>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectBeforeImage}
                                allowedTypes={['image']}
                                value={beforeImageId}
                                render={({ open }) => (
                                    <div className="zepblocks-media-upload-wrapper">
                                        {!beforeImageUrl ? (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                                className="zepblocks-media-upload-button"
                                            >
                                                <Dashicon icon="format-image" />
                                                {__('Upload Before Image', 'zepblocks' )}
                                            </Button>
                                        ) : (
                                            <div className="zepblocks-media-preview">
                                                <img src={beforeImageUrl} alt={__('Before Image', 'zepblocks' )} />
                                                <div className="zepblocks-media-actions">
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

                <PanelBody title={__('After Image', 'zepblocks' )} initialOpen={true}>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectAfterImage}
                                allowedTypes={['image']}
                                value={afterImageId}
                                render={({ open }) => (
                                    <div className="zepblocks-media-upload-wrapper">
                                        {!afterImageUrl ? (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                                className="zepblocks-media-upload-button"
                                            >
                                                <Dashicon icon="format-image" />
                                                {__('Upload After Image', 'zepblocks' )}
                                            </Button>
                                        ) : (
                                            <div className="zepblocks-media-preview">
                                                <img src={afterImageUrl} alt={__('After Image', 'zepblocks' )} />
                                                <div className="zepblocks-media-actions">
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
                <div className="zepblock-image-wrap">
                    {!beforeImageUrl || !afterImageUrl ? (
                        <div className="zepblock-image-placeholder">
                            <Dashicon icon="format-image" size={40} />
                            <p>{__('Please upload both images to see the comparison slider', 'zepblocks' )}</p>
                        </div>
                    ) : (
                        <div className="zepblock-image-container">
                            <span className="label before-label button">Before</span>
                            <span className="label after-label button">After</span>

                            <div className="zepblock-image-comparison">
                                <figure
                                    className="zepblock-image-figure"
                                    style={{ backgroundImage: `url(${beforeImageUrl})` }}
                                >
                                    <div ref={handleRef} className="zepblock-image-handle"></div>
                                    <div
                                        ref={divisorRef}
                                        className="zepblock-image-divisor"
                                        style={{ backgroundImage: `url(${afterImageUrl})` }}
                                    ></div>
                                </figure>
                                <input
                                    ref={sliderRef}
                                    type="range"
                                    min="0"
                                    max="100"
                                    value="50"
                                    className="zepblock-image-slider"
                                    onInput={handleSliderInput}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
