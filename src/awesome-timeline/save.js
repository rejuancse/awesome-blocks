/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save Component
 */
export default function Save({ attributes }) {
    const {
        timelineItems = [],
    } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
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
    );
}
