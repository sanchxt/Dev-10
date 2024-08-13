import { apiSlice } from "./apiSlice";
import {  ROADMAPS_URL, USERS_URL } from "../utils/constants";
import { CreateRoadmapProps, GetRoadmapRequest } from "../utils/types";

export const roadmapApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoadmap: builder.mutation<void, CreateRoadmapProps>({
      query: (data) => ({
        url: `${ROADMAPS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    getRoadmap: builder.query<any, GetRoadmapRequest>({
      query: ({ search, sort, filter, pageNumber }) => ({
        url: `${ROADMAPS_URL}`,
        method: 'GET',
        params: { search, sort, filter, pageNumber },
      }),
    }),
  }),
});

export const { useCreateRoadmapMutation, useGetRoadmapQuery } = roadmapApiSlice as any;
