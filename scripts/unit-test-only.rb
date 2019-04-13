# tell the code its running in testing mode
ENV["NODE_ENV"] = "testing"
# startup the database
system "npm run database"
# run standard, mocha, and then compile cucumber and run cucumber
exit_success = system "mocha --require ignore-styles"
#  if cucumber failed, then this process failed (maunal check)
if not exit_success
  exit 1
end
