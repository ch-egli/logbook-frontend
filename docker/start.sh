#!/bin/sh

# replace static values with environment-variables
if [ -n "$AUTHSERVER_URL" ]; then
    sed -i "s#http://auth-server-cloudstack.ose.sbb.ch/#$AUTHSERVER_URL#g" /usr/share/nginx/html/bundle.js
fi

# start webserver
exec nginx
