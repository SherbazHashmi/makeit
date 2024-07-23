import React, { useState } from 'react';
import { Button, Text } from '@mantine/core';
import Profile from './Profile';
function ProfilePage({ eventData }) {
    const [currentCourtIdx, setCurrentCourtIdx] = useState(0);
    const [imageIndex, setImageIndex] = useState({});

    const chooseImage = ({profileIndex, imagePath}) => {setImageIndex({...imageIndex, [profileIndex]: imagePath})};
    return (
        <>
            <div className="slot-row">
                {eventData?.courts.filter((_, idx) => idx === currentCourtIdx).map((court, courtIndex) => {
                    return (
                        <div className="slot-section" key={courtIndex}>
                            <Text c="blue.7" fw="bold">
                                {court.courtName}
                            </Text>
                            {eventData?.attendees.filter(allCourtPeople => allCourtPeople.assignedCourtIndex === currentCourtIdx).map((p, pIdx) => <Profile name={p.name} home={p.homeClub} chooseImage={chooseImage} key={(currentCourtIdx * 4) + pIdx} profileIndex={(currentCourtIdx * 4) + pIdx} imagePath={imageIndex[(currentCourtIdx * 4) + pIdx]}/>)}
                            {new Array(4 - eventData?.attendees.filter(allCourtPeople => allCourtPeople.assignedCourtIndex === currentCourtIdx).length).fill('').map((_, idx) => <Profile name={"Available"} home={"Could be you"} assigned={false} key={`profile-${idx}`} chooseImage={chooseImage}/>)}
                        </div>)
                })}
            </div>
            <div className="button_container">
                {currentCourtIdx !== 0 ? <Button onClick={() => setCurrentCourtIdx(currentCourtIdx - 1)} display={currentCourtIdx === 0 ? "none" : "block"} size="xs">{"Back"}</Button> : <></> }
                {eventData?.courts?.length > 0 && currentCourtIdx < eventData?.courts?.length - 1 ? <Button onClick={() => setCurrentCourtIdx(currentCourtIdx + 1)} display={eventData?.courts?.length > 0 && currentCourtIdx < eventData?.courts?.length - 1 ? "block" : "none"} size="xs"> {"Next"} </Button> : <> </> }
            </div>
        </>
    )
}

export default ProfilePage;