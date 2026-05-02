/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    TextControl,
    TextareaControl,
    Button,
    Dashicon,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        timelineItems = [],
    } = attributes;

    const blockProps = useBlockProps();

    // Add a new timeline item
    const addItem = () => {
        const newItem = {
            id: Date.now(),
            title: 'New Event',
            description: 'Event description goes here.',
            date: 'May 2026',
        };
        setAttributes({ timelineItems: [...timelineItems, newItem] });
    };

    // Remove a timeline item
    const removeItem = (index) => {
        const newItems = timelineItems.filter((_, i) => i !== index);
        setAttributes({ timelineItems: newItems });
    };

    // Update timeline item attribute
    const updateItem = (index, key, value) => {
        const newItems = [...timelineItems];
        newItems[index][key] = value;
        setAttributes({ timelineItems: newItems });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Timeline Items', 'awesome-blocks')} initialOpen={true}>
                    {timelineItems.map((item, index) => (
                        <div key={item.id} style={{
                            marginBottom: '20px',
                            padding: '15px',
                            background: '#f0f0f0',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px'
                            }}>
                                <strong>{__('Event', 'awesome-blocks')} {index + 1}</strong>
                                {timelineItems.length > 1 && (
                                    <Button
                                        onClick={() => removeItem(index)}
                                        variant="secondary"
                                        isDestructive
                                        isSmall
                                    >
                                        <Dashicon icon="trash" />
                                    </Button>
                                )}
                            </div>

                            <TextControl
                                label={__('Title', 'awesome-blocks')}
                                value={item.title}
                                onChange={(value) => updateItem(index, 'title', value)}
                            />
                            <TextareaControl
                                label={__('Description', 'awesome-blocks')}
                                value={item.description}
                                onChange={(value) => updateItem(index, 'description', value)}
                                rows={3}
                            />
                            <TextControl
                                label={__('Date', 'awesome-blocks')}
                                value={item.date}
                                onChange={(value) => updateItem(index, 'date', value)}
                            />
                        </div>
                    ))}

                    <Button
                        onClick={addItem}
                        variant="primary"
                        style={{ width: '100%', justifyContent: 'center', gap: '8px' }}
                    >
                        <Dashicon icon="plus" />
                        {__('Add Event', 'awesome-blocks')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {timelineItems.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        background: '#f9f9f9',
                        borderRadius: '4px',
                        border: '2px dashed #ccc'
                    }}>
                        <p>{__('No events yet. Add events from the sidebar settings.', 'awesome-blocks')}</p>
                    </div>
                ) : (
                    <div className="at-preview">
                        <div id="timeline">
                            <div className="timeline-movement timeline-movement-top">&nbsp;</div>

                            {timelineItems.map((item, index) => {
                                const isEven = index % 2 === 0;

                                return isEven ? (
                                    <div key={item.id} className="timeline-row timeline-movement">
                                        <div className="timeline-badge">&nbsp;</div>
                                        <div className="timeline-col-6 timeline-item">
                                            <div className="timeline-row">
                                                <div className="timeline-col-11">
                                                    <div className="timeline-panel left-part">
                                                        {item.title && (
                                                            <p className="title">{item.title}</p>
                                                        )}
                                                        {item.description && (
                                                            <p className="details">{item.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="timeline-col-6 timeline-item">
                                            <div className="timeline-row">
                                                <div>
                                                    {item.date && (
                                                        <p className="timeline-date">{item.date}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={item.id} className="timeline-row timeline-movement">
                                        <div className="timeline-badge">&nbsp;</div>
                                        <div className="timeline-col-6 timeline-item">
                                            <div className="timeline-row">
                                                <div className="left-timeline-date">
                                                    {item.date && (
                                                        <p className="timeline-date text-right">{item.date}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="timeline-col-6 timeline-item">
                                            <div className="timeline-row">
                                                <div className="timeline-col-offset timeline-col-11">
                                                    <div className="timeline-panel">
                                                        {item.title && (
                                                            <p className="title">{item.title}</p>
                                                        )}
                                                        {item.description && (
                                                            <p className="details">{item.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
