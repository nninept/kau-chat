const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
	// auth 포함 하위 route에 대해서는 localhost:5000/v1을 domain으로 하여 proxy설정
  app.use(
		'/lms', 
		createProxyMiddleware({ 
			target: 'http://www.hangkong.ac.kr',
			changeOrigin: true,
		}))
	// dummy 포함 하위 route에 대해서는 localhost:6000/v1을 domain으로 하여 proxy설정
  app.use(
		createProxyMiddleware(
            '/notice',{
			target: 'http://college.kau.ac.kr',
			changeOrigin: true,
		}))
}