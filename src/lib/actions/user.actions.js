"use server";
const { default: User } = require("../models/userModel");
const { default: connectToDb } = require("../mongoDB/connectToDb");

export const updateUser = async () => {
  try {
    await connectToDb();
    await User.create({
      id: " fdsafskldj  some random id",
      name: "John Doei dfasdf  ",
      email: "some random email ",
      isPro: false,
      courses: [],
    });

    console.log("User created");
  } catch (error) {
    console.error(error);
  }
};
