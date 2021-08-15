# Home Rental Marketplace Platform

## Project Description

Home Rental Marketplace Platform allows users to publish, view and transact the short-term flexible rental property. 

The following tech skills are included:

- Language: Java, Javascript
- Spring Boot
- React(Ant Design Components)
- Postgres
- Docker
- Maven Build Tool
- AWS(RDS, Elastics Beanstalk)

Additionly, github action automates the CI/CD for the project and monitor the software development process by sending out the notification via slack. 

## Project Demo

[Docker Hub](https://hub.docker.com/repository/docker/vivienfay/house-rental-marketplace)

Project Demo(ongoing)

## Features Description

- Viewer:
    - View properties, including description, property type and host information, price, duration
    - Search the property(ongoing)
- Host:
    - Publish and Manage your properties, including add, delete, edit the property

## System Design

## Development Guide
- React Build
- Maven build
- Docker Run

- Build Postgres
    - Run postgres using docker
    ```
    # create network
    docker network create db
    # docker run postgres container
    docker run --name db -p 5432:5432 --network=db -v "$PWD:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=password -d postgres:alpine
    # run local posrgres
    docker run -it --rm --network=db postgres:alpine psql -h db -U postgres
    ```
    - Check schema within Postgers
    ```
    # check database
    \l
    # connect to database
    \c vivienfay
    # check tables
    \d
    ```
