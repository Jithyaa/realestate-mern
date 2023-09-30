import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        login:builder.mutation({
            query:(data) => ({
                url:`${USERS_URL}/admin`,
                method:'POST',
                body:data
            }),
        }),
        logout:builder.mutation({
            query:() => ({
                url:`${USERS_URL}/logout`,
                method:'POST',
                
            })
        }),

    })
})
export const {useLoginMutation,useLogoutMutation}=adminApiSlice;