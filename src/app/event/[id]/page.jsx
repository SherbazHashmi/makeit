"use client";
import MapView from "@/src/components/MapView";
import Profile from "@/src/components/People/Profile";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Center, Text } from '@mantine/core';
import { useEffect, useRef, useState } from "react";
import * as fb from "@/src/lib/firebase/clientApp";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import moment from "moment";
import { Skeleton } from '@mantine/core';
import ProfilePage from "@/src/components/People/ProfilePage";
import DetailsForm from "@/src/components/Form/DetailsForm";
export default function Event({ params }) {
  // This is a server component, we can access URL
  // parameters via Next.js and download the data
  // we need for this page

  console.log(params)

  const [eventData, setEventData] = useState(null);
  const paymentTermValue = useRef(false);
  // Retrieve the event information
  useEffect(() => {
    onSnapshot(doc(fb.db, "events", params.id), (doc) => {
      const data = doc.data();
      if (data === undefined) {
        throw Error('Unable to fetch court information');
      } else {
        setEventData(doc.data());
      }
    })
  }, []);

  const [opened, { open, close }] = useDisclosure(false);
  const [userInformation, setUserInformation] = useState({ name: '', homeClub: '', assignedCourtIndex: 0, isMember: true});

  const handleClick = async () => {
    const totalCapacity = eventData?.courts?.reduce((acc, court) => acc + court.capacity, 0);
    const courtCapacities = eventData?.courts.map(({ courtName, capacity }, idx) => ({ currentAllocation: eventData?.attendees.filter(p => p.assignedCourtIndex === idx).length, courtName, capacity, courtIndex: idx }));
    const assignedCourtIndex = courtCapacities.reduce((acc, { capacity, currentAllocation, courtIndex }) => acc !== null ? acc : currentAllocation < capacity ? courtIndex : null, null);
    if (userInformation.firstName === '' || userInformation.homeClub === '') {
      alert("Please complete form");
      return;
    }
    if (paymentTermValue.current === false && !userInformation.isMember) {
      alert("Cannot proceed without payment agreement or becoming a member");
      return;
    }

    if (eventData.attendees.length === totalCapacity) {
      alert("No more spots available");
      return;
    }

    try {
      await addMember({ originalStructure: eventData, documentPath: params.id, newAttendee: { ...userInformation, assignedCourtIndex } });
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

  const updateUserField = (field, value) => {
    setUserInformation({
      ...userInformation,
      [field]: value,
    });
  } 

  return (
    <main className="main_event">
      <Modal opened={opened} onClose={close} title="Your Details">
        <DetailsForm handleClick={handleClick} paymentTermValue={paymentTermValue} onChangeUserField={onChangeUserField} cost={eventData?.bookingCost} organiser={eventData?.organiser} clubName={eventData?.location?.clubName} updateUserField={updateUserField} isMember={userInformation.isMember} paymentDetails={eventData?.paymentDetails}/>
      </Modal>
      <div className="main_event-map">
        {/* Add Google Login Here */}
        <MapView latitude={eventData?.location?.coordinates?.latitude} longitude={eventData?.location?.coordinates?.longitude} locationLabel={eventData?.location?.clubName ?? 'Location'} />
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
                  <Text size="xl">{eventData?.name ?? ''}</Text>
                </div>
                <div className="event-content-subtitle">
                  {eventData?.eventDate && <Text size="sm"> {moment(eventData?.eventDate.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</Text>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text c="blue.6" size="xs" fw={'bold'}>{eventData?.location?.clubName}</Text>
                  <Text c="red.6" ml={5} size="xs" fw={'bold'} display={eventData && eventData?.attendees?.length === eventData?.courts?.reduce((acc, court) => acc + court.capacity, 0) ? 'block' : 'none'}>At Capacity</Text>
                  <Text c="yellow.6" ml={5} size="xs" fw={'bold'} display={eventData?.attendees?.length === eventData?.courts?.reduce((acc, court) => acc + court.capacity, 0) ? 'none' : 'block'}>Space available</Text>

                </div>
              </div>
            </div>
          </div>
          <ProfilePage eventData={eventData} />
          <div className="join-row">
            <Button size="md" className="join-btn" onClick={open} disabled={eventData?.attendees.length === eventData?.courts.reduce((acc, court) => acc + court.capacity, 0)}> Join </Button>
          </div>
        </div>
      </div >
    </main >
  );


};

const addMember = async ({ originalStructure, documentPath, newAttendee }) => {
  await setDoc(doc(fb.db, "events", documentPath), { ...originalStructure, attendees: [...originalStructure.attendees, newAttendee] });
}


