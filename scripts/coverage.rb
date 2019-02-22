ENV["NODE_ENV"] = "testing"
if ENV["NODE_ENV"] == true
  system "nyc --all --reporter=lcov npm test && nyc report | coveralls"
else
  system "nyc --all --reporter=lcov npm test && nyc report"
end

