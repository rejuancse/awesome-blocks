<?php
/**
 * Base Test Case
 *
 * Base class for all test cases.
 */

namespace ThemeBlocks\Tests;

use PHPUnit\Framework\TestCase as PHPUnitTestCase;

abstract class TestCase extends PHPUnitTestCase {

    /**
     * Setup test environment before each test
     */
    protected function setUp(): void {
        parent::setUp();
        // Reset hooks and global state before each test
        $this->reset_hooks();
    }

    /**
     * Cleanup after each test
     */
    protected function tearDown(): void {
        parent::tearDown();
        $this->reset_hooks();
    }

    /**
     * Reset WordPress hooks
     */
    protected function reset_hooks() {
        global $wp_filters, $wp_actions;
        $wp_filters = [];
        $wp_actions = [];
    }

    /**
     * Get a protected/private method for testing
     *
     * @param object|string $class The class or object
     * @param string $methodName The method name
     * @return \ReflectionMethod
     */
    protected function getProtectedMethod( $class, $methodName ) {
        $reflection = new \ReflectionClass( $class );
        $method = $reflection->getMethod( $methodName );
        $method->setAccessible( true );
        return $method;
    }

    /**
     * Get a protected/private property for testing
     *
     * @param object|string $class The class or object
     * @param string $propertyName The property name
     * @return \ReflectionProperty
     */
    protected function getProtectedProperty( $class, $propertyName ) {
        $reflection = new \ReflectionClass( $class );
        $property = $reflection->getProperty( $propertyName );
        $property->setAccessible( true );
        return $property;
    }

    /**
     * Assert that a hook has been registered
     *
     * @param string $hook The hook name
     * @param callable $callback The callback function
     * @param int $priority The priority
     */
    protected function assertHookRegistered( $hook, $callback, $priority = 10 ) {
        global $wp_filters;

        $this->assertArrayHasKey( $hook, $wp_filters, "Hook '{$hook}' is not registered" );
        $this->assertArrayHasKey( $priority, $wp_filters[ $hook ], "Priority {$priority} not registered for hook '{$hook}'" );

        $found = false;
        foreach ( $wp_filters[ $hook ][ $priority ] as $callback_data ) {
            if ( $callback_data['callback'] === $callback ) {
                $found = true;
                break;
            }
        }

        $this->assertTrue( $found, "Callback not registered for hook '{$hook}' with priority {$priority}" );
    }
}
