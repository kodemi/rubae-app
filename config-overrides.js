const tsImportPluginFactory = require('ts-import-plugin');
const { getLoader } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireDefinePlugin = require('react-app-rewire-define-plugin');

module.exports = function override(config, env) {
    const tsLoader = getLoader(
        config.module.rules,
        (rule) =>
            rule.loader &&
            typeof rule.loader === 'string' &&
            rule.loader.includes('ts-loader')
    );

    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [
                tsImportPluginFactory({
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: true,
                }),
            ],
        }),
    };

    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        modifyVars: {
            '@font-family-no-number': 'TTLakes-Medium, Roboto, sans-serif',
        },
    })(config, env);

    config = rewireDefinePlugin(config, env, {
        'process.env.BUILD_VERSION': JSON.stringify(
            require('./scripts/getBuildVersion')
        ),
    });

    return config;
};
