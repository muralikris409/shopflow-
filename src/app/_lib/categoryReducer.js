
import { createSlice } from '@reduxjs/toolkit';
import {axiosInstance} from '../api/axios'; 

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = apiSlice.actions;

export const fetchData = (endpoint) => async (dispatch) => {
  dispatch(fetchDataStart()); 

  try {
    const response = await axiosInstance.get(endpoint); 
    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchDataFailure(error.response?.data || error.message)); 
  }
};

export default apiSlice.reducer;
