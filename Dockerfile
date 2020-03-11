FROM node:12.13.0-alpine

ADD build/main /
COPY newrelic.js /
COPY version.json /
ADD node_modules /node_modules
ENV NODE_ENV production
EXPOSE 8800

CMD ["node", "index.js"]
