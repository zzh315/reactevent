import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";

function EventsPage() {
  const { events } = useLoaderData();
  // when using useLoaderData on Response#construtctor# object, it automatically returns data(first argument) in the Response object.
  // const events = data.events;
  console.log(events);
  //when using defer(), this data have a promise under the event object
  //pass a function between Await to be excuted once the promise in resolve={} is resolved
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
      <Await resolve={events}>
        {(resolvedResponse) => {
          return <EventsList events={resolvedResponse.events} />;
        }}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
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
    const resData = await response.json();

    return resData;
  }
}

export function loader() {
  return defer({ events: loadEvents() }); //loadEvents() returns a promise to the event key
}
