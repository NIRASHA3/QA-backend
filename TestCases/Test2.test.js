const User = require("../Models/User.js");

test("should require password to be at least 6 characters", async () => {
  const user = new User({ Email: "abc@gmail.com", Password: "123" });

  await expect(user.validate()).rejects.toThrow();
});
