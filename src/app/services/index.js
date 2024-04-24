"use server";
import { request, gql } from "graphql-request";

const MASTER_URL = process.env.HYGRAPH_URL;

export const getCourseList = async () => {
  const query = gql`
    query CourseList {
      courseLists {
        banner {
          url
        }
        name
        free
        id
        totalChapters
        tag
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching course list:", error);
    throw error; // Rethrow the error for handling further up the call stack if needed
  }
};

export const getCourseById = async (id, userEmail) => {
  const query = gql`
    query course {
      courseList(where: { id:"${id}" }) {
        chapter {
          ... on Chapter {
            id
            name
            video {
              url
            }
            youtubeUrl
          }
        }
        description
        name
        id
        free
        totalChapters
      }

    userEnrollSchemas(where: {courseId: "${id}", 
    userEmail: "${userEmail}"}) {
    courseId
    userEmail
    completedChapter
  }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching course properties:", error);
    throw error; // Rethrow the error for handling further up the call stack if needed
  }
};

export const enrollCourse = async (courseId, userEmail) => {
  const mutationQuery = gql`
    mutation EnrollCourse {
      createUserEnrollSchema(data: { userEmail: "${userEmail}", courseId: "${courseId}" }) {
        id
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching course properties:", error);
    throw error; // Rethrow the error for handling further up the call stack if needed
  }
};

export const publishCourse = async (id) => {
  const mutationQuery = gql`
    mutation EnrollCourse {
      publishUserEnrollSchema(where: { id: "${id}" }) 
      {
        id
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching course properties:", error);
    throw error; // Rethrow the error for handling further up the call stack if needed
  }
};

export const GetUserCourseList = async (userEmail) => {
  const query = gql`
    query UserCourseList {
      userEnrollSchemas(where: { userEmail: "${userEmail}" }) {
        courseList {
          banner {
            url
          }
          description
          id
          name
          free
          sourceCode
          tag
          totalChapters
        }
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching course list:", error);
    throw error; // Rethrow the error for handling further up the call stack if needed
  }
};
