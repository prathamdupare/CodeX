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
      <div className="flex">
        <div className="w-84 border p-2 shadow-sm h-screen z-50 rounded">
          <ChapterNav
            course={course}
            userCourse={userCourse}
            setActiveChapter={(chapter) => setActiveChapter(chapter)}
          />
        </div>
        <div className="w-3/4 mx-8 ">
          <FullVideoPlayer activeChapter={activeChapter} />
        </div>
      </div>
    )
  );
};

export default ViewCouse;
