import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Book } from "lucide-react";
import Link from "next/link";

const CourseList = ({ courses }) => {
  return (
    <div className="flex gap-4 flex-wrap items-center justify-center">
      {courses.map((course, index) => (
        <div
          key={index}
          className="flex items-center gap-3 flex-wrap  justify-center"
        >
          <Link href={`/courses/course-preview/${course.id}`}>
            <Card className="flex items-center w-[300px] h-[350px] border-2 cursor-pointer hover:border-green-600 flex-col p-4">
              <div className=" flex items-center h-1/2">
                <Image
                  src={course.banner.url}
                  alt="courseImage"
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
              <CardHeader className="mt-4">
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <div className="flex gap-2 items-center my-2">
                  <Badge className="flex p-2 gap-2" variant="outline">
                    <Book size={20} />
                    {course.totalChapters} Chapters
                  </Badge>

                  <Badge className="flex p-2 items-center justify-center gap-2">
                    {course.free ? "Free" : "Paid"}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default CourseList;
