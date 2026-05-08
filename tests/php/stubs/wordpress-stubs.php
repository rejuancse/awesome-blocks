<?php
/**
 * WordPress Stubs
 *
 * Basic stubs for WordPress functions when running tests without WordPress test environment.
 */

// Define core WordPress constants
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', dirname( __DIR__ ) . '/' );
}

if ( ! defined( 'WP_CONTENT_DIR' ) ) {
    define( 'WP_CONTENT_DIR', ABSPATH . 'wp-content' );
}

if ( ! defined( 'WP_PLUGIN_DIR' ) ) {
    define( 'WP_PLUGIN_DIR', WP_CONTENT_DIR . '/plugins' );
}

// Hooks system
$GLOBALS['wp_actions'] = [];
$GLOBALS['wp_filters'] = [];

function add_action( $hook_name, $callback, $priority = 10, $accepted_args = 1 ) {
    return add_filter( $hook_name, $callback, $priority, $accepted_args );
}

function add_filter( $hook_name, $callback, $priority = 10, $accepted_args = 1 ) {
    global $wp_filters;

    if ( ! isset( $wp_filters[ $hook_name ] ) ) {
        $wp_filters[ $hook_name ] = [];
    }

    if ( ! isset( $wp_filters[ $hook_name ][ $priority ] ) ) {
        $wp_filters[ $hook_name ][ $priority ] = [];
    }

    $wp_filters[ $hook_name ][ $priority ][] = [
        'callback' => $callback,
        'accepted_args' => $accepted_args,
    ];

    return true;
}

function do_action( $hook_name, ...$arg ) {
    return apply_filters( $hook_name, ...$arg );
}

function apply_filters( $hook_name, $value, ...$args ) {
    global $wp_filters;

    if ( ! isset( $wp_filters[ $hook_name ] ) ) {
        return $value;
    }

    ksort( $wp_filters[ $hook_name ] );

    foreach ( $wp_filters[ $hook_name ] as $priority => $callbacks ) {
        foreach ( $callbacks as $callback_data ) {
            $args = array_merge( [ $value ], $args );
            $value = call_user_func_array( $callback_data['callback'], array_slice( $args, 0, $callback_data['accepted_args'] ) );
        }
    }

    return $value;
}

function remove_action( $hook_name, $callback, $priority = 10 ) {
    return remove_filter( $hook_name, $callback, $priority );
}

function remove_filter( $hook_name, $callback, $priority = 10 ) {
    global $wp_filters;

    if ( isset( $wp_filters[ $hook_name ][ $priority ] ) ) {
        foreach ( $wp_filters[ $hook_name ][ $priority ] as $key => $callback_data ) {
            if ( $callback_data['callback'] === $callback ) {
                unset( $wp_filters[ $hook_name ][ $priority ][ $key ] );
                return true;
            }
        }
    }

    return false;
}

// Common WordPress functions
function __( $text, $domain = 'default' ) {
    return $text;
}

function _e( $text, $domain = 'default' ) {
    echo $text;
}

function esc_html__( $text, $domain = 'default' ) {
    return htmlspecialchars( $text, ENT_QUOTES, 'UTF-8' );
}

function esc_html_e( $text, $domain = 'default' ) {
    echo esc_html__( $text, $domain );
}

function esc_attr__( $text, $domain = 'default' ) {
    return htmlspecialchars( $text, ENT_QUOTES, 'UTF-8' );
}

function esc_attr( $text ) {
    return htmlspecialchars( $text, ENT_QUOTES, 'UTF-8' );
}

function esc_url( $url ) {
    return htmlspecialchars( $url, ENT_QUOTES, 'UTF-8' );
}

function sanitize_text_field( $str ) {
    return strip_tags( $str );
}

function plugin_dir_path( $file ) {
    return dirname( $file ) . '/';
}

function plugin_dir_url( $file ) {
    return 'file://' . dirname( $file );
}

function plugins_url( $path = '', $plugin = '' ) {
    return 'http://localhost/wp-content/plugins' . ( $path ? '/' . ltrim( $path, '/' ) : '' );
}

function get_option( $option, $default = false ) {
    return $default;
}

function update_option( $option, $value ) {
    return true;
}

function get_post_meta( $post_id, $key = '', $single = false ) {
    return $single ? '' : [];
}

function update_post_meta( $post_id, $meta_key, $meta_value, $prev_value = '' ) {
    return true;
}

function delete_post_meta( $post_id, $meta_key, $meta_value = '' ) {
    return true;
}

function get_posts( $args = null ) {
    return [];
}

function get_post( $post = null, $output = OBJECT, $filter = 'raw' ) {
    return null;
}

function get_the_ID() {
    return 1;
}

function get_the_title( $post = 0 ) {
    return 'Test Post';
}

function get_the_excerpt( $post = null ) {
    return 'Test excerpt';
}

function get_the_permalink( $post = 0, $leavename = false ) {
    return 'http://localhost/test-post';
}

function get_the_post_thumbnail( $post = null, $size = 'post-thumbnail', $attr = '' ) {
    return '';
}

function wp_get_attachment_image_src( $attachment_id, $size = 'thumbnail', $icon = false ) {
    return false;
}

function register_block_type( $name, $args = [] ) {
    return true;
}

function register_block_type_from_metadata( $path, $args = [] ) {
    return true;
}

function wp_register_script( $handle, $src, $deps = [], $ver = false, $in_footer = false ) {
    return true;
}

function wp_enqueue_script( $handle, $src = '', $deps = [], $ver = false, $in_footer = false ) {
    return true;
}

function wp_register_style( $handle, $src, $deps = [], $ver = false, $media = 'all' ) {
    return true;
}

function wp_enqueue_style( $handle, $src = '', $deps = [], $ver = false, $media = 'all' ) {
    return true;
}

function wp_set_script_translations( $handle, $domain = 'default', $path = '' ) {
    return true;
}

function load_plugin_textdomain( $domain, $deprecated = false, $plugin_rel_path = false ) {
    return true;
}

function admin_url( $path = '', $scheme = 'admin' ) {
    return 'http://localhost/wp-admin/' . ltrim( $path, '/' );
}

function home_url( $path = '', $scheme = null ) {
    return 'http://localhost/' . ltrim( $path, '/' );
}

function site_url( $path = '', $scheme = null ) {
    return 'http://localhost/' . ltrim( $path, '/' );
}

function rest_url( $path = '', $scheme = 'rest' ) {
    return 'http://localhost/wp-json/' . ltrim( $path, '/' );
}

function wp_json_encode( $data, $options = 0, $depth = 512 ) {
    return json_encode( $data, $options | JSON_UNESCAPED_SLASHES, $depth );
}

function wp_parse_args( $args, $defaults = [] ) {
    if ( is_array( $args ) ) {
        return array_merge( $defaults, $args );
    }

    return $defaults;
}

function is_admin() {
    return defined( 'WP_ADMIN' ) && WP_ADMIN;
}

function is_user_logged_in() {
    return false;
}

function current_user_can( $capability, ...$args ) {
    return false;
}

function wp_get_current_user() {
    return (object) [
        'ID' => 0,
        'data' => (object) [],
    ];
}

function get_current_user_id() {
    return 0;
}

function wp_get_current_user_id() {
    return get_current_user_id();
}

function get_edit_post_link( $id = 0, $context = 'display' ) {
    return '';
}

function get_the_term_list( $post_id, $taxonomy, $before = '', $sep = '', $after = '' ) {
    return '';
}

function get_terms( $args = [] ) {
    return [];
}

function get_taxonomy( $taxonomy ) {
    return null;
}

function shortcode_atts( $pairs, $atts, $shortcode = '' ) {
    $atts = (array) $atts;
    $out = [];
    foreach ( $pairs as $name => $default ) {
        if ( array_key_exists( $name, $atts ) ) {
            $out[ $name ] = $atts[ $name ];
        } else {
            $out[ $name ] = $default;
        }
    }
    return $out;
}

function do_shortcode( $content, $ignore_html = false ) {
    return $content;
}

function get_transient( $key ) {
    global $_transients;
    if ( ! isset( $_transients ) ) {
        $_transients = [];
    }
    return $_transients[ $key ] ?? false;
}

function set_transient( $key, $value, $expiration = 0 ) {
    global $_transients;
    if ( ! isset( $_transients ) ) {
        $_transients = [];
    }
    $_transients[ $key ] = $value;
    return true;
}

function sanitize_key( $key ) {
    return preg_replace( '/[^a-z0-9_\-]/', '', strtolower( $key ) );
}

function has_action( $hook_name, $callback = null ) {
    global $wp_filters;

    if ( ! isset( $wp_filters[ $hook_name ] ) ) {
        return false;
    }

    if ( null === $callback ) {
        return true;
    }

    foreach ( $wp_filters[ $hook_name ] as $priority => $callbacks ) {
        foreach ( $callbacks as $cb ) {
            if ( $cb['callback'] === $callback ) {
                return true;
            }
        }
    }

    return false;
}

function get_locale() {
    return 'en_US';
}

function wp_trim_words( $text, $num_words = 55, $more = null ) {
    return substr( $text, 0, $num_words );
}

function esc_js( $text ) {
    return addslashes( $text );
}

function wp_is_mobile() {
    return false;
}

function wp_nonce_field( $action = -1, $name = '_wpnonce', $referer = true, $echo = true ) {
    return '';
}

function wp_create_nonce( $action = -1 ) {
    return 'test_nonce';
}

function wp_verify_nonce( $nonce, $action = -1 ) {
    return true;
}

function check_ajax_referer( $action = -1, $query_arg = false, $die = true ) {
    return true;
}

// WooCommerce stubs (if needed)
function wc_get_products( $args = [] ) {
    return [];
}

function wc_get_product( $product_id ) {
    return null;
}

function get_woocommerce_currency() {
    return 'USD';
}

function get_woocommerce_currency_symbol( $currency = '' ) {
    return '$';
}

function wc_price( $price, $args = [] ) {
    return '$' . number_format( $price, 2 );
}

// REST API stubs
function register_rest_route( $namespace, $route, $args = [], $override = false ) {
    return true;
}

function rest_ensure_response( $response ) {
    return $response;
}

function rest_authentication_errors( $result ) {
    return $result;
}
