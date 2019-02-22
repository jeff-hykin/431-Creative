puts `cross-env NODE_ENV=test nyc --all --reporter=lcov mocha; nyc report`
