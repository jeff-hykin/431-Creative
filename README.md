[![Coverage Status](https://coveralls.io/repos/github/jeff-hykin/431-Creative/badge.svg?branch=master)](https://coveralls.io/github/jeff-hykin/431-Creative?branch=master)

# 431-Creative
We are team Creative and this is our project for the Aggie Coding Club. This is a web application that connects members of ACC to those that are searching for development help.

# Requirements
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/)

# Getting Started
To get this application:
```
git clone https://github.com/gracewes/431-Creative.git
```
Before running, always install all dependencies:
```
npm install
```
Once complete you can start the entire application up with the following:
```
npm start
```
> This will start up a local database, start up the server which includes all the necessary bundling

To clean up any lingering resources:
```
npm stop
```
> This includes stopping and removing the current MongoDB Docker container

# Client
To just run the client without any of the backend resources:
```
npm run client
```

# Testing
Our application makes use of both unit and behavior tests using the following packages:
- [Mocha](https://mochajs.org/) - general testing framework
- [Enzyme](https://airbnb.io/enzyme/) - testing for React
- [Cucumber](https://cucumber.io/) - behavior driven development

To run the tests:
```
npm test
```

