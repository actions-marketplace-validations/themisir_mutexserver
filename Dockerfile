FROM node:15-alpine
WORKDIR /app
EXPOSE 80
ENV PORT=80

COPY server.js .

CMD [ "node", "server.js" ]