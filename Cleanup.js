require('dotenv').config();
const mongoose = require('mongoose');

async function cleanup() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      console.error('MONGO_URL is not set. Set it in your environment or in a .env file (do NOT commit secrets).');
      process.exit(1);
    }
    await mongoose.connect(mongoUrl);
    const result = await mongoose.connection.db.collection('Adminadds').deleteMany({});
    console.log(`Deleted ${result.deletedCount} documents`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

cleanup();