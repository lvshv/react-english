import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Category = {
  title: string
  id: number
}

type CategoriesResponse = {
  data: Array<Category>
  lastPage: number
}

type CategoriesQuery = {
  page: number | string
  take?: number | string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Category'],
  endpoints: builder => ({
    getCategories: builder.query<CategoriesResponse, CategoriesQuery>({
      query: query => {
        return {
          url: `categories`,
          method: 'GET',
          params: query,
        }
      },
      providesTags: result => {
        return result
          ? [...result.data.map(({ id }) => ({ type: 'Category', id } as const)), { type: 'Category', id: 'LIST' }]
          : [{ type: 'Category', id: 'LIST' }]
      },
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: ({ ...body }) => ({
        url: `categories`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation<Category, Partial<Category>>({
      query: ({ id }) => ({
        url: `categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
})

export const { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation } = api
