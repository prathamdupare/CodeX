# Internal Code Documentation: Stripe Webhook Handler

## Table of Contents

1. [Introduction](#introduction)
2. [Function: POST](#function-post)
    * [Webhook Event Handling](#webhook-event-handling)
    * [Enrollment and Course Publication](#enrollment-and-course-publication)
3. [Error Handling](#error-handling)


## Introduction

This document details the functionality of the Stripe webhook handler implemented in this Next.js API route.  The handler receives and processes webhook events from Stripe, specifically focusing on successful payments. Upon successful payment verification, it enrolls the user in a course and publishes the course.


## Function: POST

This API route handles POST requests from Stripe webhooks.

### Webhook Event Handling

The `POST` function is the primary entry point for incoming Stripe webhook events.  It performs the following steps:

1. **Receives and Parses Payload:**  It retrieves the webhook payload from the request body (`req.text()`) and parses it as JSON.

2. **Retrieves Signature:** It extracts the `Stripe-Signature` header from the request to verify the authenticity of the webhook event.

3. **Constructs Event:** Uses the Stripe library (`stripe.webhooks.constructEvent()`) to verify the signature using the `STRIPE_WEBHOOK_SECRET` environment variable. This ensures that the webhook event originates from Stripe and hasn't been tampered with. The function takes three arguments:
    * `payload`: The raw webhook payload.
    * `sig`: The signature from the request header.
    * `process.env.STRIPE_WEBHOOK_SECRET`: The secret key for signature verification.

4. **Logs Event Type:** Logs the type of event received (e.g., `charge.succeeded`, `payment_intent.succeeded`, `payment_intent.created`).

5. **Retrieves User Email:** Extracts the user's email from the webhook payload (`res?.data?.object?.billing_details?.email`).  This is used for course enrollment.

6. **Indicates Payment Success:** Logs a message indicating successful payment.


### Enrollment and Course Publication

The commented-out code block within the `try` statement demonstrates the logic for enrolling the user in a course and subsequently publishing the course. This process involves two asynchronous functions:

* **`enrollCourse(courseId, email)`:** This function (located in `@/app/services`) enrolls a user with the provided email in a course identified by `courseId`. It returns a promise resolving to an object containing enrollment details, notably the `createUserEnrollSchema?.id`.

* **`publishCourse(enrollmentId)`:** This function (located in `@/app/services`) publishes the course using the `enrollmentId` received from `enrollCourse`. This presumably updates the course's status to make it accessible to the enrolled user.

The commented-out code shows a nested promise structure.  If `enrollCourse` succeeds, `publishCourse` is called using the enrollment ID from the response.  Both functions handle potential errors internally.  The current implementation lacks error handling within this section of the POST request function.

| Function          | Description                                                                     | Input Parameters      | Output                                  |
|-------------------|---------------------------------------------------------------------------------|-----------------------|------------------------------------------|
| `enrollCourse`    | Enrolls user in a course.                                                     | `courseId`, `email`  | Object with enrollment details, including `createUserEnrollSchema?.id`. |
| `publishCourse`   | Publishes the course.                                                          | `enrollmentId`       | Result of publication operation          |



## Error Handling

The `try...catch` block handles potential errors during webhook event construction and processing. If an error occurs, a JSON response with a `"Failed"` status and the error details is returned.  The commented-out course enrollment and publishing section also includes a `catch` block for handling errors within those asynchronous operations; however, the error handling is currently only logged to the console.  Consider adding more robust error handling and logging in production environments.


