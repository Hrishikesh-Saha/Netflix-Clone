import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useContentType } from "../store/content";

const useGetTrendingContent = () => {
  const { contentType } = useContentType();
  const [trendingContent, setTrendingContent] = useState(null);

  useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const response = await axios.get(`api/v1/${contentType}/trending`);
        setTrendingContent(response.data.content);
      } catch (error) {
        toast.error(error.response.data.message || "There was an error");
      }
    };

    getRandomMovie();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
