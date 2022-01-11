const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {

  app.use(

    createProxyMiddleware("/api", {

      target: 'http://221.140.17.128:3000',

      changeOrigin: true,

    })

  );

};