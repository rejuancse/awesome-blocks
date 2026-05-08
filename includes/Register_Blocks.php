<?php
namespace Awesome_Block;

defined( 'ABSPATH' ) || exit;

class Register_Blocks {

    public function __construct() {
        add_action( 'block_categories_all', array( $this, 'awesome_block_register_category' ) );
        add_action( 'init', array( $this, 'awesome_block_register_blocks' ) );
    }

    /**
     * Register block category
     */
    public function awesome_block_register_category( $block_categories ) {
        $category_slugs = wp_list_pluck( $block_categories, 'slug' );

        return in_array( 'awesome-block', $category_slugs, true ) ?
            $block_categories :
            array_merge(
                $block_categories,
                [
                    [
                        'slug'  => 'awesome-block',
                        'title' => __( 'Awesome Blocks', 'awesome-blocks' ),
                        'icon'  => null,
                    ],
                ]
            );
    }

    /**
     * Register Blocks server-side with automatic asset loading
     */
    public function awesome_block_register_blocks() {
        if ( function_exists( 'register_block_type_from_metadata' ) ) {
            // Register Post Block
            register_block_type_from_metadata(
                AWESOME_BLOCK_PLUGIN_PATH . 'assets/build/post-block',
                array(
                    'render_callback' => array( __NAMESPACE__ . '\\Post_Block', 'render' ),
                )
            );

            // Register WooCommerce Product List Block
            register_block_type_from_metadata(
                AWESOME_BLOCK_PLUGIN_PATH . 'assets/build/woo-product-list',
                array(
                    'render_callback' => array( __NAMESPACE__ . '\\Woo_Product_List', 'render' ),
                )
            );

            // Register Card Block - No render callback needed as it's static
            register_block_type_from_metadata(
                AWESOME_BLOCK_PLUGIN_PATH . 'assets/build/card-block'
            );

            // Register Feature Block - No render callback needed as it's static
            register_block_type_from_metadata(
                AWESOME_BLOCK_PLUGIN_PATH . 'assets/build/feature-block'
            );

            // Register Grid Block - No render callback needed as it uses InnerBlocks
            register_block_type_from_metadata(
                AWESOME_BLOCK_PLUGIN_PATH . 'assets/build/grid-block'
            );

            // Register Awesome Slider Block - No render callback needed as it's static
            register_block_type_from_metadata(
                AWESOME_BLOCK_PLUGIN_PATH . 'assets/build/awesome-slider'
            );

            // Register Awesome Timeline Block - No render callback needed as it's static
            register_block_type_from_metadata(
                AWESOME_BLOCK_PLUGIN_PATH . 'assets/build/awesome-timeline'
            );

            // Register Photo Gallery Block - No render callback needed as it's static
            register_block_type_from_metadata(
                AWESOME_BLOCK_PLUGIN_PATH . 'assets/build/photo-gallery'
            );
        }
    }
}
