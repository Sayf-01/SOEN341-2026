# CareerNet Frontend

This is the frontend for **CareerNet**, built with **React and TypeScript**.
The project uses **Vite** for development and **Axios** to communicate with the backend API.

## Getting Started

### Prerequisites

Before running the project, make sure you have:

* Node.js **v18 or newer**
* npm
* Git

### 1. Clone the Repository

Clone the project and move into the frontend folder:

```bash
git clone <repo-url>
cd careernet-frontend
```

### 2. Install Dependencies

Install all the required packages:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project, in the same location as `package.json`.

Add the following:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Make sure the backend is running on the same port, or change the URL to match your backend.

### 4. Run the Frontend

Start the Vite development server:

```bash
npm run dev
```

After the server starts, open:

```text
http://localhost:5173
```

in your browser.

### 5. Build the Project

Before pushing your changes or creating a pull request, run the build command:

```bash
npm run build
```

This helps catch TypeScript errors and other build-related issues before the changes are pushed.

---

## Project Structure

The main frontend code is inside the `src/` folder.

```text
src/
├── components/    # Reusable UI components
├── pages/         # Pages connected to application routes
├── services/      # API calls and Axios configuration
├── types/         # Shared TypeScript types and interfaces
└── styles/        # Global CSS and layout styles
```

### Components

The `components/` folder contains reusable UI elements that should be used throughout the application.

Some of the main components are:

* `Button` - Main button component
* `Input` - Reusable input field
* `FormField` - Input wrapper with a label and error message
* `Alert` - Displays success or error messages
* `Loader` - Loading spinner for asynchronous actions

### Pages

The `pages/` folder contains the main application pages.

For example:

* `RegisterPage`
* `LoginPage`

### Services

The `services/` folder contains code used to communicate with the backend.

For example:

* `authService.ts` - Handles authentication-related API requests

### Types

The `types/` folder contains shared TypeScript interfaces and types.

For example:

* `auth.ts` - Authentication-related types

---

## Using Shared Components

To keep the UI consistent across the application, use the reusable components in `src/components/` instead of creating the same UI elements from scratch.

### FormField

`FormField` can be used to wrap an input and display its label and validation error.

```tsx
<FormField
  error={errors.email}
  htmlFor="email"
  label="Email"
>
  <Input
    id="email"
    name="email"
    onChange={handleChange}
    type="email"
    value={email}
  />
</FormField>
```

### Input

`Input` is the standard input component used throughout the application.

It supports regular HTML input properties such as:

* `type`
* `value`
* `placeholder`
* `onChange`
* `name`
* `id`

Example:

```tsx
<Input
  id="email"
  name="email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={handleChange}
/>
```

### Button

Use the shared `Button` component for actions such as submitting forms.

```tsx
<Button disabled={isLoading} type="submit">
  Create Account
</Button>
```

### Alert

`Alert` is used to show success or error messages to the user.

For an error:

```tsx
<Alert message={errors.general} type="error" />
```

For a success message:

```tsx
<Alert
  message="Registration successful!"
  type="success"
/>
```

### Loader

`Loader` is an inline loading spinner that can be used while an API request or other asynchronous operation is running.

For example, it can be displayed inside a button or form while the request is processing.

---

## Development Workflow

When working on the frontend, try to follow this workflow:

1. Pull the latest changes from the shared branch.
2. Make your changes.
3. Test the changes locally.
4. Run the build command:

```bash
npm run build
```

5. Stage your changes:

```bash
git add .
```

6. Commit your changes with a clear commit message:

```bash
git commit -m "update README"
```

7. Push your changes:

```bash
git push
```

Before pushing, make sure your changes do not break existing functionality.

---

## Notes for Contributors

* Reuse existing components whenever possible.
* Keep components small and easy to understand.
* Follow the existing project structure.
* Use TypeScript types instead of using `any` when possible.
* Test your changes before pushing.
* Run `npm run build` before opening a pull request.
* Use clear commit messages so it is easy to understand what changed.


