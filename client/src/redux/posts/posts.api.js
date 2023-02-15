import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
    reducerPath: 'postsApi',
    tagTypes: ['Posts'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    endpoints: (build) => ({
        getPosts: build.query({
            query: (limit = '') => `posts?${limit && `_limit=${limit}`}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({id}) => ({type: 'Posts', id})),
                        {type: 'Posts', id: 'LIST'}]
                    : [{type: 'Posts', id: 'LIST'}]
        }),
        addPost: build.mutation({
            query: (body) => ({
                url: 'posts',
                method: 'POST',
                body,
            }),
            invalidatesTags:[{type: 'Posts', id: 'LIST'}]
        })
    })
})

export const {useGetPostsQuery, useAddPostMutation} = postsApi;