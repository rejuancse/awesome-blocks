/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
    InspectorControls,
    useBlockProps,
    InnerBlocks,
} from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    TabPanel,
} from '@wordpress/components';

/**
 * Edit Component
 */
export default function Edit({ attributes, setAttributes, clientId }) {
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

    const blockProps = useBlockProps();

    // Get the number of inner blocks
    const { innerBlockCount } = useSelect(
        (select) => {
            const { getBlockCount } = select('core/block-editor');
            return {
                innerBlockCount: getBlockCount(clientId),
            };
        },
        [clientId]
    );

    return (
        <>
            <InspectorControls>
                <TabPanel
                    tabs={[
                        {
                            name: 'layout',
                            title: __('Layout', 'awesome-blocks'),
                            className: 'ab-grid-layout-tab',
                        },
                        {
                            name: 'style',
                            title: __('Style', 'awesome-blocks'),
                            className: 'ab-grid-style-tab',
                        },
                    ]}
                >
                    {(tab) => {
                        if ('layout' === tab.name) {
                            return (
                                <>
                                    <PanelBody
                                        title={__(
                                            'Grid Columns',
                                            'awesome-blocks'
                                        )}
                                        initialOpen={true}
                                    >
                                        <PanelRow>
                                            <RangeControl
                                                label={__(
                                                    'Desktop Columns',
                                                    'awesome-blocks'
                                                )}
                                                value={columns}
                                                onChange={(value) =>
                                                    setAttributes({
                                                        columns: value,
                                                    })
                                                }
                                                min={1}
                                                max={6}
                                                help={__(
                                                    'Number of columns on desktop screens (1024px and above)',
                                                    'awesome-blocks'
                                                )}
                                            />
                                        </PanelRow>
                                        <PanelRow>
                                            <RangeControl
                                                label={__(
                                                    'Tablet Columns',
                                                    'awesome-blocks'
                                                )}
                                                value={columnsTablet}
                                                onChange={(value) =>
                                                    setAttributes({
                                                        columnsTablet: value,
                                                    })
                                                }
                                                min={1}
                                                max={4}
                                                help={__(
                                                    'Number of columns on tablet screens (768px to 1023px)',
                                                    'awesome-blocks'
                                                )}
                                            />
                                        </PanelRow>
                                        <PanelRow>
                                            <RangeControl
                                                label={__(
                                                    'Mobile Columns',
                                                    'awesome-blocks'
                                                )}
                                                value={columnsMobile}
                                                onChange={(value) =>
                                                    setAttributes({
                                                        columnsMobile: value,
                                                    })
                                                }
                                                min={1}
                                                max={3}
                                                help={__(
                                                    'Number of columns on mobile screens (up to 767px)',
                                                    'awesome-blocks'
                                                )}
                                            />
                                        </PanelRow>
                                    </PanelBody>

                                    <PanelBody
                                        title={__(
                                            'Grid Gaps',
                                            'awesome-blocks'
                                        )}
                                        initialOpen={false}
                                    >
                                        <RangeControl
                                            label={__(
                                                'Column Gap',
                                                'awesome-blocks'
                                            )}
                                            value={columnGap}
                                            onChange={(value) =>
                                                setAttributes({
                                                    columnGap: value,
                                                })
                                            }
                                            min={0}
                                            max={100}
                                            help={__(
                                                'Space between grid columns (px)',
                                                'awesome-blocks'
                                            )}
                                        />
                                        <RangeControl
                                            label={__(
                                                'Row Gap',
                                                'awesome-blocks'
                                            )}
                                            value={rowGap}
                                            onChange={(value) =>
                                                setAttributes({
                                                    rowGap: value,
                                                })
                                            }
                                            min={0}
                                            max={100}
                                            help={__(
                                                'Space between grid rows (px)',
                                                'awesome-blocks'
                                            )}
                                        />
                                    </PanelBody>

                                    <PanelBody
                                        title={__(
                                            'Grid Settings',
                                            'awesome-blocks'
                                        )}
                                        initialOpen={false}
                                    >
                                        <SelectControl
                                            label={__(
                                                'Grid Auto Flow',
                                                'awesome-blocks'
                                            )}
                                            value={gridAutoFlow}
                                            options={[
                                                {
                                                    label: __(
                                                        'Row',
                                                        'awesome-blocks'
                                                    ),
                                                    value: 'row',
                                                },
                                                {
                                                    label: __(
                                                        'Column',
                                                        'awesome-blocks'
                                                    ),
                                                    value: 'column',
                                                },
                                                {
                                                    label: __(
                                                        'Row Dense',
                                                        'awesome-blocks'
                                                    ),
                                                    value: 'row dense',
                                                },
                                                {
                                                    label: __(
                                                        'Column Dense',
                                                        'awesome-blocks'
                                                    ),
                                                    value: 'column dense',
                                                },
                                            ]}
                                            onChange={(value) =>
                                                setAttributes({
                                                    gridAutoFlow: value,
                                                })
                                            }
                                            help={__(
                                                'Controls how auto-placed items get inserted in the grid',
                                                'awesome-blocks'
                                            )}
                                        />
                                    </PanelBody>
                                </>
                            );
                        }
                        if ('style' === tab.name) {
                            return (
                                <>
                                    <PanelBody
                                        title={__(
                                            'Alignment',
                                            'awesome-blocks'
                                        )}
                                        initialOpen={true}
                                    >
                                        <SelectControl
                                            label={__(
                                                'Horizontal Alignment',
                                                'awesome-blocks'
                                            )}
                                            value={align}
                                            options={[
                                                {
                                                    label: __(
                                                        'Left',
                                                        'awesome-blocks'
                                                    ),
                                                    value: 'left',
                                                },
                                                {
                                                    label: __(
                                                        'Center',
                                                        'awesome-blocks'
                                                    ),
                                                    value: 'center',
                                                },
                                                {
                                                    label: __(
                                                        'Right',
                                                        'awesome-blocks'
                                                    ),
                                                    value: 'right',
                                                },
                                                {
                                                    label: __(
                                                        'Space Between',
                                                        'awesome-blocks'
                                                    ),
                                                    value: 'space-between',
                                                },
                                            ]}
                                            onChange={(value) =>
                                                setAttributes({ align: value })
                                            }
                                        />
                                        <SelectControl
                                            label={__(
                                                'Vertical Alignment',
                                                'awesome-blocks'
                                            )}
                                            value={verticalAlign}
                                            options={[
                                                {
                                                    label: __(
                                                        'Top',
                                                        'awesome-blocks'
                                                    ),
                                                    value: 'top',
                                                },
                                                {
                                                    label: __(
                                                        'Middle',
                                                        'awesome-blocks'
                                                    ),
                                                    value: 'middle',
                                                },
                                                {
                                                    label: __(
                                                        'Bottom',
                                                        'awesome-blocks'
                                                    ),
                                                    value: 'bottom',
                                                },
                                            ]}
                                            onChange={(value) =>
                                                setAttributes({
                                                    verticalAlign: value,
                                                })
                                            }
                                        />
                                    </PanelBody>
                                </>
                            );
                        }
                    }}
                </TabPanel>
            </InspectorControls>

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
                    <InnerBlocks
                        allowedBlocks={['*']}
                        template={[['core/paragraph', { content: __('Grid Item', 'awesome-blocks') }]]}
                        orientation="horizontal"
                    />
                </div>
            </div>
        </>
    );
}
