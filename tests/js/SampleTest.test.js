/**
 * Sample Jest Test
 *
 * Example test demonstrating basic testing patterns.
 */

describe('Sample Tests', () => {
    describe('WordPress Mocks', () => {
        test('wp global object should exist', () => {
            expect(global.wp).toBeDefined();
            expect(global.wp.hooks).toBeDefined();
            expect(global.wp.i18n).toBeDefined();
        });

        test('wp.i18n__() should return the same text', () => {
            const text = 'Hello World';
            const translated = wp.i18n.__(text, 'zepblocks' );
            expect(translated).toBe(text);
        });

        test('wp.hooks.addFilter should be a function', () => {
            expect(typeof wp.hooks.addFilter).toBe('function');
            wp.hooks.addFilter('test-hook', 'namespace', () => {});
            expect(wp.hooks.addFilter).toHaveBeenCalled();
        });
    });

    describe('JavaScript Tests', () => {
        test('basic math operations', () => {
            expect(2 + 2).toBe(4);
            expect(10 - 5).toBe(5);
            expect(3 * 3).toBe(9);
        });

        test('array operations', () => {
            const arr = [1, 2, 3, 4, 5];
            expect(arr).toHaveLength(5);
            expect(arr).toContain(3);
            expect(arr).not.toContain(10);
        });

        test('object operations', () => {
            const obj = {
                name: 'Test',
                value: 100,
            };
            expect(obj).toHaveProperty('name', 'Test');
            expect(obj).toHaveProperty('value');
        });

        test('string operations', () => {
            const str = 'ZepBlocks';
            expect(str).toMatch(/Blocks/);
            expect(str.toLowerCase()).toBe('zepblock blocks');
        });
    });

    describe('Async Tests', () => {
        test('async/await works', async () => {
            const promise = Promise.resolve('success');
            await expect(promise).resolves.toBe('success');
        });

        test('setTimeout with jest timer', () => {
            jest.useFakeTimers();
            const callback = jest.fn();

            setTimeout(callback, 1000);
            jest.advanceTimersByTime(1000);

            expect(callback).toHaveBeenCalled();
            expect(callback).toHaveBeenCalledTimes(1);
            jest.useRealTimers();
        });
    });

    describe('Function Tests', () => {
        test('callback functions', () => {
            const callback = jest.fn(x => x + 1);
            callback(5);
            expect(callback).toHaveBeenCalledWith(5);
            expect(callback).toHaveReturnedWith(6);
        });

        test('function returns', () => {
            const multiply = (a, b) => a * b;
            expect(multiply(3, 4)).toBe(12);
            expect(multiply(0, 100)).toBe(0);
        });
    });
});
