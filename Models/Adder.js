 const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Address: {
    type: String,
    required: true,
    trim: true
  },
  PhoneNo: {
    type: String,
    required: true,
    match: [
     /^\d{10}$/,
     "Please fill a valid phone number"
   ]

  },
  Age: {
    type: Number,
    required: true,
    min: 1
  },
ProfilePhoto: {
 type: String, default: "" }

}, { timestamps: true });

module.exports= mongoose.model("Add", userSchema, "Adminadds");
