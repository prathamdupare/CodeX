"use client";
import { PauseIcon, Play } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const ChapterNav = ({ course, userCourse, setActiveChapter }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveChapter(course?.chapter ? [0] : null);
  }, []);
  return (
    <div>
      <div className="my-6">
        <h2 className="font-bold">{course.name}</h2>
      </div>

      <div className="flex flex-col gap-3">
        {course?.chapter?.map((chapter, index) => (
          <div key={index}>
            <div
              onClick={() => {
                setActiveIndex(index);
                setActiveChapter(chapter);
              }}
              className={` flex items-center gap-2 p-4 rounded cursor-pointer w-full items-start hover:bg-secondary ${
                activeIndex == index ? "bg-green-800" : null
              }`}
              variant="outline"
            >
              {activeIndex == index ? <PauseIcon /> : <Play className="h-5" />}

              <div>{chapter.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterNav;
