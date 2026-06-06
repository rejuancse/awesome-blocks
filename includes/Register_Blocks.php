<?php
namespace ZepBlocks;

defined( 'ABSPATH' ) || exit;

class Register_Blocks {

    public function __construct() {
        add_action( 'block_categories_all', array( $this, 'zepblock_register_category' ) );
        add_action( 'init', array( $this, 'zepblock_register_blocks' ) );
    }

    /**
     * Register block category
     */
    public function zepblock_register_category( $block_categories ) {
        $category_slugs = wp_list_pluck( $block_categories, 'slug' );

        return in_array( 'zepblock-block', $category_slugs, true ) ?
            $block_categories :
            array_merge(
                $block_categories,
                [
                    [
                        'slug'  => 'zepblock-block',
                        'title' => __( 'ZepBlock', 'zepblocks'  ),
                        'icon'  => null,
                    ],
                ]
            );
    }

    /**
     * Register Blocks server-side with automatic asset loading
     */
    public function zepblock_register_blocks() {
        if ( function_exists( 'register_block_type_from_metadata' ) ) {
            // Register Post Block
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/post-block',
                array(
                    'render_callback' => array( __NAMESPACE__ . '\\Post_Block', 'render' ),
                )
            );

            // Register WooCommerce Product List Block
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/woo-product-list',
                array(
                    'render_callback' => array( __NAMESPACE__ . '\\Woo_Product_List', 'render' ),
                )
            );

            // Register Card Block - No render callback needed as it's static
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/card-block'
            );

            // Register Feature Block - No render callback needed as it's static
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/feature-block'
            );

            // Register Grid Block - No render callback needed as it uses InnerBlocks
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/grid-block'
            );

            // Register Zepblock Slider Block - No render callback needed as it's static
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/zepblock-slider'
            );

            // Register Zepblock Timeline Block - No render callback needed as it's static
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/zepblock-timeline'
            );

            // Register Photo Gallery Block - No render callback needed as it's static
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/photo-gallery'
            );

            // Register WooCommerce Category Grid Block
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/woo-category-grid',
                array(
                    'render_callback' => array( __NAMESPACE__ . '\\Woo_Category_List', 'render' ),
                )
            );

            // Register Hero Video Block - No render callback needed as it uses render.php
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/hero-video'
            );

            // Register Image Compare Block - No render callback needed as it uses render.php
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/image-compare'
            );

            // Register Breaking News Block
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/breaking-news',
                array(
                    'render_callback' => array( __NAMESPACE__ . '\\Breaking_News', 'render' ),
                )
            );

            // Register Count Down Block
            register_block_type_from_metadata(
                ZEPBLOCKS_PLUGIN_PATH . 'assets/build/count-down',
                array(
                    'render_callback' => array( __NAMESPACE__ . '\\Count_Down', 'render' ),
                )
            );
        }
    }
}
