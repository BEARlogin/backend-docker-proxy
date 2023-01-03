FROM nginx:1.22
COPY config.template .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
