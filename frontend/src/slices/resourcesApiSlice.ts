import { apiSlice } from "./apiSlice";
import { RESOURCS_URL } from "../utils/constants";
import {
  AddResourceRatingRequest,
  CreateResourceRequest,
  GetResourcesRequest,
} from "../utils/types";

export const resourcesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createResource: builder.mutation<void, CreateResourceRequest>({
      query: (data) => ({
        url: `${RESOURCS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getResources: builder.query<any, GetResourcesRequest>({
      query: ({ search, sort, filter, pageNumber }) => ({
        url: `${RESOURCS_URL}`,
        method: "GET",
        params: { search, sort, filter, pageNumber },
      }),
    }),
    getResourceById: builder.query<any, string>({
      query: (id) => ({
        url: `${RESOURCS_URL}/details/${id}`,
        method: "GET",
      }),
    }),
    addResourceRating: builder.mutation<void, AddResourceRatingRequest>({
      query: ({ id, rating, comment }) => ({
        url: `${RESOURCS_URL}/${id}/rating`,
        method: "POST",
        body: { rating, comment },
      }),
    }),
    getUserReview: builder.query<void, string>({
      query: (id) => ({
        url: `${RESOURCS_URL}/${id}/get-review`,
        method: "GET",
      }),
    }),
    getLatestComments: builder.query<void, string>({
      query: (id) => ({
        url: `${RESOURCS_URL}/${id}/latest-comments`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateResourceMutation,
  useGetResourcesQuery,
  useGetResourceByIdQuery,
  useAddResourceRatingMutation,
  useGetUserReviewQuery,
  useGetLatestCommentsQuery,
} = resourcesApiSlice as any;
