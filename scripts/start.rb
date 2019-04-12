system "npm run database"
puts `npm run format`
ENV["NODE_ENV"] ="development"
system "nodemon app.js"
