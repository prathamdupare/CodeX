# ViewCouse Component Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. Props](#3-props)
* [4. State Variables](#4-state-variables)
* [5. `getCourse` Function](#5-getcourse-function)
* [6. Usage](#6-usage)


## 1. Overview

The `ViewCouse` component displays course content, including a video player and a chapter navigation menu.  It fetches course data based on the user and course ID passed as parameters.  The UI is responsive, adapting to different screen sizes using Tailwind CSS classes.


## 2. Component Structure

The `ViewCouse` component utilizes a flexbox layout to arrange the video player and chapter navigation side-by-side on larger screens and vertically on smaller screens.

| Element             | Description                                         | Tailwind CSS Classes                                    |
|----------------------|-----------------------------------------------------|---------------------------------------------------------|
| `FullVideoPlayer`   | Displays the active course video.                    | `lg:w-[75%] px-4 mt-2 flex flex-col items-center justify-center` |
| `ChapterNav`        | Displays a list of course chapters for navigation. | `m-2 lg:w-[25%] md:col-span-1 px-4 h-full mx-2 border p-2 shadow-sm rounded` |


## 3. Props

The `ViewCouse` component receives a single prop:

| Prop Name  | Type     | Description                                      |
|-------------|----------|--------------------------------------------------|
| `params`   | Object   | Contains the `courseId` parameter from the URL. |


## 4. State Variables

The component manages the following state variables:

| Variable Name     | Type             | Description                                                                  |
|--------------------|-----------------|------------------------------------------------------------------------------|
| `course`          | Array            | Stores the fetched course data.  Populated by the `getCourse` function.       |
| `userCourse`      | Array            | Stores the user's enrollment status for the course. Populated by `getCourse`. |
| `activeChapter`   | Object \| null   | Stores the currently selected chapter. Passed to `FullVideoPlayer`.          |


## 5. `getCourse` Function

The `getCourse` function is an asynchronous function responsible for fetching course data from the backend using the `getCourseById` service.  It uses the `courseId` from the URL parameters and the user's email address to identify the correct course.

The function performs the following steps:

1. **Fetches data:** Calls `getCourseById(params?.courseId, user.primaryEmailAddress.emailAddress)` to retrieve course information from the backend.
2. **Updates state:**  Uses `.then()` to handle the response.  It updates the `course` state variable with `res.courseList` and `userCourse` with `res.userEnrollSchemas`.  The `console.log` statement is for debugging purposes.


## 6. Usage

The `ViewCouse` component is used to display individual courses. It requires a `courseId` parameter in the URL to identify the course to be displayed.  The component dynamically renders the video player and chapter navigation based on the fetched data.  The `useUser` hook from `@clerk/nextjs` is used for user authentication, and data is only fetched if a user is logged in.
