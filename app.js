const proxy = require('express-http-proxy');
const app = require('express')();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()

function runApp(proxyTo,replacedOrigin,port) {
    app.use(cookieParser());
    app.use('/', proxy(proxyTo, {
        autoRewrite: true,
        proxyReqOptDecorator: function(proxyReqOpts) {
            proxyReqOpts.headers['Origin'] = replacedOrigin
            proxyReqOpts.headers['Access-Control-Allow-Credentials'] = 'true'
            return proxyReqOpts;
        },
        userResHeaderDecorator: function(headers, userReq) {
            headers['Access-Control-Allow-Origin'] = userReq.headers['origin'];
            headers['Access-Control-Allow-Credentials'] = 'true'
            if(headers['set-cookie']) {
                headers['set-cookie'] = headers['set-cookie'].map(cookie => {
                    cookie = cookie.replace(/domain=(.*)(;)/gmi, 'domain=localhost;').replace('secure', '');
                    return cookie
                });
            }
            return headers;
        }
    }));
    app.use(bodyParser.json({
        limit: '1000000mb'
    }))


    app.listen(port, () =>  {
        console.log(`Backend Proxy is listening on :${port}`)
    })
}

module.exports = {
    runApp,
}
