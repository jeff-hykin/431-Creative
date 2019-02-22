  # EXAMPLE CODE FOR CUCUMBER TESTS

Feature: Splash page functionality
  People will want to click our splash page to do things

  Scenario: I click on our splash page
    Given I am on the splash page
    When I try to click button1
    When I try to click button2
    When I try to click button3
    When I try to click button4
    Then something should happen

  # Scenario Outline: I want to do something
  #   Given I have value <a>
  #   When i have the input "<word>"
  #   Then i should output "<return>"

  # Examples:
  #   | a | word | return |
  #   | 1 | docker | Thomas |
  #   | 2 | duel end | Jeff |