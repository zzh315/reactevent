import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Event Detail Page</h1>
      <p>{params.eventId}</p>
      <Link to=".." relative="path">
        Back
      </Link>
    </>
  );
}

export default EventDetailPage;
