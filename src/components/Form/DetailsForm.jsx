import React from 'react'
import Term from '@/src/components/Form/Term';
import { Button, TextInput, Center, Text } from '@mantine/core';
const DetailsForm = ({organiser, cost, onChangeUserField, paymentTermValue, handleClick}) => {
    return (
        <>
            <TextInput label="First Name" size="md" mb={7} onChange={onChangeUserField.bind(this, 'firstName')}></TextInput>
            <TextInput label="Home Club" size="md" mb={7} onChange={onChangeUserField.bind(this, 'homeClub')} defaultValue={""}></TextInput>
            {
                cost !== 0 && (
                    <>
                     <Text mb={7} size="md">Payment</Text>
                     <Term title={`$${cost} Payment`} description={`You agree to transfer the host (${organiser}) a $${cost} booking fee`} valueRef={paymentTermValue}></Term>
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