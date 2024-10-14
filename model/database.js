// const mongoose=require('mongoose')
// require('dotenv').config()
// async function main(){
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("mongodb connected")
// }

// module.exports=main

const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
  try {
    // Load the MongoDB URI from environment variables
    const mongoURI = process.env.MONGO_URL;

    if (!mongoURI) {
      throw new Error('MONGO_URL is not defined in .env file');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

module.exports = main;
