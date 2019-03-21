Feature: View all postings

Scenario: Postings are there
Given I am on the postings page
Then I will see postings

Scenario: Go to about page
Given I am on the postings page
When I click the about button
Then I am on the about page

Scenario: Go to dashboard - logged in
Given I am on the postings page
And I am logged in
When I click the dashboard button
Then I am on my dashboard page

Scenario: Go to dashboard - logged out
Given I am on the postings page
And I am not logged in
When I click the dashboard button
Then I am can log in

Scenario: Log-in
Given I am on the postings page
And I am not logged in
When I click the login button
Then I can log in

Scenario: Log-out
Given I am on the postings page
And I am logged in
When I click the login button
Then I am logged out
And I am on the postings page

Scenario: Make a new post
Given I am on the postings page
And I am logged in
When I click the make posting button
Then I am on the make posting page
