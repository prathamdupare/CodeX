# Home Page Component Documentation

[TOC]

## 1. Overview

This document details the implementation of the `Home` component, the main landing page for the CodeX application.  The component renders different content based on the user's authentication status, leveraging Clerk.js for authentication handling.

## 2. Component Structure

The `Home` component is a functional component exported as the default export.  Its primary function is to conditionally render content depending on whether a user is signed in or not.

```javascript
export default async function Home() {
  return (
    <>
      <div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <SignedOut>
            {/* Signed out users get sign in button */}
            <p>Welcome to CodeX.</p>
            <p className="font-bold">
              Please sign in to view your enrolled courses..
            </p>
            <button className="p-2 bg-primary text-white dark:text-black rounded">
              <SignInButton />
            </button>
          </SignedOut>
        </div>
        <Dashboard />
      </div>
    </>
  );
}
```

## 3. Component Logic

The core logic resides within the conditional rendering using the `<SignedOut>` component provided by Clerk.js.

| Component        | Description                                                                    |
|-----------------|--------------------------------------------------------------------------------|
| `SignedOut`     | Renders its children only if the user is not authenticated.                     |
| `SignInButton` | A pre-built button component from Clerk.js that handles the sign-in process. |
| `Dashboard`     | A custom component (defined elsewhere) displaying the dashboard for signed-in users.|


**Conditional Rendering:**

The component first checks the user's authentication status implicitly through the `<SignedOut>` component.

* **If the user is signed out:** The content within the `<SignedOut>` tags is rendered. This includes a welcome message, a prompt to sign in to view courses, and a `SignInButton` for initiating the sign-in flow.  The styling is handled by Tailwind CSS classes.

* **If the user is signed in:** The `<SignedOut>` component renders nothing.  The `Dashboard` component, which contains user-specific data and functionality, is rendered instead.  This ensures that only authenticated users have access to their dashboards.


## 4. Imports

The component utilizes several imports:

| Import Statement                     | Description                                    | Module                               |
|--------------------------------------|------------------------------------------------|---------------------------------------|
| `import Dashboard from "@/components/dashboard";` | Imports the `Dashboard` component.           | Local component                         |
| `import { Button } from "@/components/ui/button";` | Imports the `Button` component.             | Local UI component library             |
| `import { SignInButton, SignedOut } from "@clerk/nextjs";` | Imports authentication components from Clerk.js | Third-party authentication library |
| `import Link from "next/link";`       | Imports the `Link` component for internal navigation. | Next.js routing                         |


## 5. Algorithm Description

The component doesn't employ any complex algorithms.  Its functionality relies primarily on the conditional rendering capabilities of React and the authentication features provided by the Clerk.js library. The algorithm can be summarized as:

1. **Check Authentication Status:**  The `<SignedOut>` component implicitly handles checking the user's authentication status.

2. **Conditional Rendering:** Based on step 1, render either the sign-in message and button or the user dashboard.


## 6. Styling

The component leverages Tailwind CSS for styling, using classes such as `flex`, `flex-col`, `gap-4`, `items-center`, `justify-center`, `font-bold`, `p-2`, `bg-primary`, `text-white`, and `dark:text-black` to control layout and appearance.  These classes provide responsive and customizable styling.
