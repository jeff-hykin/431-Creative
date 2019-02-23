system "npm run database"
ENV["NODE_ENV"] = "testing"
exit_success = system "standard && mocha && npx babel-node --presets=@babel/react,@babel/preset-env node_modules/cucumber/bin/cucumber-js"
if not exit_success
  exit 1
end
