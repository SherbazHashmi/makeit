import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp.js";
import { Text, Image, Container, Center } from "@mantine/core";
import { IconBallTennis } from "@tabler/icons-react";
// Force next.js to treat this route as server-side rendered
// Without this line, during the build process, next.js will treat this route as static and build a static HTML file for it

export const dynamic = "force-dynamic";

// This line also forces this route to be server-side rendered
// export const revalidate = 0;

export default async function Home({ searchParams }) {
	// Using seachParams which Next.js provides, allows the filtering to happen on the server-side, for example:
	// ?city=London&category=Indian&sort=Review
	const { firebaseServerApp } = await getAuthenticatedAppForUser();
	return (
		<main className="main__home">
			<Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
				<IconBallTennis size={60}/>
				<Text>Please open an event link to continue</Text>
			</Container>

		</main>
	);
}
