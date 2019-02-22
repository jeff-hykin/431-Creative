cyan = "\x1b[36m"
blue = "\x1b[34m"
default = "\x1b[0m"

ENV["NODE_ENV"] = "testing"
puts blue + "TRAVIS: #{ENV["TRAVIS"]}" + default
if ENV["TRAVIS"] == "true"
  puts cyan + 'Running tests and reporting coverage' + default
  system "nyc --all --reporter=lcov npm test && nyc report | coveralls"
else
  system "nyc --all --reporter=lcov npm test && nyc report"
end

