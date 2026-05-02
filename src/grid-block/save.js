/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Save Component - Dynamic block, returns null
 */
export default function Save({ attributes }) {
    const {
        columns = 3,
        columnsTablet = 2,
        columnsMobile = 1,
        rowGap = 20,
        columnGap = 20,
        align = 'left',
        verticalAlign = 'top',
        gridAutoFlow = 'row',
    } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div
                className={`ab-grid-container ab-grid-columns-desktop-${columns} ab-grid-columns-tablet-${columnsTablet} ab-grid-columns-mobile-${columnsMobile}`}
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: `${rowGap}px ${columnGap}px`,
                    justifyContent: align,
                    alignContent: verticalAlign === 'middle' ? 'center' : verticalAlign,
                    gridAutoFlow: gridAutoFlow,
                }}
            >
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
