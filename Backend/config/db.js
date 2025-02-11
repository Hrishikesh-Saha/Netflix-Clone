import {connect} from "mongoose";

import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const connection = await connect(ENV_VARS.MONGO_URI);
    console.log("MongoDB connected : " + connection.connection.host);
  } catch (error) {
    console.log("Error in connecting to MongoDB : " + error.message);
    process.exit(1); //Exited with error
  }
};
