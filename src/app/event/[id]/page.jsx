"use client";
import MapView from "@/src/components/MapView";
import Profile from "@/src/components/People/Profile";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Center, Text } from '@mantine/core';
import Term from "@/src/components/Form/Term";
import { useEffect, useRef, useState } from "react";
// import { getEventById } from "@/src/app/services/EventService";
import * as fb from "@/src/lib/firebase/clientApp";
import { doc, onSnapshot } from "firebase/firestore";
import moment from "moment";
export default function Event({ params }) {
  // This is a server component, we can access URL
  // parameters via Next.js and download the data
  // we need for this page

  console.log(params)

  const [eventData, setEventData] = useState(null);

  // Retrieve the event information
  useEffect(() => {
    onSnapshot(doc(fb.db, "events", params.id), (doc) => {
      try {
        setEventData(doc.data());
        window.response = doc.data();
        // console.log(eventData);

      } catch (e) {
        console.error(e);
      }
    })
  }, []);

  const [opened, { open, close }] = useDisclosure(false);
  const paymentTermValue = useRef(false);
  return (
    <main className="main_event">
      <Modal opened={opened} onClose={close} title="Your Details">
        <TextInput label="First Name" mb={7}></TextInput>
        <TextInput label="Home Club" mb={7} defaultValue={"Clubless"}></TextInput>
        <Text mb={7}>Payment</Text>
        <Term title="$5 Payment" description="You agree to transfer the organiser $5 for booking the court today." valueRef={paymentTermValue}></Term>
        <Center mt={10}>
          <Button title="Sign Up" onClick={close}> Sign Up </Button>
        </Center>
      </Modal>
      <div className="main_event-map">
        {/* Add Google Login Here */}
        <MapView latitude={eventData?.location?.coordinates?.latitude} longitude={eventData?.location?.coordinates?.longitude}/>
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
                  {eventData?.name ?? ''}
                </div>
                <div className="event-content-subtitle">
                  {eventData?.eventDate && <Text> {moment(eventData?.eventDate.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</Text>}
                </div>
                <div className="event-content-subtitle secondary-color sm-txt">
                  {eventData?.location?.clubName}
                </div>
              </div>
            </div>
          </div>
          <div className="slot-row">
            <div className="slot-section">
              {eventData?.courts.map((court, courtIndex) => {
                return (<>
                  <h2 className="item med-text secondary-color">
                    {court.courtName}
                  </h2>
                  {eventData?.attendees.filter(allCourtPeople => allCourtPeople.assignedCourtIndex === courtIndex).map(p => <Profile name={p.name} home={p.homeCourt} />)}
                </>)
              })}
            </div>
          </div>
        </div>



        <div className="join-row">
          <Button className="join-btn" onClick={open}> Join </Button>
        </div>
      </div>
    </main>
  );

}
