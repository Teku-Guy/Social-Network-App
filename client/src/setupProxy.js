// client/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/graphql', '/healthz'],
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true
    })
  );
};