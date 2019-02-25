# tell the code its running in testing mode
ENV["NODE_ENV"] = "testing"
# run standard, mocha, and then compile cucumber and run cucumber
exit_success = system "npx babel-node --presets=@babel/react,@babel/preset-env node_modules/cucumber/bin/cucumber-js"
# if cucumber failed, then this process failed (maunal check)
if not exit_success
  exit 1
end