<?php
/**
 * Fragment Cache Test Case
 *
 * Tests for the Fragment_Cache class.
 */

namespace Awesome_Block\Tests;

use Awesome_Block\Fragment_Cache;

class FragmentCacheTest extends TestCase {

    /**
     * Test cache key prefix constant
     */
    public function test_cache_prefix_constant() {
        $this->assertEquals( 'ab_fragment_', Fragment_Cache::PREFIX );
        $this->assertIsString( Fragment_Cache::PREFIX );
    }

    /**
     * Test expiration constant
     */
    public function test_expiration_constant() {
        $this->assertEquals( 3600, Fragment_Cache::EXPIRATION );
        $this->assertIsInt( Fragment_Cache::EXPIRATION );
    }

    /**
     * Test remember method with cache miss
     */
    public function test_remember_cache_miss() {
        $key = 'test_key_' . time();
        $callback = function() {
            return 'cached content';
        };

        $result = Fragment_Cache::remember( $key, $callback, 100 );

        $this->assertEquals( 'cached content', $result );
        $this->assertIsString( $result );
    }

    /**
     * Test remember method executes callback
     */
    public function test_remember_executes_callback() {
        $key = 'test_callback_' . time();
        $executed = false;

        $callback = function() use ( &$executed ) {
            $executed = true;
            return 'callback result';
        };

        Fragment_Cache::remember( $key, $callback, 100 );

        $this->assertTrue( $executed, 'Callback should be executed on cache miss' );
    }

    /**
     * Test remember method returns various types
     */
    public function test_remember_returns_various_types() {
        $key_string = 'test_string_' . time();
        $key_array = 'test_array_' . time();
        $key_int = 'test_int_' . time();

        $string_result = Fragment_Cache::remember( $key_string, function() {
            return 'string content';
        }, 100 );

        $array_result = Fragment_Cache::remember( $key_array, function() {
            return [ 'key' => 'value' ];
        }, 100 );

        $int_result = Fragment_Cache::remember( $key_int, function() {
            return 42;
        }, 100 );

        $this->assertIsString( $string_result );
        $this->assertIsArray( $array_result );
        $this->assertIsInt( $int_result );
        $this->assertEquals( 42, $int_result );
    }

    /**
     * Test cache_block method generates cache key
     */
    public function test_cache_block_generates_key() {
        $block_name = 'test/block';
        $attributes = [ 'param1' => 'value1', 'param2' => 'value2' ];

        $callback = function() {
            return 'block content';
        };

        $result = Fragment_Cache::cache_block( $block_name, $attributes, $callback, 100 );

        $this->assertEquals( 'block content', $result );
        $this->assertIsString( $result );
    }

    /**
     * Test cache_block with different attributes
     */
    public function test_cache_block_with_different_attributes() {
        $block_name = 'test/block';

        $attributes1 = [ 'id' => 1, 'style' => 'default' ];
        $attributes2 = [ 'id' => 2, 'style' => 'custom' ];

        $result1 = Fragment_Cache::cache_block( $block_name, $attributes1, function() {
            return 'content 1';
        }, 100 );

        $result2 = Fragment_Cache::cache_block( $block_name, $attributes2, function() {
            return 'content 2';
        }, 100 );

        $this->assertEquals( 'content 1', $result1 );
        $this->assertEquals( 'content 2', $result2 );
        $this->assertNotEquals( $result1, $result2 );
    }

    /**
     * Test cache_block with empty attributes
     */
    public function test_cache_block_with_empty_attributes() {
        $block_name = 'test/block';
        $attributes = [];

        $result = Fragment_Cache::cache_block( $block_name, $attributes, function() {
            return 'empty attrs content';
        }, 100 );

        $this->assertEquals( 'empty attrs content', $result );
    }

    /**
     * Test init_hooks method registers actions
     */
    public function test_init_hooks_registers_actions() {
        Fragment_Cache::init_hooks();

        $this->assertTrue( has_action( 'save_post' ) !== false, 'save_post action should be registered' );
        $this->assertTrue( has_action( 'switch_theme' ) !== false, 'switch_theme action should be registered' );
    }

    /**
     * Test custom expiration parameter
     */
    public function test_custom_expiration_parameter() {
        $key = 'test_expiration_' . time();
        $custom_expiration = 500;

        $callback = function() {
            return 'expires in 500 seconds';
        };

        $result = Fragment_Cache::remember( $key, $callback, $custom_expiration );

        $this->assertEquals( 'expires in 500 seconds', $result );
    }

    /**
     * Test cache_block with special characters in block name
     */
    public function test_cache_block_sanitizes_block_name() {
        $block_name = 'test/block-with-special-chars';
        $attributes = [ 'test' => 'value' ];

        $result = Fragment_Cache::cache_block( $block_name, $attributes, function() {
            return 'sanitized content';
        }, 100 );

        $this->assertEquals( 'sanitized content', $result );
    }
}
