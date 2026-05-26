<?php
/**
 * Product REST API
 *
 * @package ZepBlocks
 */

namespace ZepBlocks;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Product_REST_API {

    /**
     * Class constructor
     */
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_product_fields'));
    }

    /**
     * Register custom fields for product post type in REST API
     *
     * @return void
     */
    public function register_product_fields() {
        // Register WooCommerce product meta fields
        $meta_fields = array(
            '_price',
            '_regular_price',
            '_sale_price',
            '_wc_average_rating',
            '_wc_review_count',
            '_stock_status',
            '_manage_stock',
            '_stock',
        );

        foreach ($meta_fields as $field) {
            register_rest_field(
                'product',
                substr($field, 1), // Remove underscore prefix
                array(
                    'get_callback'    => array($this, 'get_product_meta'),
                    'update_callback' => null,
                    'schema'          => null,
                )
            );
        }

        // Register product categories
        register_rest_field(
            'product',
            'product_cat',
            array(
                'get_callback' => array($this, 'get_product_categories'),
                'schema'       => null,
            )
        );
    }

    /**
     * Get product meta field value
     *
     * @param array $object Post object.
     * @param string $field_name Field name.
     * @param WP_REST_Request $request Request object.
     * @return mixed
     */
    public function get_product_meta($object, $field_name, $request) {
        $meta_key = '_' . $field_name;
        return get_post_meta($object['id'], $meta_key, true);
    }

    /**
     * Get product categories
     *
     * @param array $object Post object.
     * @param string $field_name Field name.
     * @param WP_REST_Request $request Request object.
     * @return array
     */
    public function get_product_categories($object, $field_name, $request) {
        $categories = get_the_terms($object['id'], 'product_cat');

        if (is_wp_error($categories) || empty($categories)) {
            return array();
        }

        return wp_list_pluck($categories, 'name');
    }
}
