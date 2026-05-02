<?php
/**
 * Register Blocks
 *
 * @package Awesome_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register block category
 */
function ab_register_block_category( $block_categories ) {
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
add_filter( 'block_categories_all', 'ab_register_block_category', 10, 1 );

/**
 * Register Blocks server-side with automatic asset loading
 */
function ab_register_blocks() {
    // Register Post Block
    register_block_type_from_metadata(
        AB_PLUGIN_PATH . 'build/post-block',
        array(
            'render_callback' => 'ab_render_post_block',
        )
    );

    // Register Card Block - No render callback needed as it's static
    register_block_type_from_metadata(
        AB_PLUGIN_PATH . 'build/card-block'
    );

    // Register Feature Block - No render callback needed as it's static
    register_block_type_from_metadata(
        AB_PLUGIN_PATH . 'build/feature-block'
    );

    // Register Grid Block - No render callback needed as it uses InnerBlocks
    register_block_type_from_metadata(
        AB_PLUGIN_PATH . 'build/grid-block'
    );
}
add_action( 'init', 'ab_register_blocks' );
