Feature: 404 Page

Scenario: Visit nonexistent page
  Given I am at a nonexistent URL
  Then I should see "404" on the page
