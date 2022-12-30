const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/weather_api',
        createProxyMiddleware({
            target: 'https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=' + process.env.REACT_APP_WEATHER_API_KEY + '&units=metric',
            changeOrigin: true,
        })
    );
};