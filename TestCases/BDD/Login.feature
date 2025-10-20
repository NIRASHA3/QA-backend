Feature: User Login
  As a user
  I want to log in using my email and password
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I have a registered user with email "nirasha@gmail.com" and password "nirasha123"
    When I send a POST request to "/login" with username "nirasha@gmail.com" and password "nirasha123"
    Then The response status should be 200
    And The response should contain "Login successful"

  Scenario: Login with incorrect password
    Given I have a registered user with email "nirasha@gmail.com"
    When I send a POST request to "/login" with username "nirasha@gmail.com" and password "99999999"
    Then The response status should be 400
    And The response should contain "Incorrect password"

  Scenario: Login with non-existent user
    Given I do not have a registered user with email "nonexist123@example.com"
    When I send a POST request to "/login" with username "nonexist123@example.com" and password "anyPassword"
    Then The response status should be 400
    And The response should contain "User not found"
