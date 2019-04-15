Feature: View all postings

Scenario: Postings are there
Given I go to the postings page
Then I will see postings

Scenario: Go to about page
Given I go to the postings page
When I click the about button
Then I am on the about page

Scenario: Go to dashboard - logged in
Given I am logged in
Given I go to the postings page
When I click the dashboard button
Then I am on my dashboard page

Scenario: Log-in
Given I go to the postings page
When I click the login button
Then I can log in

Scenario: Log-out
Given I am logged in
Given I go to the postings page
When I click the logout button
Then I am on the postings page

Scenario: Make a new post - Logged in
Given I am logged in
Given I go to the postings page
When I click the make posting button
Then I am on the make posting page

Scenario: Make a new post - not logged in
Given I go to the postings page
When I click the make posting button
Then I can log in