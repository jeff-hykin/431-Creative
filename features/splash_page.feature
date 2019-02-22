Feature: Splash page functionality
	People should be able to click buttons to navigate to login, browse listings, or create listings.

	Scenario: I click login on the splash page
		Given I am on the splash page
		When I click login
		Then the state is changed

	Scenario: I click browse on the splash page
		Given I am on the splash page
		When I click browse
		Then the state is changed

	Scenario: I click create on the splash page
		Given I am on the splash page
		When I click create
		Then the state is changed
