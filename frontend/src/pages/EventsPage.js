import EventsList from "../components/EventsList";
import { json, useLoaderData } from "react-router-dom";

function EventsPage() {
  const data = useLoaderData();
  // when using useLoaderData on Response#construtctor# object, it automatically returns data(first argument) in the Response object.
  const events = data.events;
  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");
  // fetch returns a Response object

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch events" },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
