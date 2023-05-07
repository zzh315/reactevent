import EventsNavigation from "../components/EventsNavigation";
import { Outlet } from "react-router-dom";

function EventsLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventsLayout;
