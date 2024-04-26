import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { enrollCourse, publishCourse } from "@/app/services";

const EnrollmentSection = ({ coursedetail, userCourse }) => {
  console.log(coursedetail);
  const { user } = useUser();
  const router = useRouter();

  const handleEnrollCourse = async () => {
    router.push(`/view-course/${coursedetail.id}`);
  };
  const EnrollCourse = async () => {
    if (user) {
      await enrollCourse(
        coursedetail.id,
        user.primaryEmailAddress.emailAddress,
      ).then(async (res) => {
        console.log("Enroll response : ", res);
        if (res) {
          await publishCourse(res?.createUserEnrollSchema?.id).then(
            (result) => {
              console.log(result);
            },
          );

          router.push(`/view-course/${coursedetail.id}`);
        }
      });
    } else {
      router.push("/sign-in");
      console.log("Please login to enroll");
    }
  };
  return (
    <div>
      <Card className="flex border-2 cursor-pointer hover:border-purple-600 flex-col  p-4">
        <CardHeader>
          <CardTitle className="text-[20px]">
            Learn and Build Projects, Access Source Code, and more..
          </CardTitle>
        </CardHeader>

        <CardFooter className="flex flex-col gap-2">
          {userCourse?.courseId ? (
            <div className="w-full">
              <Button
                onClick={() => {
                  router.push(`/view-course/${coursedetail.id}`);
                }}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          ) : (
            <div className="w-full">
              {coursedetail.free ? (
                <Button onClick={EnrollCourse} className="w-full">
                  Enroll Now
                </Button>
              ) : (
                <Button onClick={EnrollCourse} className="w-full">
                  Buy all courses for $5.99/month
                </Button>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EnrollmentSection;
