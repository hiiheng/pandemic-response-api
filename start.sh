#!/bin/bash

docker network create pandemic

docker run -itd --network pandemic --env-file ./env/.mongo.env -p 27017:27017 --name mongodev mongo
docker run -itd --network pandemic --env-file ./env/.airnotifier.env -p 8801:8801 --name airnotifierdev airnotifier
docker run -itd --network pandemic --env-file ./env/.mongo-express.env -p 8081:8081 --name mongoexpressdev mongo-express
docker-compose -f docker-compose.prisma.yml up -d 
