import { apiSlice } from "./apiSlice";
import { NOTES_URL } from "../utils/constants";
import { CreateNoteProps } from "../utils/types";

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation<void, CreateNoteProps>({
      query: (data) => ({
        url: `${NOTES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getNotes: builder.query({
      query: () => ({
        url: `${NOTES_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateNoteMutation, useGetNotesQuery } = notesApiSlice as any;
