"use client";
import { useEffect, useState } from "react";
import { getCourseList } from "../services";
import CourseList from "@/components/coursesComponents/CourseList";

const Page = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCourses();
  }, []);
  const getCourses = () => {
    getCourseList().then((res) => {
      console.log(res);
      setCourses(res.courseLists);
    });
  };
  return (
    <>
      <div>page</div>
      {courses ? <CourseList courses={courses} /> : null}
    </>
  );
};

export default Page;
