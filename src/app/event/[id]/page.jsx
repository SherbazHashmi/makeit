"use client";
import MapView from "@/src/components/MapView";
import Profile from "@/src/components/People/Profile";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Center} from '@mantine/core';
import Term from "@/src/components/Form/Term";
import { useRef } from "react";

export default function Event({ params }) {
  // This is a server component, we can access URL
  // parameters via Next.js and download the data
  // we need for this page
 
  const [opened, { open, close }] = useDisclosure(false);
  const paymentTermValue = useRef(false);
  return (
    <main className="main_event">
      <Modal opened={opened} onClose={close} title="Your Details">
        <TextInput label="Your Name" mb={7}></TextInput>
        <Term title="$5 Payment" description="You agree to transfer the organiser $5 for booking the court today." valueRef={paymentTermValue}></Term>
        <Center mt={10}>
          <Button title="Sign Up" onClick={close}> Sign Up </Button>
        </Center>
      </Modal>
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
          <div className="slot-row">

            <div className="slot-section">
              <h2 className="item med-text secondary-color">
                Court 1
              </h2>
              <Profile name="Sherbaz" home="Beclonnen" />
              <Profile name="Grace" home="Belconnen" />
              <Profile name="Natalia" home="Turner" />
              <Profile name="Anne" home="Turner" />

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
