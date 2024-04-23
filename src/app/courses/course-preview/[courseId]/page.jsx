"use client";
import { getCourseById } from "@/app/services";
import EnrollmentSection from "@/components/Enrollment/EnrollmentSection";
import CourseDetails from "@/components/coursesComponents/CourseDetails";
import VideoPlayer from "@/components/coursesComponents/VideoPlayer";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const CoursePreview = ({ params }) => {
  const [coursedetail, setCourseDetail] = useState([]);

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
      console.log(res);
      setCourseDetail(res.courseList);
      console.log(coursedetail);
    });
  };

  return (
    coursedetail?.name && (
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-2 border rounded-lg p-3 ">
            {coursedetail?.chapter[0] ? (
              <VideoPlayer videoUrl={coursedetail?.chapter[0].video.url} />
            ) : null}
            <CourseDetails coursedetail={coursedetail} />
          </div>

          <div className="my-2 md:mx-4 md:my-0">
            <EnrollmentSection coursedetail={coursedetail} />
          </div>
        </div>
      </div>
    )
  );
};
export default CoursePreview;
