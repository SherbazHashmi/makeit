"use client";
import MapView from "@/src/components/MapView";
import Profile from "@/src/components/People/Profile";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Center, Text } from '@mantine/core';
import Term from "@/src/components/Form/Term";
import { useEffect, useRef, useState } from "react";
import * as fb from "@/src/lib/firebase/clientApp";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import moment from "moment";
import { Skeleton } from '@mantine/core';
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
      } catch (e) {
        console.error(e);
      }
    })
  }, []);

  const [opened, { open, close }] = useDisclosure(false);
  const paymentTermValue = useRef(false);
  const [userInformation, setUserInformation] = useState({ name: '', homeClub: '', assignedCourtIndex: 0 });

  const handleClick = async () => {
    const totalCapacity = eventData.courts.reduce((acc, court) => acc + court.capacity, 0);
    if (userInformation.firstName === '' || userInformation.homeClub === '') {
      alert("Please complete form");
      return;
    }

    if (paymentTermValue.current === false) {
      alert("Cannot proceed without payment agreement");
      return;
    }

    if (eventData.attendees.length === totalCapacity) {
      alert("No more spots available");
      return;
    }

    try {
      await addMember({ originalStructure: eventData, documentPath: params.id, newAttendee: userInformation });
    } catch (e) {
      console.error(e);
    }
    close();
  }

  const onChangeUserField = (fieldChanged, event) => {
    const value = event.target.value;
    switch (fieldChanged) {
      case 'firstName':
        setUserInformation({ ...userInformation, name: value })

        break;
      case 'homeClub':
        setUserInformation({ ...userInformation, homeClub: value })
        break;

      default:
        console.error(fieldName + ' not supported.')
        break;
    }
  }

  return (
    <main className="main_event">
      <Modal opened={opened} onClose={close} title="Your Details">
        <TextInput label="First Name" mb={7} onChange={onChangeUserField.bind(this, 'firstName')}></TextInput>
        <TextInput label="Home Club" mb={7} onChange={onChangeUserField.bind(this, 'homeClub')} defaultValue={""}></TextInput>
        <Text mb={7}>Payment</Text>
        <Term title="$5 Payment" description={`You agree to transfer ${eventData?.organiser} $5 for booking the court`} valueRef={paymentTermValue}></Term>
        <Center mt={10}>
          <Button title="Sign Up" onClick={handleClick}> Sign Up </Button>
        </Center>
      </Modal>
      <div className="main_event-map">
        {/* Add Google Login Here */}
        <MapView latitude={eventData?.location?.coordinates?.latitude} longitude={eventData?.location?.coordinates?.longitude} />
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
                  <Skeleton height={8} mt={6} radius="xl" visible={!eventData} />
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
              <h2 className="item med-text secondary-color">
                Players ({eventData?.attendees?.length === eventData?.courts?.reduce((acc, court) => acc + court.capacity, 0) ? 'All Slots Taken' : 'Space Available'})
              </h2>
              {eventData?.courts.map((court, courtIndex) => {
                return (<>
                  {eventData?.attendees.filter(allCourtPeople => allCourtPeople.assignedCourtIndex === courtIndex).map(p => <Profile name={p.name} home={p.homeClub} />)}
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


};

const addMember = async ({ originalStructure, documentPath, newAttendee }) => {
  const document = await setDoc(doc(fb.db, "events", documentPath), { ...originalStructure, attendees: [...originalStructure.attendees, newAttendee] });
  debugger;
  console.log(document);
}


