Feature: Admin capabilities

# Currently the test user has been manually 
# set to be an admin in order to test these features

Background:
Given I am logged in
# Given I am admin

Scenario: See and delete users
Given I go to my dashboard page
When I click the admin button
When I am on the users tab
Then I see all users
When I click the delete button for a user
Then I do not see the user

Scenario: View and delete users' post
Given I go to my dashboard page
When I click the admin button
Then I see all posts
When I click the delete button on a posting
Then I do not see the posting


