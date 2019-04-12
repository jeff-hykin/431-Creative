Feature: User Dashboard

Background: 
Given I am logged in

Scenario: See my posts
Given I add a post
Given I am on my dashboard page
Then I can see posts by me

Scenario: Add posting
Given I am on my dashboard page
When I click the make posting button
Then I am on the make posting page

Scenario: Edit my post
Given I am on my dashboard page
When I click edit on my post
Then I am on the edit posting page

Scenario: Delete my post
Given I am on my dashboard page
When I click delete on my post
Then I no longer see the post

Scenario: Go to all postings
Given I am on my dashboard page
#could be postings button, back button, all postings etc.
When I click the postings button
Then I am on the postings page

Scenario: Log out
Given I am on my dashboard page
When I click the logout button
Then I am on the postings page