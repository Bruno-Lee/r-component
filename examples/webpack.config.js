var path = require('path');
var fs = require('fs');
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

var exist = function (filename) {
    try {
        fs.accessSync(filename);
        return true;
    } catch(ex) {
        return false;
    };
}
var getEntry = function () {
    return fs.readdirSync(__dirname).reduce(function (entries, dir) {
        var dirPath = path.join(__dirname, dir);
        var entryPath = path.join(dirPath, 'index.js');
        if (fs.statSync(dirPath).isDirectory() && exist(entryPath)) {
            entries[dir] = entryPath;
        }

        return entries;
    }, {});
};

module.exports = {
    watch: true,
    entry: path.resolve(__dirname, 'index.js'),
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            }],
            exclude: [/node_modules/]
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist',
        filename: 'index.js'
    },
    resolve: {
        enforceExtension: false,
        moduleExtensions: ['-loader'],
        alias: {
            common_path: path.resolve(__dirname, 'common')
        }
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