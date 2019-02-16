![](https://img.shields.io/github/last-commit/gracewes/431-Creative.svg?style=for-the-badge)
![](https://img.shields.io/david/gracewes/431-Creative.svg?style=for-the-badge)
![](https://img.shields.io/david/dev/gracewes/431-Creative.svg?style=for-the-badge)
![](https://img.shields.io/github/commit-activity/w/gracewes/431-Creative.svg?style=for-the-badge)
![](https://img.shields.io/github/languages/count/gracewes/431-Creative.svg?style=for-the-badge)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard.js-brightgreen.svg?style=for-the-badge)](https://standardjs.com)
![](https://img.shields.io/github/license/gracewes/431-Creative.svg?style=for-the-badge)


<!-- [![Coverage Status](https://coveralls.io/repos/github/gracewes/431-Creative/badge.svg?branch=master)](https://coveralls.io/github/jeff-hykin/431-Creative?branch=master)  -->

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

To run in a *production* environment:
```
npm run prod
```
> A local database will not be provided. The location of the production database needs to specified in the `settings.database` of `package.json`
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

# Dependencies
These are some of the major dependencies used for the development of this application:
- [Express](https://expressjs.com/) - web framework for Node.js
- [React](https://reactjs.org/) - front-end development framework
- [ReactRouter](https://reacttraining.com/react-router/) - routing for the React application
- [Parcel](https://parceljs.org/) - fast, minimal configuration web application bundler
- [Travis CI](https://travis-ci.org/) - CI/CD tool
- [StandardJS](https://standardjs.com/) - the JavaScript Standard Style that we will be using

# Development Information
## Settings
All/Most settings are in the `package.json` file underneath the `settings` key.

#### StandardJS
There might be some global variables that StandardJS does not like (i.e. `fetch`). To prevent getting errors regarding these variables, add them to the list in of `standard.globals` inside of the `package.json` file.

## Testing
All unit tests should be written inside of the `test/` directory.
All cucumber tests should be written inside of the `features/` directory.

## Formatting
We are following the [JavaScript Standard Style](https://standardjs.com/). To fix formatting of your code, run the following:
```
npm run format
```
