"use client";
import { useEffect, useState } from "react";
import { getCourseList } from "../services";
import CourseList from "@/components/coursesComponents/CourseList";
import { Divide } from "lucide-react";

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
  return <div>{courses ? <CourseList courses={courses} /> : null}</div>;
};

export default Page;
