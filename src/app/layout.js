import "@/src/app/styles.scss";
import '@mantine/core/styles.css';
import { ColorSchemeScript } from '@mantine/core';

import { createTheme, MantineProvider } from "@mantine/core";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp";
// Force next.js to treat this route as server-side rendered
// Without this line, during the build process, next.js will treat this route as static and build a static HTML file for it
export const dynamic = "force-dynamic";

export const metadata = {
  title: "MakeIt",
  description:
    "Make It is a booking application",
};


export default async function RootLayout({ children }) {
  const { currentUser } = await getAuthenticatedAppForUser();
  const theme = createTheme({
    /** Put your mantine theme override here */
  });
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript></ColorSchemeScript>
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <main>{children}</main>
        </MantineProvider>

      </body>

    </html>
  );
}
