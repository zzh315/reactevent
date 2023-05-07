import {
  useParams,
  useLoaderData,
  json,
  useRouteLoaderData,
} from "react-router-dom";
import { Link } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  // const params = useParams();
  // console.log(params);
  // const data = useLoaderData();

  const data = useRouteLoaderData("event-detail");
  // this can access loader data in parent routes.

  // when using useLoaderData on Response#construtctor# object, it automatically returns data(first argument) in the Response object.
  // const event = data.event;

  // const event = events.find((event) => {
  //   return event.id === params.eventId;
  // }); // no need as loader below specific.

  return <EventItem event={data.event} />;
}

export default EventDetailPage;

export async function loader({ request, params }) {
  // {request, params} are passed in when loader is called in App.js in createBrowserRouter by each pages using loader=
  const id = params.eventId;
  // return fetch("http://localhost:8080/events" + id);
  // becasue react router automatically resolve the promise returned
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    return response;
  }
}
