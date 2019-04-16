Feature: User Dashboard

Background: 
Given I am logged in

# Post interactions

Scenario: Add posting
Given I go to my dashboard page
When I click the make posting button
Then I am on the make posting page
Then I add a post

Scenario: See my posts
Given I go to my dashboard page
Then I can see posts by me

Scenario: Edit my post/Delete my post
Given I go to my dashboard page
When I click edit on my post
Then I am on the edit posting page
Given I go to my dashboard page
When I click delete on my post
Then I no longer see the post

# Navigation interactions

Scenario: Go to all postings
Given I go to my dashboard page
#could be postings button, back button, all postings etc.
When I click the postings button
Then I am on the postings page

Scenario: Log out
Given I go to my dashboard page
When I click the logout button
Then I am on the postings page
