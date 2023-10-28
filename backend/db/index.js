const mongoose = require("mongoose");
  
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNNECTION_STRING);
    console.log("Database connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};   
 
module.exports = connectDb; 
