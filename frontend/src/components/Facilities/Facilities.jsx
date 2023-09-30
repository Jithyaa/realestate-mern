import { Box, NumberInput,Group,Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

const Facilities = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {

    const form = useForm({
        initialValues: {
            bedrooms: propertyDetails.facilities.bedrooms,
            parkings: propertyDetails.facilities.parkings,
            bathrooms: propertyDetails.facilities.bathrooms,
        },
        validate: {
            bedrooms: (value) => (value < 1 ? "Must have atleast one room" : null),
            bathrooms: (value) => value < 1 ? "Must have atleast one bathroom" : null,
        },
    });

    const { bedrooms, parkings, bathrooms } = form.values;

    const handleSubmit = () => {
        const { hasErrors } = form.validate();
        if (!hasErrors) {
            setPropertyDetails((prev) => ({
                ...prev,
                facilities: { bedrooms, parkings, bathrooms },
            }));
            nextStep();
        }
    }

    return (
        <Box maw="30%" mx="auto" my="sm">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>

                <NumberInput
                    withAsterisk
                    label="No of Bedrooms"
                    min={0}
                    {...form.getInputProps("bedrooms")}
                />

                <NumberInput
                    withAsterisk
                    label="No of Parkings"
                    min={0}
                    {...form.getInputProps("parkings")}
                />

                <NumberInput
                    withAsterisk
                    label="No of Bathrooms"
                    min={0}
                    {...form.getInputProps("bathrooms")}
                />
                <Group position='center' mt="xl">
                    <Button variant='default' onClick={prevStep}>Back</Button>
                    <Button type='submit'>Next Step</Button>
                </Group>
            </form>
        </Box>
    )
}

export default Facilities
