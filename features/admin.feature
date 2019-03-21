Feature: Admin capabilities

Background:
Given I am admin

Scenario: See all users
Given I am on my dashboard page
When I click the all users button
Then I see all users

Scenario: Delete users
Given I am on the all users page
When I click the delete button for a user
Then I do not see the user
And the user is deleted

Scenario: View user's post
Given I am on the all users page
When I click on a user
Then I am on the user's dashboard page
And I see their postings

Scenario: Delete user's post
Given I am on the user's dashboard page
When I click the delete button on a posting
Then I do not see the posting
And the posting is deleted
