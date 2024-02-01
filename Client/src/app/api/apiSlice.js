import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { refreshUser, signOut } from "../../redux/slices/userSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().userSlice.access_token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log(result)
    if (result?.error?.status === 403) {
        console.log('Refreshing token...');

        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            // const user = api.getState().userSlice.user
            api.dispatch(refreshUser({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(signOut())
        }
    }
    if(result?.error?.status === 500) {
        //TODO: Navigate to login
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body: { ...credentials }
            })
        }),
        leaderboard: builder.query({
            query: () => "/leaderboard",
        })
    })
})

export const { useLoginMutation, useLeaderboardQuery } = apiSlice;