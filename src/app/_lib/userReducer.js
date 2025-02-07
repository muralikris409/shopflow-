
import { createSlice } from '@reduxjs/toolkit';
import {axiosInstance} from '../api/axios'; 

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token:null,
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
      state.user = action.payload.user;
      state.token=action.payload.token;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = userSlice.actions;

export const fetchData = (endpoint,token) => async (dispatch) => {
  dispatch(fetchDataStart()); 
  try {
    const response = await axiosInstance.post(endpoint,{},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }); 
    console.log(response)
    dispatch(fetchDataSuccess({user:response?.data?.data,token:token}));
  } catch (error) {
    dispatch(fetchDataFailure(error.response?.data || error.message)); 
  }
};

export default userSlice.reducer;
