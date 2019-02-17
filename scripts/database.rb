red = "\x1b[31m"
green = "\x1b[32m"
blue = "\x1b[34m"
cyan = "\x1b[36m"
default = "\x1b[0m"

require 'open3'

Open3.popen3("docker run --name mongo-dev-431 -p 27017:27017 -d mongo") {|i,o,e,t|
  # Check if container already running
  err_msg = e.read.chomp
  if !err_msg.match(/docker: Error response from daemon: Conflict\. The container name "\/mongo-dev-431" is already in use by container/)
    puts red + err_msg + default
  end
  puts cyan + o.read.chomp + default
}