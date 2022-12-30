const { createProxyMiddleware } = require('http-proxy-middleware');

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

module.exports = function(app) {
    app.use(
        '/weather_api',
        createProxyMiddleware({
            target: 'https://api.weatherapi.com/v1/current.json?key=' + WEATHER_API_KEY + '&',
            pathRewrite: {
                '^/': '', // add base path
            },
            changeOrigin: true,
        })
    );
    app.use(
        '/forecast_api',
        createProxyMiddleware({
            target: 'https://api.weatherapi.com/v1/forecast.json?key=' + WEATHER_API_KEY + '&',
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