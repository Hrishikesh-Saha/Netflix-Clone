import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";

import Navbar from "../../components/Navbar";

import { useContentType } from "../../store/content";

import useGetTrendingContent from "../../hooks/useGetTrendingContent";

import {
  ORIGINAL_IMG_BASE_URL,
  Movie_Categories,
  TV_Categories,
} from "../../constants/constants";

import ContentSlider from "../../components/ContentSlider";

const HomeScreen = () => {
  const { contentType } = useContentType();
  const { trendingContent } = useGetTrendingContent();
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    setImgLoading(true);
  }, [contentType]);

  if (!trendingContent)
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 bg-black/70 w-full shimmer h-full flex items-center justify-center -z-10" />
      </div>
    );

  return (
    <>
      <div className="h-screen relative text-white bg-black">
        <Navbar />

        {imgLoading && (
          <div className="absolute top-0 left-0 bg-black/70 w-full shimmer h-full flex items-center justify-center z-30" />
        )}

        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="missing"
          className="w-full h-full absolute top-0 left-0 z-10 object-cover"
          onLoad={() => setImgLoading(false)}
        />
        <div
          className="absolute top-0 left-0 bg-black/50 w-full h-full z-20"
          aria-hidden="true"
        />

        <div className="absolute w-full h-full top-0 flex flex-col justify-center px-8 md:px-16 lg:px-32 left-0 z-30">
          <div
            className="bg-gradient-to-b from-black to-transparent w-full h-full absolute top-0 left-0 via-transparent z-30"
            aria-hidden="true"
          />

          <div className="max-w-2xl z-40">
            <h1 className="z-40 mt-4 text-6xl font-bold text-balance">
              {trendingContent?.name || trendingContent?.title}
            </h1>
            <p className="z-40 mt-2 text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="z-40 mt-4 text-lg">
              {trendingContent?.overview?.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>

          <div className="flex mt-8 gap-4">
            <Link
              to={"/watch/" + trendingContent?.id}
              className="bg-white hover:bg-white/80 z-40 rounded flex font-bold items-center text-black py-2 px-4"
            >
              <Play className="size-6 mr-2 fill-black z-40" />
              Play
            </Link>
            <Link
              to={"/watch/" + trendingContent?.id}
              className="bg-gray-500/70 hover:bg-gray-500 z-40 rounded flex font-bold items-center text-white py-2 px-4"
            >
              <Info className="size-6 mr-2  z-40" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col  py-10 bg-black gap-10">
        {contentType === "movie"
          ? Movie_Categories.map((item, index) => (
              <ContentSlider key={index} category={item} />
            ))
          : TV_Categories.map((item, index) => (
              <ContentSlider key={index} category={item} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
