# CoursePreview Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. Data Fetching and State Management](#3-data-fetching-and-state-management)
    * [3.1 `getCourse` Function](#31-getcourse-function)
* [4. Conditional Rendering](#4-conditional-rendering)
* [5. Props](#5-props)


## 1. Overview

The `CoursePreview` component displays a preview of a course, including a video player, course details, and an enrollment section.  It fetches course data based on the `courseId` passed as a parameter and the currently logged-in user's email address.


## 2. Component Structure

The `CoursePreview` component is composed of the following elements:

*   **Video Player:** Displays the video from the first chapter of the course (`VideoPlayer` component).
*   **Course Details:** Shows key information about the course (`CourseDetails` component).
*   **Enrollment Section:** Allows users to enroll in or manage their enrollment of the course (`EnrollmentSection` component).

These elements are arranged in a responsive layout using flexbox, adapting to different screen sizes.


## 3. Data Fetching and State Management

The component uses the following state variables:

| Variable Name        | Type             | Description                                                                  |
|-----------------------|-----------------|------------------------------------------------------------------------------|
| `coursedetail`       | Array            | Stores the fetched course details.                                          |
| `userCourse`         | Array            | Stores the user's enrollment information for the course (if any).          |


### 3.1 `getCourse` Function

This function is responsible for fetching course data using the `getCourseById` function from the `@/app/services` module.  It takes the `courseId` and the user's email address as input.

The `getCourseById` function (defined elsewhere) presumably makes a server request to retrieve the course information.  The response is then processed:

1.  `res.courseList` is assigned to the `coursedetail` state variable. This array likely contains the comprehensive course data.
2.  `res?.userEnrollSchemas[0]` is assigned to the `userCourse` state variable. This likely contains enrollment details specific to the user, and the `[0]` indicates selecting the first enrollment record if multiple exist, assuming a user can only have one enrollment record per course.  The optional chaining (`?.`) handles cases where `userEnrollSchemas` might be null or undefined.


The `useEffect` hook triggers the `getCourse` function when the `params.courseId` or the `user` changes.  If `params.courseId` is null or undefined, the function is not called.



## 4. Conditional Rendering

The component utilizes conditional rendering to handle cases where course data might not be immediately available:

*   The main `div` containing the course preview is only rendered if `coursedetail?.name` exists, ensuring that the component doesn't render until data is fetched.
*   The `VideoPlayer` component is rendered only if `coursedetail?.chapter[0]` and `coursedetail?.chapter[0].video.url` are available, ensuring no errors if the course lacks chapters or video URLs.


## 5. Props

The `CoursePreview` component accepts the following prop:

| Prop Name    | Type     | Description                                  |
|--------------|----------|---------------------------------------------|
| `params`     | Object   | An object containing the `courseId` parameter. |


The `params.courseId` is crucial for fetching the correct course data.
