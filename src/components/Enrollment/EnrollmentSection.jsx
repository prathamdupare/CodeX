import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

const EnrollmentSection = ({ coursedetail }) => {
  const enrollCourse = () => {


    await enrollCourse(coursedetail.id);
  };
  return (
    <div>
      <Card className="flex border-2 cursor-pointer hover:border-purple-600 flex-col  p-4">
        <CardHeader>
          <CardTitle className="text-[20px]">
            Learn and Build Projects, Access Source Code, and more..
          </CardTitle>
        </CardHeader>
        <CardFooter>
          {coursedetail.free ? (
            <div className="w-full">
              <Button onClick={() => enrollCourse()} className="w-full">
                Enroll Now
              </Button>
            </div>
          ) : (
            <div className="w-full">
              <Button className="w-full">Buy free for $5.99</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EnrollmentSection;
