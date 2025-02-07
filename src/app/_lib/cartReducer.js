
import { createSlice } from '@reduxjs/toolkit';
import {axiosInstance} from '../api/axios'; 

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: null,
    loading: false,
    error: null,
    length:null,
    totalAmount:null,
  },
  reducers: {
    
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.items = action.payload.items;
      state.totalAmount=action.payload.totalAmount;
      state.length=action.payload.items.length;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = cartSlice.actions;

export const fetchData = (endpoint,token) => async (dispatch) => {
  dispatch(fetchDataStart()); 
  console.log(endpoint,token)
  try {
    const response = await axiosInstance.get(endpoint,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }); 
    console.log(response);
    
    dispatch(fetchDataSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchDataFailure(error.response?.data || error.message)); 
  }
};

export default cartSlice.reducer;
