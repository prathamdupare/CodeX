import mongoose from "mongoose";

const couresSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  students: {
    type: Array,
    default: [],
  },
  lessons: {
    type: Array,
    default: [],
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Course = mongoose.models.Course || mongoose.model("Course", couresSchema);

export default Course;
