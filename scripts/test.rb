# tell the code its running in testing mode
ENV["NODE_ENV"] = "testing"
# start up the server in the background 
# this (will also start the database)
server_process_pid = fork do
  exec "npm run start"
end
# using use detach to run in the background
Process.detach(server_process_pid)
# run standard, mocha, and then compile cucumber and run cucumber
exit_success = system "standard && mocha && npx babel-node --presets=@babel/react,@babel/preset-env node_modules/cucumber/bin/cucumber-js"
# if cucumber failed, then this process failed (maunal check)
if not exit_success
  exit 1
end
# kill the server after its done
Process.kill("INT", server_process_pid)