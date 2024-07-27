import { apiSlice } from "./apiSlice";
import { RESOURCS_URL } from "../utils/constants";
import { CreateResourceRequest, GetResourcesRequest } from "../utils/types";

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
  }),
});

export const {
  useCreateResourceMutation,
  useGetResourcesQuery,
  useGetResourceByIdQuery,
} = resourcesApiSlice as any;
