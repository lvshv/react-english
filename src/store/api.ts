import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Category = {
  title: string
  id: number | string
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
  tagTypes: ['Category', 'Translate'],
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
    getCategoryById: builder.query<Category, string>({
      query: id => {
        return {
          url: `categories/${id}`,
          method: 'GET',
        }
      },
      providesTags: (result, error, id) => [{ type: 'Category', id }],
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: ({ ...body }) => ({
        url: `categories`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation<Category, Partial<Category>>({
      query: ({ id, ...body }) => ({
        url: `categories/${id}`,
        method: 'PATCH',
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

    translateWord: builder.query<any, any>({
      query: query => {
        return {
          url: `translate`,
          method: 'GET',
          params: query,
        }
      },
      providesTags: (result, error, id: any) => {
        console.log('🚀 ~ id', id)
        return [{ type: 'Translate', id: id.word }]
      },
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useTranslateWordQuery,
} = api
