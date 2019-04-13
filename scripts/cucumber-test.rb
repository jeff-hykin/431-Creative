# tell the code its running in testing mode
ENV["NODE_ENV"] = "testing"
# start local app
system "npm run database"
system "node app.js"
# run cucumber
exit_success = system "node_modules/.bin/cucumber-js --exit"
# if cucumber failed, then this process failed (maunal check)
if not exit_success
  exit 1
end
