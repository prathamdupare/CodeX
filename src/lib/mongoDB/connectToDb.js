"use server";
const { default: mongoose } = require("mongoose");
const connection = {};

const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URL);
    connection.isConnected = db.connections[0].readyState;
    console.log("==========Connected to DB=============");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to Mongodb");
  }
};

export default connectToDb;
