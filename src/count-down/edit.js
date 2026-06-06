/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    ToggleControl,
    SelectControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        title = 'Special Offer Ends In:',
        targetDate = '',
        expiredMessage = 'This offer has expired!',
        showTitle = true,
        cardAlignment = 'center',
        boxBgColor = '#667eea',
        textColor = '#141414',
        labelColor = '#e0e7ff',
        expiredBgColor = '#ef4444',
    } = attributes;

    const blockProps = useBlockProps();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isExpired, setIsExpired] = useState(false);

    // Calculate countdown
    useEffect(() => {
        if (!targetDate) {
            setIsExpired(false);
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const calculateTimeLeft = () => {
            const difference = new Date(targetDate).getTime() - new Date().getTime();

            if (difference <= 0) {
                setIsExpired(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setIsExpired(false);

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Content Settings', 'zepblocks')} initialOpen={true}>
                    <TextControl
                        label={__('Title', 'zepblocks')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        help={__('Leave empty to hide title', 'zepblocks')}
                    />

                    <TextControl
                        label={__('Target Date & Time', 'zepblocks')}
                        type="datetime-local"
                        value={targetDate}
                        onChange={(value) => setAttributes({ targetDate: value })}
                        help={__('Select when the countdown should end', 'zepblocks')}
                    />

                    <TextControl
                        label={__('Expired Message', 'zepblocks')}
                        value={expiredMessage}
                        onChange={(value) => setAttributes({ expiredMessage: value })}
                        help={__('Message to show when countdown reaches zero', 'zepblocks')}
                    />

                    <ToggleControl
                        label={__('Show Title', 'zepblocks')}
                        checked={showTitle}
                        onChange={() => setAttributes({ showTitle: !showTitle })}
                    />
                </PanelBody>

                <PanelBody title={__('Style Settings', 'zepblocks')} initialOpen={false}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                            {__('Box Background Color', 'zepblocks')}
                        </label>
                        <input
                            type="color"
                            value={boxBgColor}
                            onChange={(e) => setAttributes({ boxBgColor: e.target.value })}
                            style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                            {__('Text Color', 'zepblocks')}
                        </label>
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setAttributes({ textColor: e.target.value })}
                            style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                            {__('Label Color', 'zepblocks')}
                        </label>
                        <input
                            type="color"
                            value={labelColor}
                            onChange={(e) => setAttributes({ labelColor: e.target.value })}
                            style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                            {__('Expired Background Color', 'zepblocks')}
                        </label>
                        <input
                            type="color"
                            value={expiredBgColor}
                            onChange={(e) => setAttributes({ expiredBgColor: e.target.value })}
                            style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                        />
                    </div>

                    <SelectControl
                        label={__('Alignment', 'zepblocks')}
                        value={cardAlignment}
                        options={[
                            { label: __('Left', 'zepblocks'), value: 'left' },
                            { label: __('Center', 'zepblocks'), value: 'center' },
                            { label: __('Right', 'zepblocks'), value: 'right' },
                        ]}
                        onChange={(value) => setAttributes({ cardAlignment: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className={`cd-wrap cd-align-${cardAlignment}`}>
                    <div className="cd-card">
                        {showTitle && title && (
                            <div className="cd-title" style={{ color: textColor }}>
                                {title}
                            </div>
                        )}

                        {isExpired ? (
                            <div
                                className="cd-expired"
                                style={{
                                    background: expiredBgColor,
                                    color: textColor,
                                }}
                            >
                                <div className="cd-expired-icon">⚠️</div>
                                <div className="cd-expired-message">{expiredMessage}</div>
                            </div>
                        ) : (
                            <div className="cd-countdown">
                                <div
                                    className="cd-box"
                                    style={{
                                        background: boxBgColor,
                                        color: textColor,
                                    }}
                                >
                                    <div className="cd-number">{String(timeLeft.days).padStart(2, '0')}</div>
                                    <div className="cd-label" style={{ color: labelColor }}>
                                        {__('Days', 'zepblocks')}
                                    </div>
                                </div>
                                <div className="cd-separator" style={{ color: textColor }}>
                                    :
                                </div>
                                <div
                                    className="cd-box"
                                    style={{
                                        background: boxBgColor,
                                        color: textColor,
                                    }}
                                >
                                    <div className="cd-number">{String(timeLeft.hours).padStart(2, '0')}</div>
                                    <div className="cd-label" style={{ color: labelColor }}>
                                        {__('Hours', 'zepblocks')}
                                    </div>
                                </div>
                                <div className="cd-separator" style={{ color: textColor }}>
                                    :
                                </div>
                                <div
                                    className="cd-box"
                                    style={{
                                        background: boxBgColor,
                                        color: textColor,
                                    }}
                                >
                                    <div className="cd-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                    <div className="cd-label" style={{ color: labelColor }}>
                                        {__('Minutes', 'zepblocks')}
                                    </div>
                                </div>
                                <div className="cd-separator" style={{ color: textColor }}>
                                    :
                                </div>
                                <div
                                    className="cd-box"
                                    style={{
                                        background: boxBgColor,
                                        color: textColor,
                                    }}
                                >
                                    <div className="cd-number">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                    <div className="cd-label" style={{ color: labelColor }}>
                                        {__('Seconds', 'zepblocks')}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
