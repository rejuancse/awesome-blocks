const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

// Suppress Sass deprecation warnings for @import
process.env.SASS_SILENCE_DEPRECATIONS = 'import';

module.exports = {
    ...defaultConfig,
    output: {
        path: path.resolve(__dirname, 'assets/build'),
    },
};
