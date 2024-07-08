import { getAuthenticatedAppForUser, getAuthenticatedAppForUser as getUser } from "@/src/lib/firebase/serverApp.js";
import MapView from "@/src/components/MapView";
import Profile from "@/src/components/People/Profile";

export default async function Event({ params }) {
  // This is a server component, we can access URL
  // parameters via Next.js and download the data
  // we need for this page
  const { currentUser } = await getUser();
  const { firebaseServerApp } = await getAuthenticatedAppForUser();

  return (
    <main className="main_event">
      <div className="main_event-map">
        {/* Add Google Login Here */}
        <MapView />
      </div>
      <div className="main_event-content">
        <div className="main_event-content-wrapper">
          <div className="title-row">
            <div className="title-container">
              <div className="title-icon">
                🎾
              </div>
              <div className="title-text">
                <div className="event-content-title">
                  Mega Tennis Club Event
                </div>
                <div className="event-content-subtitle">
                  12:30 July 2022
                </div>
                <div className="event-content-subtitle secondary-color sm-txt">
                  Old Parliament House (Red Side)
                </div>
              </div>
            </div>
          </div>
          <div className="court-row">

          </div>

          <div className="slot-row">

            <div className="slot-section">
              <h2 className="item med-text secondary-color">
                Court 1
              </h2>
              <Profile name="Sherbaz" home="Beclonnen"/>
              <Profile name="Grace" home="Belconnen"/>
              <Profile name="Natalia" home="Turner"/>
              <Profile name="Anne" home="Turner"/>

            </div>
          </div>
        </div>



        <div className="join-row">
          <button className="join-btn"> Join </button>
        </div>


      </div>
    </main>
  );

}
