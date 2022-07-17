import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Student } from 'models';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityName: string;
  rankingList: Student[];
}

interface DashboardState {
  loading: boolean;
  satistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
  loading: false,
  satistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setSatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.satistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});

//actions
const dashboardActions = dashboardSlice.actions;

//selector
const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
const selectDashboardStatistics = (state: RootState) => state.dashboard.satistics;
const selectDashboardHighestStudentList = (state: RootState) => state.dashboard.highestStudentList;
const selectDashboardLowestStudentList = (state: RootState) => state.dashboard.lowestStudentList;
const selectDashboardRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList;

//reducers

const dashboardReducer = dashboardSlice.reducer;

export {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectDashboardHighestStudentList,
  selectDashboardLowestStudentList,
  selectDashboardRankingByCityList,
};

export default dashboardReducer;
