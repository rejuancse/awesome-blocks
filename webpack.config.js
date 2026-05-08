const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

// Suppress Sass deprecation warnings for @import and legacy-js-api
process.env.SASS_SILENCE_DEPRECATIONS = 'legacy-js-api';

module.exports = {
    ...defaultConfig,
    output: {
        path: path.resolve(__dirname, 'assets/build'),
    },
};

// Override sass-loader to silence deprecation warnings
const sassRule = defaultConfig.module.rules.find(
    rule => rule.test && rule.test.test('.scss')
);

if (sassRule) {
    const sassLoader = sassRule.use.find(
        loader => loader.loader && loader.loader.includes('sass-loader')
    );
    if (sassLoader) {
        sassLoader.options = {
            ...sassLoader.options,
            sassOptions: {
                ...sassLoader.options?.sassOptions,
                silenceDeprecations: ['legacy-js-api'],
            },
        };
    }
}
