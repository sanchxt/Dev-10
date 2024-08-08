import { apiSlice } from "./apiSlice";
import { ROADMAPS_URL } from "../utils/constants";
import { CreateRoadmapProps } from "../utils/types";

export const roadmapApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoadmap: builder.mutation<void, CreateRoadmapProps>({
      query: (data) => ({
        url: `${ROADMAPS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateRoadmapMutation } = roadmapApiSlice as any;
