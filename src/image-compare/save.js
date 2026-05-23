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
            <div className="awesome-image-wrap">
                {beforeImageUrl && afterImageUrl && (
                    <div className="awesome-image-container">
                        <span class="label before-label button" style="visibility: visible;">Before</span>
                        <span class="label after-label button" style="visibility: visible;">After</span>

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
    );
}
