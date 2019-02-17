puts `parcel build client/index.html`
ENV["NODE_ENV"] = "production"
system "node app.js"
# --experimental-scope-hoisting