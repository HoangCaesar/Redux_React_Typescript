import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Box, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { useAppDispatch } from 'app/hooks';
import StudentForm from 'components/student/StudentForm';
import { cityActions } from 'features/city/citySlice';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditPage() {
    const { studentId } = useParams<{ studentId: string }>();
    const isEdit = Boolean(studentId);

    const [student, setStudent] = useState<Student>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!studentId) return;

        (async () => {
            try {
                const response: Student = await studentApi.getById(studentId);
                setStudent(response);
            } catch (err) {
                console.log("Failed to load this student")
            }
        })();

    }, [studentId]);

    const initialValues: Student = {
        name: '',
        age: '',
        mark: '',
        gender: 'male',
        city: '',
        ...student,
    } as Student;

    const handleStudentFormSubmit = async (formValues: Student) => {
        if (isEdit) {
            await studentApi.update(formValues);
        } else {
            await studentApi.add(formValues);
        }
        // toast
        toast.success('Save student successfully!')
        // naviagte
        navigate('/admin/students');
    }

    // Refetch city list 
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(cityActions.fetchCityList());
    }, [dispatch])

    return (
        <Box>
            <Link to="/admin/students" style={{ textDecoration: "none" }}>
                <Typography
                    variant="caption"
                    style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
                >
                    <ArrowCircleLeftIcon /> &nbsp; Back to student list
                </Typography>
            </Link>

            <Typography variant="h4">
                {isEdit ? 'Update Student Info' : 'Add New Student'}
            </Typography>

            {
                (!isEdit || Boolean(student)) && (
                    <Box mt={3}>
                        <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
                    </Box>
                )
            }
        </Box>
    )

};

export default EditPage;