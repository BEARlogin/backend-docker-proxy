const proxy = require('express-http-proxy');
const app = require('express')();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cookieParser());
app.use('/', proxy(process.env.PROXY_TO, {
    autoRewrite: true,
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        proxyReqOpts.headers['Origin'] = process.env.REPLACED_ORIGIN
        proxyReqOpts.headers['Access-Control-Allow-Credentials'] = 'true'
        return proxyReqOpts;
    },
    userResHeaderDecorator: function(headers, userReq) {
        headers['Access-Control-Allow-Origin'] = userReq.headers['origin'];
        if(headers['set-cookie']) {
            headers['set-cookie'] = headers['set-cookie'].map(cookie => {
                cookie = cookie.replace(/domain=(.*)(;)/gmi, 'domain=localhost;').replace('secure', '');
                return cookie
            });
        }
        return headers;
    }
}));
app.use(bodyParser.json())


app.listen(80)