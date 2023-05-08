import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation(); // returns an object which have a property that conatins the state of actions(posting,fetching,deleting)

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  const responseData = useActionData();
  // this is the error response

  return (
    <Form method={method} className={classes.form}>
      {responseData && responseData.errors && (
        <ul>
          {Object.values(responseData.errors).map((err) => {
            return <li key={err}>{err}</li>;
          })}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting.." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const eventId = params.eventId;
  const data = await request.formData();
  // need to use <Form /> in the form component, and need to use .get below to get the data(the argument below are name atribute in the form inputs)
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";
  if (method === "PATCH") {
    url = "http://localhost:8080/events/" + eventId;
  }

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(eventData),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 422) {
    return response;
  } //return response in action allow response to be used in components, although async, react-router-dom auto await the data, so no need to await and automatcailly parsed

  if (!response.ok) {
    throw json({ message: "Could not save event" }, { status: 500 });
  }

  return redirect("/events");
}
