// ─── IMPORTS

// allow links using the react router package via page switching
import { Link } from "react-router-dom";

import Button from "../components/Button";// the standard blue button
import Input from "../components/Input";// the standard text box
import FormField from "../components/FormField"; // wraps a box with a label + a spot for error message

// -- The Component: a function that return what to draw on a screen

// React calls this function whenever it needs to show the login page.
function LoginPage() {
  // Everything inside return () is the face of the page.
  return ( 
    // <main> = the main content area 
     <main className="page">
      {/* <section> = one block of content. Same class names as Krish's register
          page, so both pages share the same look. */}
      <section className="container auth-page">
        {/* The big title at the top. */}
        <h1>Welcome back</h1>

          {/* A small grey sentence under the title.
           */}
        <p style={{ marginBottom: "1.5rem", color: "#4b5563" }}>
          Log in to continue to CareerNet.
        </p>

        {/* <form> to group the inputs and the submit button together.
            noValidate = turn OFF the browser pop up checks,
            because we write our own error message */}
            <form noValidate> 
              {/* ── EMAIL FIELD ──
              Krish's formfield draws the label "Email" above the box.
              htmlFor="email" links the label to the box whose id is "email",
              so clicking the word email ---> the cursor in the box. */}
          <FormField label="Email" htmlFor="email">
          {/* Input (Krish's) = the actual text box.
                id           = its unique name tag (matches htmlFor above)
                name         = which piece of data this is 
                type="email" = phones show a keyboard with @
                placeholder  = the grey hint text shown while it's empty
               */}
               <Input 
               id="email"
               name="email"
               type = "email"
               placeholder="name55@example.com"
               autoComplete="email"
                />
          </FormField>

          {/* ── PASSWORD FIELD ──
              Same as email.
              type="password" =  typing is dots.
              autoComplete="current-password" ==> tells password managers
              */}

              <FormField label="Password" htmlFor="password">
                 <Input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
            />
              </FormField>

               {/* ── SUBMIT BUTTON ──
              The <div> adds space above the button.
              type="submit" = clicking it sends the form.
              For now it has no brain attached, so DON'T click it yet (Stage D). */}
          <div style={{ marginTop: "1.5rem" }}>
            <Button type="submit">Log in</Button>
          </div>

          {/* ── LINK TO REGISTER ── for people who don't have an account yet. */}
          <p
            style={{
              marginTop: "1rem",
              textAlign: "center",
              fontSize: "0.9rem",
              color: "#4b5563",
            }}
          >
            Don't have an account?{" "}
        {/* to="/register" = which page to switch to when clicked. */}
            <Link to="/register" style={{ color: "#2563eb", fontWeight: 600 }}>
              Create one
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}




// ─── EXPORT so other files can import it ───
// App.tsx imports LoginPage and shows it at the /login address.
export default LoginPage;