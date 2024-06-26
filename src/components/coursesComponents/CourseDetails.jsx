import { Book } from "lucide-react";
import { Badge } from "../ui/badge";

const CourseDetails = ({ coursedetail }) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <h2 className="text-[20px] p-2 font-bold md:text-[35px]">
        {coursedetail.name}
      </h2>

      <div className="flex gap-2 items-center">
        <Book size={20} />
        <Badge className="text-[15px]" variant="outline">
          {coursedetail.totalChapters} Chapters
        </Badge>
      </div>
      <p className="line-clamp-2 lg:line-clamp-4 mt-5">
        {coursedetail.description} Chapters
      </p>
    </div>
  );
};

export default CourseDetails;
