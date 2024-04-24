"use client";
import { GetUserCourseList } from "@/app/services";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import CourseList from "./coursesComponents/CourseList";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Book } from "lucide-react";
import { Badge } from "./ui/badge";

const Dashboard = () => {
  const { user } = useUser();
  const [userCourseList, setUserCourseList] = useState([]);

  useEffect(() => {
    user ? getUserCourse() : null;
  }, [user]);

  const getUserCourse = async () => {
    await GetUserCourseList(user.primaryEmailAddress.emailAddress).then(
      (res) => {
        console.log(res);

        if (res) {
          setUserCourseList(res?.userEnrollSchemas);
        }
      },
    );
  };

  return (
    userCourseList && (
      <div className="flex flex-col  gap-2 ">
        <h2 className="text-[20px] font-bold">My Enrolled Courses</h2>

        <div>
          {userCourseList?.map((course, index) => (
            <>
              {course?.courseList && (
                <Link
                  href={`/courses/course-preview/${course?.courseList?.id}`}
                >
                  <Card className="flex w-[400px] h-[400px] border-2 cursor-pointer hover:border-green-600 flex-col  p-4">
                    <Image
                      src={course?.courseList?.banner?.url}
                      alt="courseImage"
                      width={300}
                      height={300}
                    />
                    <CardHeader>
                      <CardTitle className="text-[20px]">
                        {course?.courseList?.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className="p-2" variant="outline">
                          <Book size={20} />
                          {course?.courseList?.totalChapters}
                        </Badge>
                      </div>
                      <Badge variant="outline">
                        <p>{course?.courseList?.free ? "Free" : "Paid"}</p>
                      </Badge>
                    </CardHeader>
                  </Card>
                </Link>
              )}
            </>
          ))}
        </div>
      </div>
    )
  );
};

export default Dashboard;
