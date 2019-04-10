system "npm run database"
puts `npm run format`
ENV["NODE_ENV"] ="testing"
system "nodemon app.js"
