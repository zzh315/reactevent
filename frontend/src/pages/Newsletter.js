import NewsletterSignup from "../components/NewsletterSignup";
import PageContent from "../components/PageContent";

function NewsletterPage() {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsletterPage;

export async function action({ request }) {
  // the post action  will trigger this action on the route definition, passing object that contains request object, which contains below.
  const data = await request.formData(); //this will be automatically passed by the Form component
  const email = data.get("email");

  // send to backend newsletter server ...
  console.log(email);
  return { message: "Signup successful!" };
}
