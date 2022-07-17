import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface SudentState {
  loading?: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: SudentState = {
  loading: false,
  list: [],
  filter: {
    _limit: 15,
    _page: 1,
  },
  pagination: {
    _limit: 1,
    _page: 15,
    _totalRows: 15,
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchStudentListFailed(state, action: PayloadAction<string>) {
      // Do nothing
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// reducers
const studentReducer = studentSlice.reducer;

// Actions
const studentActions = studentSlice.actions;

// selectors
const selectStudentList = (state: RootState) => state.student.list;
const selectStudentLoading = (state: RootState) => state.student.loading;
const selectStudentFilter = (state: RootState) => state.student.filter;
const selectStudentPagination = (state: RootState) => state.student.pagination;

export {
  studentActions,
  selectStudentList,
  selectStudentLoading,
  selectStudentFilter,
  selectStudentPagination,
};
export default studentReducer;
