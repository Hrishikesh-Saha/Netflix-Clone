import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const authUser = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: false,
  isLoggingOut: false,
  isLoggingIn: false,
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(`/api/v1/auth/signup`, data);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message || "Sign up failed");
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", data);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in succesfully");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message || "Log in failed");
      set({ isLoggingIn: false });
    }
  },
  logOut: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Log out failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/check");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false });
    }
  },
}));
