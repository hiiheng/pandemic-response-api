#!/bin/bash

if [ ! -f "certs" ]; then
  mkdir certs
fi

if [ ! -f "logs" ]; then
  mkdir logs
fi

# these commands dont get blocked, run them after this script executes, and then can run `yarn start` 
#
# swarm mode
# - docker stack rm app
# - docker stack deploy -c docker-compose.yml app
#
# or use docker-compose
# - docker-compose up -d

yarn
yarn prisma:generate

