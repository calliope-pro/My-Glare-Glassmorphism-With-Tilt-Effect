FROM node:18

RUN apt-get update &&\
    apt-get install -y git

WORKDIR /app
