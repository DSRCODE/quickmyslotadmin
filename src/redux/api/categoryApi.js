import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["Category", "SubCategory"],
  endpoints: (builder) => ({
    // ---------- PRODUCT MAIN CATEGORY ----------
    getCategoryList: builder.query({
      query: () => "admin/main-categories",
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "admin/category-create",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `admin/category-update/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `admin/category-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // ---------- PRODUCT SUB CATEGORY ----------
    getSubCategoryList: builder.query({
      query: (categoryId) => `admin/sub-categories/${categoryId}`,
      providesTags: ["SubCategory"],
    }),

    createSubCategory: builder.mutation({
      query: ({ newSubCategory }) => ({
        url: `admin/category-create`,
        method: "POST",
        body: newSubCategory,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    updateSubCategory: builder.mutation({
      query: ({ updatedData, mainCategoryId }) => ({
        url: `admin/category-update/${mainCategoryId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    deleteSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `admin/category-delete/${subCategoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategory"],
    }),

    // ---------- SERVICES MAIN CATEGORY ----------
    getServicesCategoryList: builder.query({
      query: () => "admin/service-category-list",
      providesTags: ["ServicesCategory"],
    }),

    createServicesCategory: builder.mutation({
      query: (newCategory) => ({
        url: "admin/service-category-create",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["ServicesCategory"],
    }),

    updateServicesCategory: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `admin/service-category-update/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["ServicesCategory"],
    }),

    deleteServicesCategory: builder.mutation({
      query: (id) => ({
        url: `admin/service-category-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServicesCategory"],
    }),

    // ---------- SERVICES SUB CATEGORY ----------
    getServicesSubCategoryList: builder.query({
      query: () => `admin/service-subcategory-list`,
      providesTags: ["ServicesSubCategory"],
    }),

    createServicesSubCategory: builder.mutation({
      query: ({ newSubCategory }) => ({
        url: `admin/service-subcategory-create`,
        method: "POST",
        body: newSubCategory,
      }),
      invalidatesTags: ["ServicesSubCategory"],
    }),

    updateServicesSubCategory: builder.mutation({
      query: ({ updatedData, mainCategoryId }) => ({
        url: `admin/service-subcategory-update/${mainCategoryId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["ServicesSubCategory"],
    }),

    deleteServicesSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `admin/service-subcategory-delete/${subCategoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServicesSubCategory"],
    }),
  }),
});

export const {
  // Product Main Category
  useGetCategoryListQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // Product Sub Category
  useGetSubCategoryListQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,

  // Services Main Category
  useGetServicesCategoryListQuery,
  useCreateServicesCategoryMutation,
  useUpdateServicesCategoryMutation,
  useDeleteServicesCategoryMutation,

  // Services Sub Category
  useGetServicesSubCategoryListQuery,
  useCreateServicesSubCategoryMutation,
  useUpdateServicesSubCategoryMutation,
  useDeleteServicesSubCategoryMutation,
} = categoryApi;
