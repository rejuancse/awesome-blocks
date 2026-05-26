/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    TextControl,
    TextareaControl,
    ToggleControl,
    SelectControl,
    Dashicon,
} from '@wordpress/components';

// Common Dashicons list
const DASHICONS = [
    'star-filled', 'heart', 'smiley', 'thumbs-up', 'awards',
    'businessperson', 'cart', 'clipboard', 'database', 'desktop',
    'email', 'flag', 'format-image', 'format-video', 'games',
    'groups', 'hammer', 'heart', 'image-filter', 'info',
    'lightbulb', 'location', 'lock', 'media-code', 'music',
    'networking', 'phone', 'portfolio', 'shield', 'shield-alt',
    'sos', 'sports', 'tablet', 'translation', 'visibility',
    'warning', 'welcome-comments', 'wordpress', 'yes'
];

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        icon = 'star-filled',
        iconLibrary = 'dashicons',
        title = 'Feature Title',
        description = 'Add a compelling description for your feature or service here.',
        link = '',
        openInNewTab = false,
        iconColor = '#667eea',
        iconBgColor = '#f0f4ff',
        alignment = 'left',
        showIcon = true,
        showLink = false,
    } = attributes;

    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Feature Content', 'zepblocks' )} initialOpen={true}>
                    <PanelRow>
                        <SelectControl
                            label={__('Icon', 'zepblocks' )}
                            value={icon}
                            options={DASHICONS.map(d => ({
                                label: d.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                                value: d
                            }))}
                            onChange={(value) => setAttributes({ icon: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Title', 'zepblocks' )}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextareaControl
                            label={__('Description', 'zepblocks' )}
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            rows={3}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Link (Optional)', 'zepblocks' )}
                            value={link}
                            onChange={(value) => setAttributes({ link: value })}
                            placeholder="https://example.com"
                        />
                    </PanelRow>
                    {link && (
                        <PanelRow>
                            <ToggleControl
                                label={__('Open in New Tab', 'zepblocks' )}
                                checked={openInNewTab}
                                onChange={() => setAttributes({ openInNewTab: !openInNewTab })}
                            />
                        </PanelRow>
                    )}
                </PanelBody>

                <PanelBody title={__('Icon Style', 'zepblocks' )} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Icon Colors', 'zepblocks' )}
                        colorSettings={[
                            {
                                value: iconColor,
                                onChange: (color) => setAttributes({ iconColor: color }),
                                label: __('Icon Color', 'zepblocks' ),
                            },
                            {
                                value: iconBgColor,
                                onChange: (color) => setAttributes({ iconBgColor: color }),
                                label: __('Icon Background', 'zepblocks' ),
                            },
                        ]}
                    />
                </PanelBody>

                <PanelBody title={__('Display Options', 'zepblocks' )} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Icon', 'zepblocks' )}
                        checked={showIcon}
                        onChange={() => setAttributes({ showIcon: !showIcon })}
                    />
                    {link && (
                        <ToggleControl
                            label={__('Show Link Button', 'zepblocks' )}
                            checked={showLink}
                            onChange={() => setAttributes({ showLink: !showLink })}
                        />
                    )}
                    <SelectControl
                        label={__('Alignment', 'zepblocks' )}
                        value={alignment}
                        options={[
                            { label: __('Left', 'zepblocks' ), value: 'left' },
                            { label: __('Center', 'zepblocks' ), value: 'center' },
                            { label: __('Right', 'zepblocks' ), value: 'right' },
                        ]}
                        onChange={(value) => setAttributes({ alignment: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className={`fb-feature fb-align-${alignment}`}>
                    <div className="fb-feature-inner">
                        {showIcon && (
                            <div
                                className="fb-icon-wrapper"
                                style={{ backgroundColor: iconBgColor }}
                            >
                                <Dashicon icon={icon} size={40} style={{ color: iconColor }} />
                            </div>
                        )}
                        <div className="fb-content">
                            <h3 className="fb-title">{title}</h3>
                            <p className="fb-description">{description}</p>
                            {showLink && link && (
                                <a
                                    href={link}
                                    className="fb-link"
                                    target={openInNewTab ? '_blank' : '_self'}
                                    rel={openInNewTab ? 'noopener noreferrer' : undefined}
                                >
                                    {__('Learn More →', 'zepblocks' )}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
