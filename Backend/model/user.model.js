import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    profileImg: {
      type: String,
      default: "",
    },
    searchHistory: {
      type: Array,
      default: [],
    },
  },
  {}
);

const User = mongoose.model("User", userSchema);

export default User;
