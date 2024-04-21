import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isPro: {
    type: Boolean,
    default: false,
  },
  courses: {
    type: Array,
    default: [],
  },
});
