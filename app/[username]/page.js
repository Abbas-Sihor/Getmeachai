import Paymentpage from "@/components/Paymentpage";
import { notFound } from "next/navigation";
import { fetchUser } from "@/actions/useraction";

export default async function Page({ params }) {
  const { username } = await params;
  let user = await fetchUser(username)

  // Redirect if the user does not exist
  if (!user) {
    notFound(); // Triggers a 404 page
  }

  return (
    <>
      <Paymentpage username={username} />
    </>
  );
}

export async function generateMetadata({params}) {
  const { username } = await params;
  return{
    title:`${username} - Support ${username}’s Project | Patronic`,
    description:`Support ${username}’s development project by contributing funds. Track their progress and help turn their ideas into reality on Patronic.`
  }
}


