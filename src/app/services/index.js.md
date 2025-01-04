# Internal Code Documentation: Hygraph Course API

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Introduction](#1-introduction)
* [2. Modules](#2-modules)
    * [2.1 `getCourseList`](#21-getcourselist)
    * [2.2 `getUserCoursesIds`](#22-getusercoursesids)
    * [2.3 `getCourseById`](#23-getcoursebyid)
    * [2.4 `enrollCourse`](#24-enrollcourse)
    * [2.5 `publishCourse`](#25-publishcourse)
    * [2.6 `GetUserCourseList`](#26-getusercourselist)
* [3. Error Handling](#3-error-handling)


## 1. Introduction

This document details the functionality of the Hygraph Course API, outlining each exported function and its underlying logic.  The API utilizes GraphQL requests to interact with a Hygraph CMS instance. The `MASTER_URL` environment variable specifies the Hygraph endpoint.


## 2. Modules

This section describes each exported function within the API.

### 2.1 `getCourseList`

This function retrieves a list of all courses from the Hygraph CMS.

| Field          | Description                                  | Data Type |
|-----------------|----------------------------------------------|------------|
| `banner.url`   | URL of the course banner image.             | String     |
| `name`          | Name of the course.                          | String     |
| `free`          | Boolean indicating if the course is free.    | Boolean    |
| `id`            | Unique identifier of the course.              | String     |
| `totalChapters` | Total number of chapters in the course.      | Integer    |
| `tag`           | Tag associated with the course.              | String     |


**Algorithm:**

1.  A GraphQL query is constructed to fetch the `courseLists` data.
2.  The `request` function from `graphql-request` sends the query to the Hygraph endpoint specified by `MASTER_URL`.
3.  The function returns the result of the query.  Error handling is implemented using a `try...catch` block, logging errors to the console and rethrowing them for higher-level handling.


### 2.2 `getUserCoursesIds`

This function retrieves a list of course IDs for a given user email.

| Field       | Description                      | Data Type |
|-------------|----------------------------------|------------|
| `courseId`  | ID of the course the user enrolled in | String     |


**Algorithm:**

1.  A GraphQL query is constructed to fetch the `userEnrollSchemas` data, filtering by the provided `userEmail`.
2.  The `request` function sends the query to the Hygraph endpoint.
3.  The function returns the result containing an array of `courseId` values. Error handling is similar to `getCourseList`.


### 2.3 `getCourseById`

This function retrieves detailed information for a specific course, including chapter details and enrollment status for a given user.

**Returned Data:**

The function returns a GraphQL response object containing:

* **`courseList`:** An array of course information including:
    * `chapter`: An array of chapter objects, each containing `id`, `name`, `video.url`, and `youtubeUrl`.
    * `description`, `banner.url`, `name`, `id`, `free`, and `totalChapters`.
* **`userEnrollSchemas`:** An array of enrollment information, including `courseId`, `userEmail`, and `completedChapter`, specific to the given user and course.



**Algorithm:**

1. A GraphQL query is constructed to fetch both `courseList` (filtered by `id`) and `userEnrollSchemas` (filtered by `courseId` and `userEmail`).  This utilizes GraphQL fragments (`... on Chapter`) for efficient data retrieval.
2. The `request` function sends the query to the Hygraph endpoint.
3. The function returns the complete result.  Error handling is implemented as in previous functions.


### 2.4 `enrollCourse`

This function enrolls a user in a specified course.

**Algorithm:**

1. A GraphQL mutation is constructed to create a new `userEnrollSchema` entry with the provided `userEmail` and `courseId`.
2. The `request` function sends the mutation to the Hygraph endpoint.
3. The function returns the result of the mutation, which includes the ID of the newly created enrollment record. Error handling is consistent with other functions.


### 2.5 `publishCourse`

This function publishes a user enrollment schema.  Note that the function name is misleading; it doesn't publish a *course*, but rather an *enrollment*.

**Algorithm:**

1.  A GraphQL mutation is constructed to update an existing `userEnrollSchema` with `id` to publish it.
2.  The `request` function sends the mutation to the Hygraph endpoint.
3.  The function returns the result of the mutation. Error handling is consistent with other functions.


### 2.6 `GetUserCourseList`

This function retrieves a list of courses for a given user, including detailed course information.

**Returned Data:**  Similar to `getCourseList`, but includes more detailed course information for each enrolled course.

**Algorithm:**

1. A GraphQL query is constructed to fetch `userEnrollSchemas` filtered by `userEmail`.  The query also includes nested fields to retrieve detailed course information for each enrollment.
2. The `request` function sends the query to the Hygraph endpoint.
3. The function returns the result, containing an array of courses and their details for the specified user. Error handling is the same as in previous functions.


## 3. Error Handling

All functions utilize a `try...catch` block to handle potential errors during the GraphQL request. Errors are logged to the console using `console.error`, and the original error is re-thrown to allow for higher-level error handling if necessary.
