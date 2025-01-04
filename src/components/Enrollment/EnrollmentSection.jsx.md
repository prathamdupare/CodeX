# EnrollmentSection Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component Props](#2-component-props)
* [3. Functions](#3-functions)
    * [3.1 `handleEnrollCourse`](#31-handleenrollcourse)
    * [3.2 `EnrollCourse`](#32-enrollcourse)
* [4. Usage](#4-usage)


## 1. Overview

The `EnrollmentSection` component renders a card displaying enrollment options for a course.  It dynamically shows a "Continue" button if the user is already enrolled, or an "Enroll Now" button (potentially linked to a Stripe checkout) if not. The component leverages Clerk.js for user authentication and Next.js's `useRouter` hook for navigation.


## 2. Component Props

| Prop Name      | Type             | Description                                                                 | Required |
|-----------------|-------------------|-----------------------------------------------------------------------------|----------|
| `coursedetail` | Object           | Contains details about the course, including `id` and `free` properties.     | Yes      |
| `userCourse`   | Object           | Contains information about the user's enrollment, including `courseId`. | No       |


## 3. Functions

### 3.1 `handleEnrollCourse`

```javascript
const handleEnrollCourse = async () => {
  router.push(`/view-course/${coursedetail.id}`);
};
```

This function redirects the user to the course view page (`/view-course/:courseId`). It's used when a user clicks "Continue" after already enrolling in a course.  It directly navigates without any backend calls.

### 3.2 `EnrollCourse`

```javascript
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
```

This function handles course enrollment.  The algorithm is as follows:

1. **Authentication Check:** It first checks if a user is logged in using `if (user)`.
2. **Enrollment API Call:** If the user is logged in, it calls the `enrollCourse` service function with the course ID and the user's email address.  This presumably makes a backend request to record the enrollment.
3. **Publish Course Enrollment:**  Upon successful enrollment (`if (res)`), it calls the `publishCourse` function with the ID obtained from the enrollment response (`res?.createUserEnrollSchema?.id`). The purpose of this function is unclear from the code but it seems to be related to publishing or updating the course enrollment status.
4. **Navigation:** After successful enrollment and publishing, the user is redirected to the course view page.
5. **Unauthenticated Handling:** If the user is not logged in, it redirects to the sign-in page.

The function uses nested `.then()` calls for handling asynchronous operations.  A more modern approach might involve using `async/await` throughout the function for better readability and error handling.


## 4. Usage

The `EnrollmentSection` component is designed to be used within a course listing or details page.  It receives the `coursedetail` object (containing course data) and optionally the `userCourse` object (indicating if the user is enrolled).  The component dynamically renders either an "Enroll Now" or "Continue" button based on the user's enrollment status and whether the course is free or paid.  For paid courses, a Stripe checkout link is used.
