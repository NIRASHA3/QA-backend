const User = require("../Models/User.js");

test("should not allow empty password", async () => {
  const user = new User({ Email: "abc@gmail.com" }); // no password
  await expect(user.validate()).rejects.toThrow();
});

