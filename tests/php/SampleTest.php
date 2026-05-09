<?php
/**
 * Sample Test Case
 *
 * Example test case demonstrating basic testing patterns.
 */

namespace Awesome_Block\Tests;

class SampleTest extends TestCase {
    /**
     * Test autoloading is working
     */
    public function test_autoloading() {
        $this->assertTrue( class_exists( 'Composer\Autoload\ClassLoader' ), 'Composer autoloader should be loaded' );
    }
}
