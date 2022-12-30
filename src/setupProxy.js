const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/weather_api',
        createProxyMiddleware({
            target: 'https://api.openweathermap.org/data/2.5/weather?appid=' + process.env.REACT_APP_WEATHER_API_KEY + '&',
            changeOrigin: true,
        })
    );
    app.use(
        '/forecast_api',
        createProxyMiddleware({
            target: 'https://api.openweathermap.org/data/2.5/forecast/daily?appid=' + process.env.REACT_APP_WEATHER_API_KEY + '&',
            changeOrigin: true,
        })
    );
    app.use(
        '/weathercards_api',
        createProxyMiddleware({
            target: process.env.REACT_APP_WEATHER_CARD_APOLLO_API_URL,
            changeOrigin: true,
        })
    );
};