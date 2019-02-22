system "npm run database"
ENV["NODE_ENV"] = "testing"
system "nyc --all --reporter=lcov mocha; nyc report"
