import { create } from "zustand";

export const useContentType = create((set) => ({
  contentType: "movie",
  setContentType: (type) => set({ contentType: type }),
}));
