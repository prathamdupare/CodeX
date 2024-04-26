"use client";

import { getCourseById } from "@/app/services";
import ChapterNav from "@/components/coursesComponents/ChapterNav";
import FullVideoPlayer from "@/components/coursesComponents/FullVideoPlayer";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const ViewCouse = ({ params }) => {
  const { user } = useUser();

  const [course, setCourse] = useState([]);
  const [userCourse, setUserCourse] = useState([]);

  const [activeChapter, setActiveChapter] = useState();
  useEffect(() => {
    user ? getCourse() : null;
  }, [user]);

  const getCourse = async () => {
    await getCourseById(
      params?.courseId,
      user.primaryEmailAddress.emailAddress,
    ).then((res) => {
      console.log("maybe this is the onee", res);

      setCourse(res.courseList);
      setUserCourse(res.userEnrollSchemas);
    });
  };
  return (
    course?.name && (
      <div className="flex flex-col lg:flex-row ">
        {" "}
        {/* Use grid container */}
        {/* Video Player */}
        <div className=" w-full px-4 mt-2 flex flex-col items-center justify-center ">
          {" "}
          {/* Span 2 columns on medium screens and above */}
          <FullVideoPlayer activeChapter={activeChapter} />
        </div>
        {/* Chapter Nav */}
        <div className="md:col-span-1 px-4 h-full mx-2 border p-2 shadow-sm rounded">
          {" "}
          {/* Span 1 column on medium screens and above */}
          <ChapterNav
            course={course}
            userCourse={userCourse}
            setActiveChapter={(chapter) => setActiveChapter(chapter)}
          />
        </div>
      </div>
    )
  );
};

export default ViewCouse;
