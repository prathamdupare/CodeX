"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserCoursesIds, getCourseById } from "@/app/services";
import { Button } from "./ui/button";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const dashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [userCourseList, setUserCourseList] = useState([]);

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (user) {
        const userCoursesIdsRes = await getUserCoursesIds(
          user?.primaryEmailAddress?.emailAddress,
        );
        if (userCoursesIdsRes) {
          const resultsArray = await Promise.all(
            userCoursesIdsRes.userEnrollSchemas.map(async (course) => {
              try {
                const res = await getCourseById(
                  course.courseId,
                  user?.primaryEmailAddress?.emailAddress,
                );
                return {
                  name: res?.courseList?.name,
                  id: res?.courseList?.id,
                  bannerUrl: res?.courseList?.banner?.url,
                };
              } catch (err) {
                console.log(err);
                return null;
              }
            }),
          );
          console.log("this is the result array", resultsArray),
            setUserCourseList(resultsArray.filter((course) => course !== null));
          setLoading(false); // Set loading to false when data fetching is complete
        }
      }
    };
    fetchUserCourses();
  }, [user]);

  return (
    <div className="flex flex-col gap-2 mx-7">
      <h2 className="text-20 font-bold">My Enrolled Courses</h2>
      {loading ? ( // Render loading state while data is being fetched
        <div>
          <div className="flex flex-col mt-3 space-y-3">
            <Skeleton className="h-[175px] w-[320px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </div>
      ) : userCourseList.length > 0 ? (
        <div className="flex items-center gap-4">
          {userCourseList.map((course, index) => (
            <Link href={`/courses/course-preview/${course.id}`} key={course.id}>
              <Card className="hover:border-green-600">
                <CardHeader>
                  <Image
                    src={course.bannerUrl}
                    alt="courseImage"
                    width={300}
                    height={300}
                  />
                </CardHeader>
                <CardContent>
                  <p>{course.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
          <Button>+</Button>
        </div>
      ) : (
        <div>There are no courses</div>
      )}
    </div>
  );
};

export default dashboard;
