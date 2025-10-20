const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
unique:true,
lowercase:true,
match:[
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
            "Please fill a valid email address"
          ]  
},
  Password: {
    type: String,
    required: true,
    minlength: 6, 
    }
});

module.exports = mongoose.model("UserData", userSchema, "UserLogin");
