/**
 * Block Component Test Example
 *
 * Example test demonstrating how to test Gutenberg blocks.
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock WordPress dependencies
import { createElement } from '@wordpress/element';

describe('Block Component Tests', () => {
    // Simple test component
    const TestBlock = ({ attributes, className = '' }) => {
        return createElement(
            'div',
            {
                className: `wp-block-test ${className}`.trim(),
            },
            createElement('h2', null, attributes?.title || 'Default Title'),
            createElement('p', null, attributes?.content || 'Default content')
        );
    };

    describe('Basic Block Rendering', () => {
        test('renders block with default attributes', () => {
            const attributes = {};
            const { container } = render(createElement(TestBlock, { attributes }));

            expect(container.querySelector('h2')).toHaveTextContent('Default Title');
            expect(container.querySelector('p')).toHaveTextContent('Default content');
        });

        test('renders block with custom attributes', () => {
            const attributes = {
                title: 'Custom Title',
                content: 'Custom content here',
            };

            const { container } = render(createElement(TestBlock, { attributes }));

            expect(container.querySelector('h2')).toHaveTextContent('Custom Title');
            expect(container.querySelector('p')).toHaveTextContent('Custom content here');
        });

        test('applies custom className', () => {
            const attributes = { title: 'Test' };
            const className = 'my-custom-class';

            const { container } = render(
                createElement(TestBlock, { attributes, className })
            );

            const block = container.querySelector('.wp-block-test');
            expect(block).toHaveClass('my-custom-class');
            expect(block).toHaveClass('wp-block-test');
        });
    });

    describe('Attribute Handling', () => {
        test('handles empty attributes', () => {
            const attributes = null;
            const { container } = render(createElement(TestBlock, { attributes }));

            expect(container.querySelector('h2')).toBeInTheDocument();
            expect(container.querySelector('p')).toBeInTheDocument();
        });

        test('handles numeric attributes', () => {
            const attributes = {
                title: 'Post 123',
                count: 123,
            };

            const { container } = render(createElement(TestBlock, { attributes }));
            expect(container.querySelector('h2')).toHaveTextContent('Post 123');
        });

        test('handles array attributes', () => {
            const attributes = {
                title: 'Categories',
                items: ['Cat1', 'Cat2', 'Cat3'],
            };

            const TestComponent = ({ attributes }) => {
                return createElement(
                    'div',
                    null,
                    ...attributes.items.map(item =>
                        createElement('span', { key: item }, item)
                    )
                );
            };

            const { container } = render(createElement(TestComponent, { attributes }));
            expect(container.querySelectorAll('span')).toHaveLength(3);
        });
    });

    describe('WordPress Integration', () => {
        test('uses WordPress hooks', () => {
            const callback = jest.fn(value => value + ' modified');
            wp.hooks.addFilter('test-filter', 'namespace', callback);

            const result = wp.hooks.applyFilters('test-filter', 'original');
            expect(result).toBe('original modified');
            expect(callback).toHaveBeenCalledWith('original');
        });

        test('uses WordPress i18n', () => {
            const text = 'Save Changes';
            const translated = wp.i18n.__(text, 'awesome-blocks');

            expect(translated).toBe(text);
        });

        test('registers block type', () => {
            wp.blocks.registerBlockType('awesome-blocks/test', {
                title: 'Test Block',
                category: 'common',
            });

            expect(wp.blocks.registerBlockType).toHaveBeenCalledWith(
                'awesome-blocks/test',
                expect.objectContaining({
                    title: 'Test Block',
                    category: 'common',
                })
            );
        });
    });

    describe('User Interaction', () => {
        test('handles click events', () => {
            const handleClick = jest.fn();

            const Button = () => {
                return createElement('button', {
                    onClick: handleClick,
                    type: 'button',
                }, 'Click Me');
            };

            const { container } = render(createElement(Button));

            const button = container.querySelector('button');
            button.click();

            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        test('handles input changes', () => {
            const handleChange = jest.fn();

            const Input = ({ value, onChange }) => {
                return createElement('input', {
                    type: 'text',
                    value: value || '',
                    onChange: (e) => onChange(e.target.value),
                });
            };

            const { container } = render(
                createElement(Input, { value: 'initial', onChange: handleChange })
            );

            const input = container.querySelector('input');
            input.value = 'new value';

            // Simulate change event
            const event = { target: { value: 'new value' } };
            input.dispatchEvent(new Event('change', { bubbles: true }));

            // Note: In real tests, you'd use fireEvent from @testing-library/react
            expect(input.value).toBe('new value');
        });
    });
});
