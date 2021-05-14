FROM nginx

WORKDIR /etc/nginx/conf.d

COPY default.conf .

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
