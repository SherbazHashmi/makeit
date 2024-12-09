import React, { useState } from 'react'
import Term from '@/src/components/Form/Term';
import { Button, TextInput, Center, Text, Checkbox, Group } from '@mantine/core';
const DetailsForm = ({ clubName, cost, onChangeUserField, paymentTermValue, handleClick, organiser, updateUserField, isMember, paymentDetails}) => {
    return (
        <>
            <TextInput label="First Name" size="md" mb={7} onChange={onChangeUserField.bind(this, 'firstName')}></TextInput>
            <TextInput label="Home Club" size="md" mb={7} onChange={onChangeUserField.bind(this, 'homeClub')} defaultValue={""}></TextInput>
            <>
            <Text mb={7} size="md">Are you a member of {clubName}</Text>
            <Group>
                <Checkbox
                    label={`Yes`}
                    checked={isMember}
                    onChange={(event) => updateUserField('isMember', true)}
                />
                <Checkbox
                    label={`No`}
                    checked={!isMember}
                    onChange={(event) => updateUserField('isMember', false)}
                />
            </Group>
           

            </>
            {
                cost !== 0 && !isMember && (
                    <>
                     <Text mb={7} size="md">Payment (Non Club Members Only)</Text>
                     <Term title={`$${cost} Payment`} description={`You agree to transfer the host (${organiser}) a $${cost} booking fee. `+paymentDetails} valueRef={paymentTermValue}></Term>
                    </>
                )
            }
           <Center mt={10}>
                <Button size="sm" title="Sign Up" onClick={handleClick}> Sign Up </Button>
            </Center>
        </>
    )
}

export default DetailsForm