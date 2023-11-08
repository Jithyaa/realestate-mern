import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    registrationData: null,
}
const tempInfo = localStorage.getItem("tempInfo");
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            console.log("😑😑😑😑😑",action.payload);
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
         logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem("tempInfo");
         },
    },
});

export const {setCredentials, logout, setRegistrationData} = authSlice.actions;

export default authSlice.reducer;