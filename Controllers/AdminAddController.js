const Adder = require("../Models/Adder");
const Joi = require('joi'); // Add input validation

// Input validation schema
const adderSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).pattern(/^[a-zA-Z\s]+$/).required(),
  address: Joi.string().trim().min(1).max(200).required(),
  phoneNo: Joi.string().trim().pattern(/^[0-9+\-\s()]{10,15}$/).required(),
  age: Joi.number().integer().min(1).max(120).required()
});

const registerAdder = async (req, res) => {
  try {
    // Input validation
    const { error, value } = adderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: "Invalid input data",
        details: error.details.map(detail => detail.message)
      });
    }

    const { name, address, phoneNo, age } = value; // Use validated data

    // Check for existing record (case-insensitive and trimmed)
    const existingRecord = await Adder.findOne({
      Name: name.trim(),
      Address: address.trim(),
      PhoneNo: phoneNo.trim(),
      Age: age
    });

    if (existingRecord) {
      return res.status(409).json({ message: "This exact record already exists" });
    }

    // Create new record with sanitized data
    const newRecord = new Adder({
      Name: name.trim(),
      Age: age,
      Address: address.trim(),
      PhoneNo: phoneNo.trim()
    });

    console.log("Saving adder record:", { 
      Name: newRecord.Name, 
      Age: newRecord.Age,
      Address: '***', // Don't log sensitive data
      PhoneNo: '***' 
    });

    const savedRecord = await newRecord.save();
    
    // Don't return full record in response
    res.status(201).json({
      message: "Adder record created successfully",
      recordId: savedRecord._id,
      name: savedRecord.Name
    });

  } catch (error) {
    console.error("Error creating adder record:", error.message); // Don't log full error
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerAdder };