import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { enrollCourse, publishCourse } from "@/app/services";

const EnrollmentSection = ({ coursedetail, userCourse }) => {
  console.log(userCourse, coursedetail);
  const { user } = useUser();
  const router = useRouter();
  const EnrollCourse = async () => {
    if (user) {
      await enrollCourse(
        coursedetail.id,
        user.primaryEmailAddress.emailAddress,
      ).then(async (res) => {
        if (res) {
          await publishCourse(res?.createUserEnrollSchema?.id).then(
            (result) => {
              if (result) {
                router.push(`/view-course/${coursedetail.id}`);
              }
            },
          );
        }
      });
    } else {
      router.push("/sign-in");
    }
  };
  return (
    <div>
      <Card className="flex border-2 cursor-pointer  flex-col  p-4">
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
          ) : null}

          {coursedetail.free && !userCourse?.courseId ? (
            <div className="w-full">
              <Button onClick={() => EnrollCourse()} className="w-full">
                Enroll Now
              </Button>
            </div>
          ) : !userCourse?.courseId ? (
            <div className="w-full">
              <Button onClick={() => EnrollCourse()} className="w-full">
                Buy all courses for $5.99/month
              </Button>
            </div>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EnrollmentSection;
