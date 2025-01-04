# Navbar Component Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. Usage](#3-usage)
* [4. Props](#4-props)
* [5. Styling](#5-styling)
* [6. Authentication Integration](#6-authentication-integration)


## 1. Overview

The `Navbar` component renders a fixed navigation bar at the top of the application. It includes branding, navigation links, a theme toggle, and authentication controls.  The navbar is designed to be responsive and adapts to different screen sizes.


## 2. Component Structure

The `Navbar` component utilizes a combination of Next.js features and the Clerk.js authentication library.  Its structure is designed for clarity and maintainability.  The component consists of two main sections:

* **Left Section (Branding):** Displays the application's logo with a link to the Codex website.  The logo utilizes inline styling for color and font weight.

* **Right Section (Navigation and Authentication):** Contains navigation links to the Dashboard, Courses, and Blog sections.  This section also incorporates a theme toggle (`ModeToggle` component) and authentication components from Clerk.js:

    * `SignedIn`:  Conditionally renders the `UserButton` component when a user is logged in.
    * `SignedOut`: Conditionally renders the `SignInButton` component when a user is logged out.

The entire navbar is wrapped in a `div` with styling for positioning, shadow, and spacing.


## 3. Usage

The `Navbar` component is a functional component and can be imported and used directly in any other component:

```javascript
import Navbar from './Navbar';

function MyComponent() {
  return (
    <>
      <Navbar />
      {/* Rest of your component */}
    </>
  );
}
```

## 4. Props

The `Navbar` component does not accept any props.


## 5. Styling

The `Navbar` component uses Tailwind CSS for styling.  The styling is inline within the JSX for brevity and to maintain a clear relationship between the structure and the visual representation.  Key styling elements include:

| Style Property     | Value                               | Description                                      |
|----------------------|---------------------------------------|--------------------------------------------------|
| `w-full`            |                                       | Takes full width of its container                 |
| `fixed`             |                                       | Positions the navbar fixed to the viewport       |
| `shadow`            |                                       | Adds a box-shadow for visual depth               |
| `bg-background`     | Tailwind CSS background color class     | Sets the background color                        |
| `border-b`          |                                       | Adds a border at the bottom                       |
| `flex`, `items-center`, `justify-between` | Tailwind CSS flexbox utilities | Controls the layout and alignment of elements    |
| `px-3`, `py-2`       | Tailwind CSS padding utilities        | Sets padding for horizontal and vertical spacing |
| `text-[25px]`       |                                       | Sets the font size for the logo                  |
| `text-primary`      | Tailwind CSS text color class          | Sets the text color for the logo                 |
| `font-bold`         |                                       | Sets the font weight                             |
| `text-green-400`    | Tailwind CSS text color class          | Sets the text color for "X" in the logo         |
| `gap-4`             |                                       | Sets spacing between elements in the right section |


## 6. Authentication Integration

The `Navbar` component seamlessly integrates with the Clerk.js authentication system.  The `SignedIn` and `SignedOut` components, provided by Clerk.js, conditionally render the appropriate authentication UI elements based on the user's authentication status.  No explicit authentication logic is handled within the `Navbar` itself; it relies on the Clerk.js library to manage the authentication state.  This keeps the `Navbar` focused on presentation and enhances maintainability.
