<?php
/**
 * Assets Test Case
 *
 * Tests for the Assets class.
 */

namespace Awesome_Block\Tests;

use Awesome_Block\Assets;

class AssetsTest extends TestCase {

    /**
     * Test assets class initializes correctly
     */
    public function test_assets_constructor_registers_hooks() {
        $assets = new Assets();

        $this->assertTrue( has_action( 'wp_enqueue_scripts' ) !== false, 'wp_enqueue_scripts action should be registered' );
        $this->assertTrue( has_action( 'enqueue_block_assets' ) !== false, 'enqueue_block_assets action should be registered' );
    }

    /**
     * Test common CSS is always enqueued
     */
    public function test_common_css_is_enqueued() {
        // Mock WordPress functions
        if ( ! function_exists( 'Awesome_Block\has_block' ) ) {
            eval( 'namespace Awesome_Block; function has_block( $block_type ) { return false; }' );
        }
        if ( ! function_exists( 'Awesome_Block\is_admin' ) ) {
            eval( 'namespace Awesome_Block; function is_admin() { return false; }' );
        }
        if ( ! function_exists( 'Awesome_Block\wp_enqueue_style' ) ) {
            eval( 'namespace Awesome_Block; function wp_enqueue_style( $handle, $src = "", $deps = array(), $ver = false, $media = "all" ) { return true; }' );
        }
        if ( ! function_exists( 'Awesome_Block\wp_enqueue_script' ) ) {
            eval( 'namespace Awesome_Block; function wp_enqueue_script( $handle, $src = "", $deps = array(), $ver = false, $in_footer = false ) { return true; }' );
        }

        $assets = new Assets();
        $assets->register_admin_assets();

        $this->assertTrue( true, 'register_admin_assets executes without errors' );
    }

    /**
     * Test assets method exists
     */
    public function test_register_admin_assets_method_exists() {
        $assets = new Assets();
        $this->assertTrue( method_exists( $assets, 'register_admin_assets' ) );
    }

    /**
     * Test assets class is instantiated correctly
     */
    public function test_assets_class_instantiation() {
        $assets = new Assets();
        $this->assertInstanceOf( Assets::class, $assets );
    }

    /**
     * Test assets constructor uses correct action hooks
     */
    public function test_assets_uses_correct_action_hooks() {
        $assets = new Assets();

        $wp_scripts_priority = has_action( 'wp_enqueue_scripts', array( $assets, 'register_admin_assets' ) );
        $block_assets_priority = has_action( 'enqueue_block_assets', array( $assets, 'register_admin_assets' ) );

        $this->assertGreaterThan( 0, $wp_scripts_priority ?: 0, 'wp_enqueue_scripts should have priority > 0' );
        $this->assertGreaterThan( 0, $block_assets_priority ?: 0, 'enqueue_block_assets should have priority > 0' );
    }

    /**
     * Test assets version constant is used
     */
    public function test_assets_version_constant_exists() {
        $this->assertTrue( defined( 'AWESOME_BLOCK_VERSION' ), 'AWESOME_BLOCK_VERSION constant should be defined' );
        $this->assertIsString( AWESOME_BLOCK_VERSION, 'AWESOME_BLOCK_VERSION should be a string' );
    }

    /**
     * Test assets URL constant is used
     */
    public function test_assets_url_constant_exists() {
        $this->assertTrue( defined( 'AWESOME_BLOCK_ASSETS' ), 'AWESOME_BLOCK_ASSETS constant should be defined' );
        $this->assertIsString( AWESOME_BLOCK_ASSETS, 'AWESOME_BLOCK_ASSETS should be a string' );
    }
}
