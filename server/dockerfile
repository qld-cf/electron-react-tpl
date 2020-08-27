FROM node:12

RUN mkdir -p /home/Service


WORKDIR /home/Service

COPY . /home/Service

RUN npm install -g typescript
RUN npm install

ENV NODE_ENV production

#PORT
EXPOSE 8025
EXPOSE 3025

CMD [ "npm","run","build" ]
