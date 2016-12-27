var fs = require('fs');
var path = require('path');
var express = require('express');
var rewrite = require('express-urlrewrite');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(__dirname));

fs.readdirSync(__dirname).forEach(function (file) {
    if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
        app.use(rewrite('/' + file + '/*', '/index.html'))
    }
});

app.listen(7070, function () {
    console.log('Server listening on http://localhost:7070, Ctrl+C to stop')
});



