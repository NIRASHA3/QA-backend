const Adder = require("../Models/Adder");

 const getAllAdders = async (req, res) => {
  try {
    const records = await Adder.find();

    res.status(200).json({
      message: "All records fetched successfully",
      records: records
    });

  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { getAllAdders };