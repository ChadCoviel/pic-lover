#!/usr/bin/env bash

docker-compose down
docker-compose -f "$1" up