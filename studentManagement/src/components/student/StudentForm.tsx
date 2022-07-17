import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/form-fields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";


interface StudentFormProps {
    initialValues?: Student;
    onSubmit?: (formValues: Student) => void;
};

const schema = yup.object({
    name: yup
        .string()
        .trim()
        .required('Please enter name')
        .test(
            'two-words',
            'Please enter at least two words',
            (value) => {
                if (!value) return true;

                const parts = value.trim()?.split(' ') || [];
                return parts.filter(x => !!x).length >= 2;
            }
        ),

    age: yup.number()
        .positive('Please enter a positive number.')
        .integer('Please enter an integer.')
        .min(18, 'Min is 18')
        .max(150, 'Max is 150')
        .required('Please enter age')
        .typeError('Please enter a valid number'),


    mark: yup.number()
        .min(0, 'Min is 0')
        .max(10, 'Max is 10')
        .required('Please enter mark')
        .typeError('Please enter a valid number'),

    gender: yup.string().oneOf(['male', 'female'], 'Please select either male or female').required('Please select gender'),

    city: yup.string().required('Please select city')

}).required();



const StudentForm = ({ initialValues, onSubmit }: StudentFormProps) => {
    const [error, setError] = useState<string>('');

    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<Student>({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    });

    const handleFormSubmit = async (formValues: Student) => {
        try {
            // clear previous submission error
            setError('');

            await onSubmit?.(formValues);
        } catch (error: any) {
            console.log('Failed to update/add student', error);
            setError(error.message as string);
        }
    }

    // city Options for select-field
    const cityOptions = useAppSelector(selectCityOptions);

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="name" control={control as any} label="Full Name" />
                <RadioGroupField
                    name="gender"
                    control={control as any}
                    label="Gender"
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' }
                    ]} />
                <InputField name="age" control={control as any} label="Age" type="number" />
                <InputField name="mark" control={control as any} label="Mark" type="number" />
                {
                    Array.isArray(cityOptions)
                    &&
                    cityOptions.length > 0
                    &&
                    <SelectField name="city" control={control as any} label="City" options={cityOptions} />
                }

                {error && <Alert severity="error">{error}</Alert>}

                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress size={16} color="primary" />}
                        &nbsp; Save
                    </Button>
                </Box>
            </form>

        </Box>
    )
};

export default StudentForm;