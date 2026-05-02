/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    TextControl,
    TextareaControl,
    ToggleControl,
    SelectControl,
    Button,
    Dashicon,
    DatePicker,
    Popover,
} from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        imageUrl = '',
        imageAlt = '',
        imageId = 0,
        tag = '',
        date = '',
        title = '',
        excerpt = '',
        authorName = '',
        authorAvatar = '',
        buttonText = 'Read More →',
        buttonLink = '#',
        openInNewTab = false,
        cardAlignment = 'left',
        showTag = true,
        showDate = true,
        showAuthor = true,
        showExcerpt = true,
        showButton = true,
    } = attributes;

    const blockProps = useBlockProps();

    // Date state for DatePicker
    const [dateValue, setDateValue] = useState(date ? new Date(date) : new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const onSelectImage = (media) => {
        setAttributes({
            imageUrl: media.url,
            imageId: media.id,
            imageAlt: media.alt || imageAlt,
        });
    };

    const onRemoveImage = () => {
        setAttributes({
            imageUrl: '',
            imageId: 0,
            imageAlt: '',
        });
    };

    const onSelectAuthorAvatar = (media) => {
        setAttributes({
            authorAvatar: media.url,
        });
    };

    const onRemoveAuthorAvatar = () => {
        setAttributes({
            authorAvatar: '',
        });
    };

    const datePickerRef = useRef();

    // Close date picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setIsDatePickerOpen(false);
            }
        };

        if (isDatePickerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDatePickerOpen]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Card Content', 'awesome-blocks')} initialOpen={true}>
                    {/* Image Section */}
                    <PanelRow>
                        <label className="components-base-control__label">
                            {__('Card Image', 'awesome-blocks')}
                        </label>
                    </PanelRow>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={imageId}
                                render={({ open }) => (
                                    <div className="ab-media-upload-wrapper">
                                        {!imageUrl ? (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                                className="ab-media-upload-button"
                                            >
                                                <Dashicon icon="format-image" />
                                                {__('Upload Image', 'awesome-blocks')}
                                            </Button>
                                        ) : (
                                            <div className="ab-media-preview">
                                                <img src={imageUrl} alt={__('Preview', 'awesome-blocks')} />
                                                <div className="ab-media-actions">
                                                    <Button
                                                        onClick={open}
                                                        variant="secondary"
                                                        isSmall
                                                    >
                                                        <Dashicon icon="edit" />
                                                    </Button>
                                                    <Button
                                                        onClick={onRemoveImage}
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
                    {imageUrl && (
                        <PanelRow>
                            <TextControl
                                label={__('Image Alt Text', 'awesome-blocks')}
                                value={imageAlt}
                                onChange={(value) => setAttributes({ imageAlt: value })}
                            />
                        </PanelRow>
                    )}

                    <hr />

                    {/* Text Content */}
                    <PanelRow>
                        <TextControl
                            label={__('Tag', 'awesome-blocks')}
                            value={tag}
                            onChange={(value) => setAttributes({ tag: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <div style={{ width: '100%' }} ref={datePickerRef}>
                            <label className="components-base-control__label">
                                {__('Date', 'awesome-blocks')}
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    value={date}
                                    readOnly
                                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        background: '#fff'
                                    }}
                                    placeholder={__('Select a date', 'awesome-blocks')}
                                />
                                {isDatePickerOpen && (
                                    <Popover
                                        position="bottom left"
                                        onClose={() => setIsDatePickerOpen(false)}
                                    >
                                        <DatePicker
                                            currentDate={dateValue}
                                            onChange={(newDate) => {
                                                setDateValue(newDate);
                                                // Format date as "Month Day, Year"
                                                const formattedDate = newDate.toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                });
                                                setAttributes({ date: formattedDate });
                                                setIsDatePickerOpen(false);
                                            }}
                                            onMonthPreviewed={() => {}}
                                        />
                                    </Popover>
                                )}
                            </div>
                        </div>
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Title', 'awesome-blocks')}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextareaControl
                            label={__('Excerpt', 'awesome-blocks')}
                            value={excerpt}
                            onChange={(value) => setAttributes({ excerpt: value })}
                            rows={3}
                        />
                    </PanelRow>

                    <hr />

                    {/* Author Section */}
                    <PanelRow>
                        <label className="components-base-control__label">
                            {__('Author Info', 'awesome-blocks')}
                        </label>
                    </PanelRow>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectAuthorAvatar}
                                allowedTypes={['image']}
                                value={authorAvatar}
                                render={({ open }) => (
                                    <div className="ab-media-upload-wrapper">
                                        {!authorAvatar ? (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                                isSmall
                                            >
                                                <Dashicon icon="format-image" />
                                                {__('Upload Avatar', 'awesome-blocks')}
                                            </Button>
                                        ) : (
                                            <div className="ab-media-preview ab-avatar-preview">
                                                <img src={authorAvatar} alt={__('Avatar', 'awesome-blocks')} />
                                                <div className="ab-media-actions">
                                                    <Button
                                                        onClick={open}
                                                        variant="secondary"
                                                        isSmall
                                                    >
                                                        <Dashicon icon="edit" />
                                                    </Button>
                                                    <Button
                                                        onClick={onRemoveAuthorAvatar}
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
                    <PanelRow>
                        <TextControl
                            label={__('Author Name', 'awesome-blocks')}
                            value={authorName}
                            onChange={(value) => setAttributes({ authorName: value })}
                        />
                    </PanelRow>

                    <hr />

                    {/* Button Section */}
                    <PanelRow>
                        <TextControl
                            label={__('Button Text', 'awesome-blocks')}
                            value={buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Button Link', 'awesome-blocks')}
                            value={buttonLink}
                            onChange={(value) => setAttributes({ buttonLink: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__('Open in New Tab', 'awesome-blocks')}
                            checked={openInNewTab}
                            onChange={() => setAttributes({ openInNewTab: !openInNewTab })}
                        />
                    </PanelRow>
                </PanelBody>

                <PanelBody title={__('Display Options', 'awesome-blocks')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Tag', 'awesome-blocks')}
                        checked={showTag}
                        onChange={() => setAttributes({ showTag: !showTag })}
                    />
                    <ToggleControl
                        label={__('Show Date', 'awesome-blocks')}
                        checked={showDate}
                        onChange={() => setAttributes({ showDate: !showDate })}
                    />
                    <ToggleControl
                        label={__('Show Excerpt', 'awesome-blocks')}
                        checked={showExcerpt}
                        onChange={() => setAttributes({ showExcerpt: !showExcerpt })}
                    />
                    <ToggleControl
                        label={__('Show Author', 'awesome-blocks')}
                        checked={showAuthor}
                        onChange={() => setAttributes({ showAuthor: !showAuthor })}
                    />
                    <ToggleControl
                        label={__('Show Button', 'awesome-blocks')}
                        checked={showButton}
                        onChange={() => setAttributes({ showButton: !showButton })}
                    />
                </PanelBody>

                <PanelBody title={__('Card Alignment', 'awesome-blocks')} initialOpen={false}>
                    <SelectControl
                        label={__('Alignment', 'awesome-blocks')}
                        value={cardAlignment}
                        options={[
                            { label: __('Left', 'awesome-blocks'), value: 'left' },
                            { label: __('Center', 'awesome-blocks'), value: 'center' },
                            { label: __('Right', 'awesome-blocks'), value: 'right' },
                        ]}
                        onChange={(value) => setAttributes({ cardAlignment: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className={`cb-wrap cb-align-${cardAlignment}`}>
                    <div className="cb-card">
                        {imageUrl && (
                            <div className="cb-img-wrap">
                                <img src={imageUrl} alt={imageAlt || title} />
                            </div>
                        )}
                        <div className="cb-body">
                            {(showTag || showDate) && (tag || date) && (
                                <div className="cb-meta">
                                    {showTag && tag && <span className="cb-tag">{tag}</span>}
                                    {showDate && date && <span className="cb-date">{date}</span>}
                                </div>
                            )}
                            {title && <h3 className="cb-title">{title}</h3>}
                            {showExcerpt && excerpt && (
                                <p className="cb-excerpt">{excerpt}</p>
                            )}
                            <div className="cb-footer">
                                {showAuthor && (authorName || authorAvatar) && (
                                    <div className="cb-author">
                                        {authorAvatar && (
                                            <img className="cb-avatar" src={authorAvatar} alt={authorName} />
                                        )}
                                        {authorName && <span className="cb-author-name">{authorName}</span>}
                                    </div>
                                )}
                                {showButton && buttonText && (
                                    <a className="cb-btn" href={buttonLink} target={openInNewTab ? '_blank' : '_self'} rel={openInNewTab ? 'noopener noreferrer' : undefined}>
                                        {buttonText}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
