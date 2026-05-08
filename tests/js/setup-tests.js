/**
 * Jest Setup File
 *
 * This file is run once before all tests to set up the testing environment.
 */

// Import Jest DOM matchers
import '@testing-library/jest-dom';

// Mock WordPress global objects
global.wp = {
    hooks: {
        addFilter: jest.fn(),
        addAction: jest.fn(),
        removeFilter: jest.fn(),
        removeAction: jest.fn(),
        applyFilters: jest.fn( ( value, ...args ) => value ),
        doAction: jest.fn(),
        hasFilter: jest.fn(),
        hasAction: jest.fn(),
        filters: {},
        actions: {},
    },
    i18n: {
        __(text, domain = 'default') {
            return text;
        },
        _x(text, context, domain = 'default') {
            return text;
        },
        _n(single, plural, number, domain = 'default') {
            return number === 1 ? single : plural;
        },
        _nx(single, plural, number, context, domain = 'default') {
            return number === 1 ? single : plural;
        },
        setLocaleData(data, domain = 'default') {
            return true;
        },
    },
    blocks: {
        registerBlockType: jest.fn(),
        registerBlockStyle: jest.fn(),
        unregisterBlockStyle: jest.fn(),
        getBlockType: jest.fn(),
        getBlockTypes: jest.fn(),
        unregisterBlockType: jest.fn(),
    },
    element: {
        createElement: jest.fn(),
        Fragment: 'Fragment',
        Component: class Component {},
    },
    components: {
        Dashicon: 'Dashicon',
        Button: 'Button',
        CheckboxControl: 'CheckboxControl',
        RadioControl: 'RadioControl',
        TextControl: 'TextControl',
        TextAreaControl: 'TextAreaControl',
        SelectControl: 'SelectControl',
        ToggleControl: 'ToggleControl',
        Panel: 'Panel',
        PanelBody: 'PanelBody',
        PanelRow: 'PanelRow',
    },
    data: {
        dispatch: jest.fn(),
        select: jest.fn(),
        registerStore: jest.fn(),
        useSelect: jest.fn(),
        useDispatch: jest.fn(),
    },
    editor: {
        RichText: 'RichText',
        InspectorControls: 'InspectorControls',
        BlockControls: 'BlockControls',
        useBlockProps: jest.fn(),
    },
    apiUrl: {
        fetch: jest.fn(),
    },
};

// Mock @wordpress packages
jest.mock('@wordpress/hooks', () => global.wp.hooks);
jest.mock('@wordpress/i18n', () => global.wp.i18n);
jest.mock('@wordpress/blocks', () => global.wp.blocks);
jest.mock('@wordpress/element', () => global.wp.element);
jest.mock('@wordpress/components', () => global.wp.components);
jest.mock('@wordpress/data', () => global.wp.data);
jest.mock('@wordpress/editor', () => global.wp.editor);

// Mock window.wp for browser-like environment
if (typeof window !== 'undefined') {
    window.wp = global.wp;
}

// Reset all mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});

// Suppress console errors and warnings in tests unless debugging
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
    console.error = (...args) => {
        if (
            args[0] &&
            typeof args[0] === 'string' &&
            args[0].includes('Warning:')
        ) {
            return;
        }
        originalError.call(console, ...args);
    };

    console.warn = (...args) => {
        if (
            args[0] &&
            typeof args[0] === 'string' &&
            args[0].includes('Warning:')
        ) {
            return;
        }
        originalWarn.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
    console.warn = originalWarn;
});
