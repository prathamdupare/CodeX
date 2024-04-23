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
            <Card className="flex w-[400px] h-[350px] border-2 cursor-pointer hover:border-purple-600 flex-col  p-4">
              <Image
                src={course.banner.url}
                alt="courseImage"
                width={300}
                height={300}
              />
              <CardHeader>
                <CardTitle className="text-[20px]">{course.name}</CardTitle>
                <div className="flex gap-2">
                  <Book size={20} />
                  <Badge variant="outline">
                    {course.totalChapters} Chapters
                  </Badge>
                </div>
                <p>{course.free ? "Free" : "Paid"}</p>
              </CardHeader>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default CourseList;
