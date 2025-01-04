# CodeX Navbar Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. Responsiveness and Rendering Logic](#3-responsiveness-and-rendering-logic)
* [4. Navigation Menu](#4-navigation-menu)
* [5. Authentication Handling](#5-authentication-handling)
* [6. Route List](#6-route-list)
* [7. Styling and Theming](#7-styling-and-theming)


## 1. Overview

The `TestNavbar` component renders a responsive navigation bar for the CodeX application. It adapts its layout based on screen size, providing a concise mobile experience and a more detailed desktop experience.  The navbar includes navigation links, authentication controls (Sign In/User profile), and a theme toggle.


## 2. Component Structure

The `TestNavbar` component uses a combination of React components:

* **`NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`:**  These components (presumably from a custom UI library) structure the navigation elements.
* **`Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetTrigger`:** These components (also from a custom UI library) implement a mobile-friendly sheet menu for navigation and authentication.
* **`Button`, `buttonVariants`:** Custom button components for styling and variations.
* **`ModeToggle`:** A custom component for toggling the application's theme (light/dark).
* **`SignInButton`, `SignedIn`, `SignedOut`, `UserButton`:** Components from the Clerk.js authentication library, handling user authentication and display.
* **`MenuIcon`:** An icon component (presumably from `lucide-react`).


## 3. Responsiveness and Rendering Logic

The navbar's responsiveness is achieved through conditional rendering based on screen size (using CSS media queries and the `md:hidden` and `hidden md:flex` classes).

* **Mobile View (screen size below `md` breakpoint):** A `Sheet` component is used to display a menu upon clicking a "Menu" button.  This menu contains navigation links, authentication controls, and the theme toggle. The `onOpenChange` prop updates the `isOpen` state to control the sheet's visibility.  The `onClick` handler in the `SheetTrigger` also updates the `isOpen` state.

* **Desktop View (screen size at or above `md` breakpoint):** Navigation links, authentication controls, and the theme toggle are directly displayed in the navbar, without needing a sheet.


## 4. Navigation Menu

The navigation menu is defined by the `routeList` array.  Each object in the array represents a navigation item with an `href` (link) and a `label` (text to display).  The `routeList` is mapped to create navigation links both in the mobile and desktop views.


## 5. Authentication Handling

Authentication is handled using the Clerk.js library's components:

* **`SignedIn`:**  Conditionally renders a `UserButton` when a user is signed in, providing access to their profile.
* **`SignedOut`:** Conditionally renders a `SignInButton` when a user is signed out, allowing them to log in.


## 6. Route List

The `routeList` constant defines the navigation links:

| href                  | label                |
|-----------------------|-----------------------|
| `/`                   | Dashboard             |
| `https://codex.fosspage.com/` | Homepage              |
| `/courses`            | Explore all courses   |
| `/blog`               | Blog                  |


## 7. Styling and Theming

Styling is managed using Tailwind CSS classes and custom `buttonVariants` which presumably handles different button styles.  The navbar has a `sticky` position, ensuring it remains visible while scrolling. The `dark` mode styling uses Tailwind CSS's dark mode support (`dark:border-b-slate-700 dark:bg-background`).  The `buttonVariants` function likely provides styling variations for buttons used in the navigation. The Github link opens in a new tab (`target="_blank"`).
