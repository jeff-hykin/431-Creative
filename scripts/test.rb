system "npm run database"
ENV["NODE_ENV"] = "testing"
system "standard && mocha && cucumber-js"
