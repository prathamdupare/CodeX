"use server";

const createCourse = async (name, description, image, price) => {
  try {
    await connectToDb();
    await Course.create({
      id: "",
      name: name,
      description: description,
      students: [],
      lessons: [],
      image: image,
      date: Date.now(),
      price: price,
    });
  } catch (error) {
    console.error(error);
  }
};
