const Adder = require("../Models/Adder");


 const registerAdder = async (req, res) => {
  try {
    const { name, address, phoneNo, age } = req.body;

    if (!name || !address || !phoneNo || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const existingRecord = await Adder.findOne({
      Name: name,
      Address: address,
      PhoneNo: phoneNo,
      Age: age
    });

    if (existingRecord) {
      return res.status(409).json({ message: "This exact record already exists" });
    }

    const newRecord = new Adder({
      Name: name,
      Age: age,
      Address: address,
      PhoneNo: phoneNo

    });

    console.log("Saving adder record:", newRecord);

    const savedRecord = await newRecord.save();
    console.log("Record saved!", savedRecord);

    res.status(201).json({
      message: "Adder record created successfully",
      record: savedRecord
    });

  } catch (error) {
    console.error("Error creating adder record:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { registerAdder };
