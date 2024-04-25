import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { enrollCourse, publishCourse } from "@/app/services";
import axios from "axios";

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
        console.log("Enroll response : ", res);
        if (res) {
          await publishCourse(res?.createUserEnrollSchema?.id).then(
            (result) => {
              console.log(result);
              if (result) {
                router.push(`/view-course/${coursedetail.id}`);
              }
            },
          );
        }
      });
    } else {
      router.push("/sign-in");
      console.log("Please login to enroll");
    }
  };

  const handleEnrollCourse = async () => {
    try {
      // Create checkout session on your server
      // Add any other relevant data for your session

      // Redirect user to checkout page
      router.push(response.data.sessionUrl);
    } catch (error) {
      console.error("Error creating checkout session:", error);
      // Handle error appropriately
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
              <Button onClick={handleEnrollCourse} className="w-full">
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
