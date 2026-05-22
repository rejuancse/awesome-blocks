/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save Component
 */
export default function Save({ attributes }) {
    const {
        beforeImageUrl = '',
        afterImageUrl = '',
    } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div className="ic-wrap">
                {beforeImageUrl && afterImageUrl && (
                    <div className="ic-container">
                        <div className="ic-comparison">
                            <figure
                                className="ic-figure"
                                style={{ backgroundImage: `url(${beforeImageUrl})` }}
                            >
                                <div id="ic-handle" className="ic-handle"></div>
                                <div
                                    id="ic-divisor"
                                    className="ic-divisor"
                                    style={{ backgroundImage: `url(${afterImageUrl})` }}
                                ></div>
                            </figure>
                            <input
                                id="ic-slider"
                                type="range"
                                min="0"
                                max="100"
                                value="50"
                                className="ic-slider"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
