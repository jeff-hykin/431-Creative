# puts `parcel build client/index.html -d static/dist`
system "npm run heroku-postbuild"
ENV["NODE_ENV"] = "production"
system "node app.js"
# --experimental-scope-hoisting