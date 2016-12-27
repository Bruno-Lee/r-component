var path = require('path');
var webpack = require('webpack');
var notifier = require('node-notifier');
var WebpackOnBuildPlugin = require('on-build-webpack');

var notify = function (title, message, sound) {
    notifier.notify({
        title,
        message,
        sound: sound || true
    }, function (err, respond) {
        if (err) console.error(err);
    });
};

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-2']
                    }
                }
            ]
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        enforceExtension: false,
        moduleExtensions: ['-loader']
    },
    plugins: [
        new WebpackOnBuildPlugin(function (stats) {
            var compilation = stats.compilation;
            var errors = compilation.errors;
            if (errors.length > 0) {
                var error = errors[0];
                notify(error.name, error.message, 'Glass');
            } else {
                var message = 'takes ' + (stats.endTime - stats.startTime) + 'ms';
                var warningNumber = compilation.warnings.length;
                
                if (warningNumber > 0) {
                    message += ', with ' + warningNumber + ' warning(s)';
                }
                notify('webpack building done', message);
            }
        })
    ]
}