var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config');
// var history = require('connect-history-api-fallback');
// var proxy = require('http-proxy-middleware');

var app = express();
var compiler = webpack(config);

// Customize log
app.use(require('morgan')('short'));

// app.use(history());
// app.use(proxy('/api', {target: 'http://localhost:8080', changeOrigin: true}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: "/__webpack_hmr",
  heartbeat: 2000
}));

app.use("/", express.static(path.join(__dirname, "./")));

app.get("/", (request, response) => {
  response.sendfile(path.join(__dirname, "./index.html"))
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
