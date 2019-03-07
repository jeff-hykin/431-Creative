# tell the code its running in testing mode
ENV["NODE_ENV"] = "testing"
# startup the database
system "npm run database"
# run standard, mocha, and then compile cucumber and run cucumber
exit_success = system "standard && mocha --require ignore-styles --exit && npx babel-node --require node_modules/ignore-styles --presets=@babel/react,@babel/preset-env node_modules/cucumber/bin/cucumber-js --exit"
# if cucumber failed, then this process failed (maunal check)
if not exit_success
  exit 1
end