import { apiSlice } from "./apiSlice";
import { RESOURCS_URL } from "../utils/constants";

interface CreateResourceRequest {
  essentials: string[];
  extras: string[];
  description: string;
  notes: string;
  tags: string[];
  title: string;
}

export const resourcesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createResource: builder.mutation<void, CreateResourceRequest>({
      query: (data) => ({
        url: `${RESOURCS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateResourceMutation } = resourcesApiSlice as any;
