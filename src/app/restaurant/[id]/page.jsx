import { getAuthenticatedAppForUser, getAuthenticatedAppForUser as getUser } from "@/src/lib/firebase/serverApp.js";

import { getFirestore } from "firebase/firestore";

export default async function Home({ params }) {
  // This is a server component, we can access URL
	// parameters via Next.js and download the data
	// we need for this page
  const { currentUser } = await getUser();
  const {firebaseServerApp} = await getAuthenticatedAppForUser();

  return (
    <main className="main__restaurant">
     
    </main>
  );
}
