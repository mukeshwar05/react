const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://tr593l1uo0.execute-api.eu-north-1.amazonaws.com/dev',
      changeOrigin: true,
    })
  );
};