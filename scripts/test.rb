system "npm run database"
# TODO: seed data
ENV["NODE_ENV"] ="testing"
puts `standard && mocha && cucumber-js`