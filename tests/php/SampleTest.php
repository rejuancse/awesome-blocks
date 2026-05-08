<?php
/**
 * Sample Test Case
 *
 * Example test case demonstrating basic testing patterns.
 */

namespace Awesome_Block\Tests;

class SampleTest extends TestCase {

    /**
     * Test that WordPress functions are available
     */
    public function test_wordpress_functions_available() {
        $this->assertTrue( function_exists( 'add_action' ), 'add_action function should be available' );
        $this->assertTrue( function_exists( 'add_filter' ), 'add_filter function should be available' );
        $this->assertTrue( function_exists( '__' ), '__() function should be available' );
    }

    /**
     * Test hooks can be added and removed
     */
    public function test_hooks_can_be_added_and_removed() {
        $callback = function() {
            return 'test';
        };

        // Add action
        add_action( 'test_hook', $callback, 10 );

        // Assert hook is registered
        $this->assertHookRegistered( 'test_hook', $callback, 10 );

        // Remove action
        remove_action( 'test_hook', $callback, 10 );

        // Note: In real WordPress tests, you'd verify removal
        // This is just to demonstrate the pattern
    }

    /**
     * Test WordPress localization functions
     */
    public function test_wordpress_localization() {
        $text = 'Hello World';
        $translated = __( $text, 'awesome-blocks' );

        $this->assertEquals( $text, $translated );
        $this->assertIsString( $translated );
    }

    /**
     * Test sanitization functions
     */
    public function test_sanitize_functions() {
        $html = '<script>alert("xss")</script>Hello';
        $sanitized = sanitize_text_field( $html );

        $this->assertStringNotContainsString( '<script>', $sanitized );
        $this->assertStringContainsString( 'Hello', $sanitized );
    }

    /**
     * Test plugin constants are defined
     */
    public function test_plugin_constants() {
        $this->assertTrue( defined( 'TESTS_PLUGIN_DIR' ), 'TESTS_PLUGIN_DIR should be defined' );
        $this->assertTrue( defined( 'TESTS_PLUGIN_FILE' ), 'TESTS_PLUGIN_FILE should be defined' );
        $this->assertFileExists( TESTS_PLUGIN_DIR, 'Plugin directory should exist' );
        $this->assertFileExists( TESTS_PLUGIN_FILE, 'Plugin main file should exist' );
    }

    /**
     * Test plugin directory structure
     */
    public function test_plugin_structure() {
        $this->assertDirectoryExists( TESTS_PLUGIN_DIR . '/includes', 'includes directory should exist' );
        $this->assertDirectoryExists( TESTS_PLUGIN_DIR . '/src', 'src directory should exist' );
        $this->assertFileExists( TESTS_PLUGIN_DIR . '/composer.json', 'composer.json should exist' );
        $this->assertFileExists( TESTS_PLUGIN_DIR . '/package.json', 'package.json should exist' );
    }

    /**
     * Test autoloading is working
     */
    public function test_autoloading() {
        $this->assertTrue( class_exists( 'Composer\Autoload\ClassLoader' ), 'Composer autoloader should be loaded' );
    }
}
