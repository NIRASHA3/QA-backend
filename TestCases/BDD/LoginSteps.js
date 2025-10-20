const { Given, When, Then, setDefaultTimeout, BeforeAll, AfterAll, Before } = require("@cucumber/cucumber");
const request = require("supertest");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("../../Server");
const User = require("../../Models/User");

dotenv.config();
setDefaultTimeout(20 * 1000);

let response;

// Connect to MongoDB before all tests
BeforeAll(async function () {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for tests");
  }
});

// Disconnect after all tests
AfterAll(async function () {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB after tests");
});

// Clear users before each scenario
Before(async function () {
  await User.deleteMany({});
});

// Create a user with given email and password
Given('I have a registered user with email {string} and password {string}', async function(email, password) {
  const user = new User({ Email: email.toLowerCase(), Password: password });
  await user.save();
});

// Ensure user exists with default password (for incorrect password test)
Given('I have a registered user with email {string}', async function(email) {
  const user = new User({ Email: email.toLowerCase(), Password: "correctpassword" });
  await user.save();
});

// Ensure user does NOT exist (non-existent user scenario)
Given('I do not have a registered user with email {string}', async function(email) {
  // do nothing, just make sure the user is not there
  await User.deleteOne({ Email: email.toLowerCase() });
});

// Send POST request to login endpoint
When('I send a POST request to {string} with username {string} and password {string}', async function(url, username, password) {
  response = await request(app)
    .post(url)
    .send({ username, password });
});

// Check response status
Then('The response status should be {int}', function(status) {
  if (response.status !== status) {
    throw new Error(`Expected status ${status}, but got ${response.status}`);
  }
});

// Check response message
Then('The response should contain {string}', function(message) {
  if (!response.body.message.includes(message)) {
    throw new Error(`Expected message "${message}", but got "${response.body.message}"`);
  }
});
