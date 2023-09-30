import {configureStore,combineReducers} from '@reduxjs/toolkit';

import authReducer from './slices/authSlice'

import adminReducer from './adminSlices/authSlice'

import { apiSlice } from './slices/apiSlice';



const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  });
  
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });
  
  export default store;