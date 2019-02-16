puts `parcel build --experimental-scope-hoisting client/index.html`
ENV["NODE_ENV"] = "production"
system "node app.js"