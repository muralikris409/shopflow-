import { createSlice } from "@reduxjs/toolkit";
const initialState={
    data:{
        filter:null,
        search:null,
        language:null,
        country:null,
    },
}
const genericReducer = createSlice({
    name: "Filter",
    initialState: initialState,
    reducers: {
      updateFilter(state, action) {
        state.data.filter = action.payload; 
      },
      resetFilter(state) {
        state.data = { filter: null };
      },
      updateSearch(state,action){
      state.data.search=action.payload;
      },
      updateCountry(state,action){
      state.data.country=action.payload;
      },
      updateLanguage(state,action){
        state.data.language=action.payload;

      }
    }, 
  });
  
  export const { updateFilter, resetFilter,updateSearch,updateCountry,updateLanguage } = genericReducer.actions;
  export default genericReducer.reducer;
