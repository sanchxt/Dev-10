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
      query: ({ search, sort, filter }) => ({
        url: `${RESOURCS_URL}`,
        method: "GET",
        params: { search, sort, filter },
      }),
    }),
  }),
});

export const { useCreateResourceMutation, useGetResourcesQuery } =
  resourcesApiSlice as any;
