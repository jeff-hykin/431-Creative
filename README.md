<!-- ![](https://img.shields.io/snyk/vulnerabilities/github/gracewes/431-Creative.svg?colorB=g&style=for-the-badge) -->
<!-- ![](https://img.shields.io/coveralls/github/gracewes/431-Creative.svg?style=for-the-badge)-->

[![](https://img.shields.io/github/last-commit/gracewes/431-Creative.svg?style=for-the-badge)](https://github.tamu.edu/gracewes/Creative/graphs/commit-activity)
![](https://img.shields.io/david/gracewes/431-Creative.svg?style=for-the-badge)
![](https://img.shields.io/david/dev/gracewes/431-Creative.svg?style=for-the-badge)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard.js-brightgreen.svg?style=for-the-badge)](https://standardjs.com)
[![](https://img.shields.io/github/commit-activity/w/gracewes/431-Creative.svg?style=for-the-badge)](https://github.tamu.edu/gracewes/Creative/graphs/commit-activity)
![](https://img.shields.io/github/languages/count/gracewes/431-Creative.svg?style=for-the-badge)
[![](https://img.shields.io/github/license/gracewes/431-Creative.svg?style=for-the-badge)](https://github.tamu.edu/gracewes/Creative/blob/master/LICENSE)
[![](https://img.shields.io/github/contributors/gracewes/431-Creative.svg?style=for-the-badge)](https://github.com/gracewes/431-Creative/graphs/contributors)
[![Build Status](https://img.shields.io/travis/gracewes/431-Creative.svg?style=for-the-badge)](https://travis-ci.org/gracewes/431-Creative)
[![](https://img.shields.io/snyk/vulnerabilities/github/gracewes/431-Creative.svg?style=for-the-badge)](https://snyk.io/test/github/gracewes/431-Creative)
[![](https://img.shields.io/coveralls/github/gracewes/431-Creative.svg?style=for-the-badge)](https://coveralls.io/github/gracewes/431-Creative)


# 431-Creative
We are team Creative and this is our project for the Aggie Coding Club. This is a web application that connects members of ACC to those that are searching for development help.

Check out the deployed app here: https://tranquil-dusk-38037.herokuapp.com/

# Requirements
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/)
- [Ruby](https://www.ruby-lang.org/en/)

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
To generate a test coverage report using nyc and the lcov reporter:
```
npm run coverage
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

## Environment Variables
```
DB_PASS=password for remote database
```

## Remote Database Information

To access the remote DB online, go here: https://cloud.mongodb.com/user#/atlas/login

Under the "Clusters" menu, click "ProdCluster". Next click the "Collections" tab. Once there, you will be able to access and manage the data

For more information, you can find it here: https://docs.atlas.mongodb.com/getting-started/