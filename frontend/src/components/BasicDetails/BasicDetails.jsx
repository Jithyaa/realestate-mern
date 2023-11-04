import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { validateString } from '../../utils/common'
import { Box, Button, Group, NumberInput, TextInput, Textarea, Select } from '@mantine/core';

const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {

    const [priceValue, setPriceValue] = useState('');
    const [priceUnit, setPriceUnit] = useState('Cr');

    const form = useForm({
        initialValues: {
            title: propertyDetails.title,
            description: propertyDetails.description,
            type: propertyDetails.type || 'Buy',
            priceValue: priceValue,
            priceUnit: priceUnit,


        },
        validate: {
            title: (value) => validateString(value),
            description: (value) => validateString(value),
            priceValue: (value) => isNaN(value) ? "Price must be a number " : null,
        },
    });

    console.log("🥶🥶🥶🥶🥶🥶🥶🥶🥶", priceValue);
    console.log("☠️☠️☠️☠️☠️☠️☠️☠️☠️", priceUnit);

    const { title, description, type, price } = form.values

    const handleSubmit = () => {
        const { hasErrors } = form.validate()
        if (!hasErrors) {
            const price = `${priceValue} ${priceUnit}`
            setPropertyDetails((prev) => ({ ...prev, title, description, type, price }))
            nextStep();
        }
    }
    return (
        <Box maw="50%" mx="auto" my="md">
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <TextInput
                    withAsterisk
                    label='Title'
                    placeholder='Property name'
                    {...form.getInputProps("title")}
                />
                <Textarea
                    placeholder='Description'
                    label="Description"
                    withAsterisk
                    {...form.getInputProps("description")}
                />
                <Select
                    withAsterisk
                    label="Property Type"
                    placeholder="Select Type"
                    data={['Buy', 'Rent']}
                    value={type}
                    onChange={(value) => form.setFieldValue('type', value)}
                />
                <NumberInput
                    withAsterisk
                    label='Price Value'
                    placeholder='0'
                    min={0}
                    {...form.getInputProps("priceValue")}
                    value={form.values.priceValue} // Use form values to control the input value
                    onChange={(newValue) => {

                        form.setFieldValue("priceValue", newValue);

                        setPriceValue(newValue)
                        form.setFieldValue("price", price);
                    }}
                />

                <Select
                    label='Price Unit'
                    data={['Cr', 'Lakh', 'Thousand']}
                    onChange={(value) => {
                        setPriceUnit(value);
                        form.setFieldValue("priceUnit", value);
                        form.setFieldValue("price", `${priceValue} ${value}`);
                    }}
                />
                <Group position='center' mt="xl">
                    <Button variant='default' onClick={prevStep}>Back</Button>
                    <Button type='submit'>Next Step</Button>
                </Group>
            </form>
        </Box>
    )
}

export default BasicDetails
