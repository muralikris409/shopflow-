import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product:null,
  history:null,
};
const utilSlice=createSlice({
    
    name:"props",
    initialState,
    reducers:{
        setProductData(state,action){
            console.log(action);
            state.product=action.payload;
            console.log(action.payload);
        },
        setHistory(state,action){

            state.history=action.payload;
            console.log(state.history);
        }
    
    }
});
export const {setProductData,setHistory}=utilSlice.actions;
export default utilSlice.reducer;