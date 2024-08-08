import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getItem, setItem } from "../utils/helpers";
import { RecentlyVisitedState, RecentResourcesState } from "../utils/types";

const initialState: RecentlyVisitedState = {
  resources: getItem("visitedResources") || [],
  roadmaps: getItem("visitedRoadmaps") || [],
};

const recentlyVisitedSlice = createSlice({
  name: "recentlyVisited",
  initialState,
  reducers: {
    addVisitedResource: (
      state,
      action: PayloadAction<RecentResourcesState>
    ) => {
      const { id, title } = action.payload;
      const existingIndex = state.resources.findIndex(
        (resource) => resource.id === id
      );
      if (existingIndex !== -1) {
        state.resources.splice(existingIndex, 1);
      }
      state.resources.unshift({ id, title });
      if (state.resources.length > 3) {
        state.resources.pop();
      }
      setItem("visitedResources", state.resources);
    },
    addVisitedRoadmap: (state, action: PayloadAction<RecentResourcesState>) => {
      const { id, title } = action.payload;
      const existingIndex = state.roadmaps.findIndex(
        (roadmap) => roadmap.id === id
      );
      if (existingIndex !== -1) {
        state.roadmaps.splice(existingIndex, 1);
      }
      state.roadmaps.unshift({ id, title });
      if (state.roadmaps.length > 3) {
        state.roadmaps.pop();
      }
      setItem("visitedRoadmaps", state.roadmaps);
    },
  },
});

export const { addVisitedResource, addVisitedRoadmap } =
  recentlyVisitedSlice.actions;
export default recentlyVisitedSlice.reducer;
