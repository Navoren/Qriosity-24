import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signIn, signOut } from "../../redux/slices/userSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().userSlice.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.originalStatus === 403) {
        console.log('sending refresh token');
        
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if(refreshResult?.data) {
            const user = api.getState().userSlice.user
            api.dispatch(signIn({...refreshResult.data, user}))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(signOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}) //builder
})