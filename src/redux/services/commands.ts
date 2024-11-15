import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Commands {
  original: string
  optimized: string
  date: string
  time: string
  initialPosition: string
  finalPosition: string
  id: number
}

export const commandsApi = createApi({
  reducerPath: 'commandsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://77df27215785ffea.mokky.dev' }),
  tagTypes: ['Commands'],
  endpoints: (builder) => ({
    getCommands: builder.query<Commands[], void>({
      query: () => 'commands',
      providesTags: ['Commands']
    }),
    createCommands: builder.mutation<void, Record<string, string>>({
      query: (body) => ({
        url: '/commands',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Commands']
    })
  })
})

export const { useGetCommandsQuery, useCreateCommandsMutation } = commandsApi
