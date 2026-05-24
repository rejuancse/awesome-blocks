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
            <div className="tblock-image-wrap">
                {beforeImageUrl && afterImageUrl && (
                    <div className="tblock-image-container">
                        <span class="label before-label button" style="visibility: visible;">Before</span>
                        <span class="label after-label button" style="visibility: visible;">After</span>

                        <div className="tblock-image-comparison">
                            <figure
                                className="tblock-image-figure"
                                style={{ backgroundImage: `url(${beforeImageUrl})` }}
                            >
                                <div id="tblock-image-handle" className="tblock-image-handle"></div>
                                <div
                                    id="tblock-image-divisor"
                                    className="tblock-image-divisor"
                                    style={{ backgroundImage: `url(${afterImageUrl})` }}
                                ></div>
                            </figure>
                            <input
                                id="tblock-image-slider"
                                type="range"
                                min="0"
                                max="100"
                                value="50"
                                className="tblock-image-slider"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
