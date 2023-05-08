import { useEffect } from "react";
import classes from "./NewsletterSignup.module.css";
import { Form, useFetcher } from "react-router-dom";
function NewsletterSignup() {
  const fetcher = useFetcher();
  //fetcher.Form will trigger an action but does not initiate route transition aka.not jump to the route that contains the form(or the route that the form's action is submitting to )
  const { data, state } = fetcher;

  // console.log(data); data is whatever the action function returns

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        required
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
