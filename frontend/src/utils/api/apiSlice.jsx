import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}` }), // Setting base url where your backend runs

  tagTypes: ['Users', 'Homes'], // To manage cache invalidation and data refetching efficiently
  endpoints: (builder) => ({ 

    // GET : user/find-all
    // To Retrieve all the users
    getUsers: builder.query({ 
      query: () => 'user/find-all',
      providesTags: ['Users'],
    }),

    // GET : home/find-by-user/${username}
    // To Retrieve all the homes corresponding to a user
    getHomesByUser: builder.query({
      query: ({ username }) => `home/find-by-user/${username}`,
      providesTags:  ['Homes'],
    }),

    // GET : user/find-by-home/${streetName}
    // To Retrieve all the users corresponding to a home
    getUsersByHome: builder.query({
      query: (streetName) => `user/find-by-home/${encodeURIComponent(streetName)}`,
      providesTags:['Users'],
    }),

    updateUsersForHome: builder.mutation({
      query: ({ street_name, users }) => (
        {
        url: 'home/update-users',
        method: 'PUT',
        body: { street_name, users },
      }),
      invalidatesTags: (result, error, arg) => [
       'Homes',
       'Users'
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetHomesByUserQuery,
  useGetUsersByHomeQuery,
  useUpdateUsersForHomeMutation,
} = apiSlice;
