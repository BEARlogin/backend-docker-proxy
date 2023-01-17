const app = require('express')();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

const limit = '1000000mb'

function runApp(proxyTo,replacedOrigin,port) {
    app.use(cookieParser());
    app.use('/',createProxyMiddleware({
        target: proxyTo,
        changeOrigin: true,
        autoRewrite: true,
        logLevel: 'debug',
        ws: true,
        cookieDomainRewrite: {
            "*": "localhost"
        },
        onProxyReq: (proxyReq) => {
            proxyReq.setHeader('Origin', replacedOrigin)
            proxyReq.setHeader('Access-Control-Allow-Credentials','true')
        },
        onProxyRes: (proxyRes, req) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = req.headers['origin'];
            proxyRes.headers['Access-Control-Allow-Credentials'] = 'true'
        },
        onProxyReqWs:(proxyReq, req, socket, options, head) => {
            proxyReq.setHeader('Origin', replacedOrigin)
            proxyReq.setHeader('Access-Control-Allow-Credentials','true')
        },
    }))
    app.use(bodyParser.json({
        limit,
    }))


    app.listen(port, () =>  {
        console.log(`Backend Proxy is listening on :${port}`)
    })

}

module.exports = {
    runApp,
}
