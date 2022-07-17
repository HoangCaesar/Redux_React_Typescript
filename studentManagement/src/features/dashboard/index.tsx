import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import StarIcon from '@mui/icons-material/Star';
import TryIcon from '@mui/icons-material/Try';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import StatisticsItem from 'components/dashboard/StatisticsItem';
import StudentRankingList from 'components/dashboard/StudentRankingList';
import Widget from 'components/dashboard/Widget';
import { useEffect } from 'react';
import { dashboardActions, selectDashboardHighestStudentList, selectDashboardLoading, selectDashboardLowestStudentList, selectDashboardRankingByCityList, selectDashboardStatistics } from './dashboardSlice';

const StyledBox = styled(Box)`
    position: relative;
    padding-top: 8px; 
`;

const StyledLinearProgress = styled(LinearProgress)`
    position: absolute;
    top: -8px;
    width: 100%;
`;

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDashboardLoading);
    const satistics = useAppSelector(selectDashboardStatistics);
    const highestStudentList = useAppSelector(selectDashboardHighestStudentList);
    const lowestStudentList = useAppSelector(selectDashboardLowestStudentList);
    const rankingByCityList = useAppSelector(selectDashboardRankingByCityList);

    useEffect(() => {
        dispatch(dashboardActions.fetchData())
    }, [dispatch])

    return (
        <StyledBox>
            {/* {Loading} */}
            {loading && <StyledLinearProgress />}

            {/* {Statistics section} */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticsItem
                        icon={<MaleIcon fontSize="large" />}
                        label={'male'}
                        value={satistics.maleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticsItem
                        icon={<FemaleIcon fontSize="large" />}
                        label={'female'}
                        value={satistics.femaleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticsItem
                        icon={<StarIcon fontSize="large" />}
                        label={'High mark'}
                        value={satistics.highMarkCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticsItem
                        icon={<TryIcon fontSize="large" />}
                        label={'Low mark'}
                        value={satistics.lowMarkCount}
                    />
                </Grid>
            </Grid>

            {/* {All students ranking} */}
            <Box mt={4}>

                <Typography variant="h4">All Students</Typography>

                <Box mt={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title="Student with highest mark">
                                <StudentRankingList studentList={highestStudentList} />
                            </Widget>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title="Student with lowest mark">
                                <StudentRankingList studentList={lowestStudentList} />
                            </Widget>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* {Ranking by city} */}
            <Box mt={4}>

                <Typography variant="h4">Ranking By City</Typography>

                <Box mt={4}>
                    <Grid container spacing={3}>

                        {rankingByCityList.map((city) => (
                            <Grid key={city.cityName} item xs={12} md={6} lg={3}>
                                <Widget title={city.cityName}>
                                    <StudentRankingList studentList={city.rankingList} />
                                </Widget>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </StyledBox>
    )
};

export default Dashboard;