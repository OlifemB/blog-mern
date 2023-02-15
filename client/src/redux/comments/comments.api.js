import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    endpoints: (build) => ({
        getComments: build.query({
            query: () => 'comments'
        })
    })
})

export const {useGetCommentsQuery} = commentsApi;