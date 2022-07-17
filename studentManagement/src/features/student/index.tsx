import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import StudentFilter from 'components/student/StudentFilter';
import StudentTable from 'components/student/StudentTable';
import { cityActions, selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from './studentSlice';

const StyledParentBox = styled(Box)`
    position: relative;
    padding-top: 8px; 
`;


const StyledLinearProgress = styled(LinearProgress)`
    position: absolute;
    top: -8px;
    width: 100%;
`;

const StyledChildBox = styled(Box)`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 16px;
    align-items: center;
`;

function StudentFeature() {
    const location = useLocation();
    const navigate = useNavigate();

    // Student Reducer/Dispatch
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectStudentLoading)
    const studentList = useAppSelector(selectStudentList);
    const pagination = useAppSelector(selectStudentPagination);
    const filter = useAppSelector(selectStudentFilter);
    useEffect(() => {
        dispatch(studentActions.fetchStudentList(filter));
    }, [dispatch, filter])

    const handlePageChange = (e: any, page: number) => {
        dispatch(studentActions.setFilter({
            ...filter,
            _page: page
        }))
    }

    const count = Math.ceil(pagination._totalRows / pagination._limit);

    // City Reducer/Dispath
    const cityMap = useAppSelector(selectCityMap);
    const cityList = useAppSelector(selectCityList);

    useEffect(() => {
        dispatch(cityActions.fetchCityList());
    }, [dispatch])

    // Filter/Search Logic
    const handleSearchChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilterWithDebounce(newFilter));
    };

    const handleFilterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter));
    };
    //  Edit Student logic    
    const handleEditStudent = (student: Student) => {
        navigate(`${location.pathname}/${student.id}`);
    }

    // Remove Student logic
    const handleRemoveStudent = async (student: Student) => {
        try {
            await studentApi.remove(student.id || '');
            const newFilter = { ...filter };
            dispatch(studentActions.setFilter(newFilter))
        } catch (error) {
            console.log(error);
        }
        // toast
        toast.success('Remove student successfully!');
    }

    return (
        <StyledParentBox >
            {/* {Loading} */}
            {loading && <StyledLinearProgress />}


            {/* {Name + Add} */}
            <Link style={{ textDecoration: 'none' }} to={`${location.pathname}/add`}>
                <StyledChildBox>
                    <Typography variant="h4">Students</Typography>
                    <Button variant="contained" sx={{ backgroundColor: '#121212' }}>Add New Student</Button>
                </StyledChildBox>
            </Link>

            {/* {Search/Filter} */}
            <Box mb={3}>
                {/* Filter */}
                <StudentFilter
                    filter={filter}
                    cityList={cityList}
                    onSearchChange={handleSearchChange}
                    onChange={handleFilterChange}
                />
            </Box>

            {/* {Student table} */}
            <StudentTable
                studentList={studentList}
                cityMap={cityMap}
                onEdit={handleEditStudent}
                onRemove={handleRemoveStudent}
            />

            {/* {Pagination} */}
            <Box mt={2} display='flex' justifyContent='center'>
                <Pagination
                    count={count}
                    page={pagination._page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </StyledParentBox>
    )
};

export default StudentFeature;