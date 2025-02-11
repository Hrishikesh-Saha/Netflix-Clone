import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMBD = async (url) => {
    const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
    },
  };

  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error("Unable to fetch from TMBD " + response.statusText);
  }

  return response.data;
};
