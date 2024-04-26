"use client";
import { getCourseById } from "@/app/services";
import EnrollmentSection from "@/components/Enrollment/EnrollmentSection";
import CourseDetails from "@/components/coursesComponents/CourseDetails";
import VideoPlayer from "@/components/coursesComponents/VideoPlayer";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const CoursePreview = ({ params }) => {
  const [coursedetail, setCourseDetails] = useState([]);

  const [userCourse, setUserCourse] = useState([]);

  const { user } = useUser();
  useEffect(() => {
    console.log(params.courseId);
    params.courseId ? getCourse(params.courseId) : null;
  }, [user]);

  const getCourse = () => {
    getCourseById(
      params.courseId,
      user?.primaryEmailAddress?.emailAddress,
    ).then((res) => {
      setCourseDetails(res.courseList);
      setUserCourse(res?.userEnrollSchemas[0]);

      console.log("this is userenroll schemas ", res?.userEnrollSchemas);
    });
  };

  return (
    coursedetail?.name && (
      <div className="mx-3">
        <div className="flex gap-3 flex-col lg:flex-row ">
          <div className="w-full p-1  md:p-5 border rounded-lg p-3 ">
            {coursedetail?.chapter[0] ? (
              <VideoPlayer videoUrl={coursedetail?.chapter[0].video.url} />
            ) : null}
            <CourseDetails coursedetail={coursedetail} />
          </div>

          <div className="w-full ">
            <EnrollmentSection
              coursedetail={coursedetail}
              userCourse={userCourse}
            />
          </div>
        </div>
      </div>
    )
  );
};
export default CoursePreview;
