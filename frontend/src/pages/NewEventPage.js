import EventForm from "../components/EventForm";

function NewEventPage() {
  return <EventForm method="POST" />;
}

export default NewEventPage;

// export async function action({ request, params }) {
//   const data = await request.formData();
//   // need to use <Form /> in the form component, and need to use .get below to get the data(the argument below are name atribute in the form inputs)
//   const eventData = {
//     title: data.get("title"),
//     image: data.get("image"),
//     date: data.get("date"),
//     description: data.get("description"),
//   };

//   const response = await fetch("http://localhost:8080/events", {
//     method: "POST",
//     body: JSON.stringify(eventData),
//     headers: { "Content-Type": "application/json" },
//   });

//   if (response.status === 422) {
//     return response;
//   } //return response in action allow response to be used in components, although async, react-router-dom auto await the data, so no need to await and automatcailly parsed

//   if (!response.ok) {
//     throw json({ message: "Could not save event" }, { status: 500 });
//   }

//   return redirect("/events");
// }
