
const Add = require("../Models/Adder.js");

test("should require phone number to be exactly 10 digits", () => {
  const user = new Add({
    Name: "Nirasha",
    Address: "Kegalle",
    PhoneNo: "123456789", // 9 digits
    Age: 23,
    ProfilePhoto: ""
  });

  const error = user.validateSync();

  // Check that a validation error exists
  expect(error).toBeDefined();
});
