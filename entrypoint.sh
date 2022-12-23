#!/bin/sh

export NGINX_PROXY

envsubst '${NGINX_PROXY}' < /config.template > /etc/nginx/conf.d/default.conf

exec "$@"
