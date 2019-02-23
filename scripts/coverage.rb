cyan = "\x1b[36m"
blue = "\x1b[34m"
default = "\x1b[0m"

ENV["NODE_ENV"] = "testing"
puts blue + "TRAVIS: #{ENV["TRAVIS"]}" + default

exit_success = true

if ENV["TRAVIS"] == "true"
  puts blue + 'Running tests and reporting coverage' + default
  exit_success = system "nyc --all --reporter=lcov npm test && nyc report --reporter=text-lcov | coveralls"
else
  exit_success = system "nyc --all --reporter=lcov npm test && nyc report"
end

if not exit_success
  exit 1
end
