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
            <div className="zepblock-image-wrap">
                {beforeImageUrl && afterImageUrl && (
                    <div className="zepblock-image-container">
                        <span class="label before-label button" style="visibility: visible;">Before</span>
                        <span class="label after-label button" style="visibility: visible;">After</span>

                        <div className="zepblock-image-comparison">
                            <figure
                                className="zepblock-image-figure"
                                style={{ backgroundImage: `url(${beforeImageUrl})` }}
                            >
                                <div id="zepblock-image-handle" className="zepblock-image-handle"></div>
                                <div
                                    id="zepblock-image-divisor"
                                    className="zepblock-image-divisor"
                                    style={{ backgroundImage: `url(${afterImageUrl})` }}
                                ></div>
                            </figure>
                            <input
                                id="zepblock-image-slider"
                                type="range"
                                min="0"
                                max="100"
                                value="50"
                                className="zepblock-image-slider"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
