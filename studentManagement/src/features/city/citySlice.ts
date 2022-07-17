import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

export interface CityState {
  loading: boolean;
  list: City[];
}

const initialState: CityState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },
  },
});

// reducer
const cityReducer = citySlice.reducer;

// Actions
const cityActions = citySlice.actions;

// Selectors
const selectCityList = (state: RootState) => state.city.list;
const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;

    return map;
  }, {})
);

const selectCityOptions = createSelector(selectCityList, (cityList) => 
cityList.map(city => ({
  label: city.name,
  value: city.code,
}))
);

export { cityActions, selectCityList, selectCityMap, selectCityOptions };
export default cityReducer;
