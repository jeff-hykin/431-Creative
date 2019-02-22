system "npm run database"
ENV["NODE_ENV"] = "testing"
system "standard && mocha && npx babel-node --presets=@babel/react,@babel/preset-env node_modules/cucumber/bin/cucumber-js"
