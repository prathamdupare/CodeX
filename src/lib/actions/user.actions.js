"use server";
const { default: User } = require("../models/userModel");
const { default: connectToDb } = require("../mongoDB/connectToDb");

export const updateUser = async () => {
  try {
    await connectToDb();
    await User.create({
      id: "some random id",
      name: "John Doe",
      email: "some random email ",
      isPro: false,
      courses: [],
    });

    console.log("User created");
  } catch (error) {
    console.error(error);
  }
};
