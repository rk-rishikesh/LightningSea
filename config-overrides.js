const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override (config, env) {
    console.log('override')
    config.resolve.fallback = {
        "fs": false,
        "tls": false,
        "net": false,
        "http": require.resolve("stream-http"),
        "https": require.resolve('https-browserify'),
        "zlib": require.resolve("browserify-zlib") ,
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        //"util": require.resolve("util/"),
        // "url": require.resolve("url/"),
        "crypto": require.resolve("crypto-browserify")
    }
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

    return config;
}