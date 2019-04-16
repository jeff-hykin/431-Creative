Feature: 404 Page

Scenario: Page not found
Given I go to a nonexistent URL
Then I am on the 404 page