import React from "react";

import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";

const HomeScreen = () => {
  return (
    <>
      <div className="h-screen relative text-white bg-black">
        <Navbar />

        <img
          src="/extraction.jpg"
          alt="missing"
          className="w-full h-full absolute top-0 left-0 z-10"
        />
        <div
          className="absolute top-0 left-0 bg-black/50 w-full h-full z-20"
          aria-hidden="true"
        />

        <div className="absolute w-full h-full top-0 flex flex-col justify-center px-8 md:px-16 lg:px-32 left-0 z-30">
          <div className="bg-gradient-to-b from-black to-transparent w-full h-full absolute top-0 left-0 via-transparent z-30" />

          <div className="max-w-2xl z-40">
            <h1 className="z-40 mt-4 text-6xl font-bold text-balance">
              Extraction
            </h1>
            <p className="z-40 mt-2 text-lg">2014 | 18+</p>
            <p className="z-40 mt-4 text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem itaque ex dicta libero architecto commodi illo consequuntur ea ullam reiciendis, possimus rerum est nam laborum reprehenderit aliquid animi quo quae.</p>
          </div>

          <div className="flex mt-8 gap-4">
            <Link to={"/"} className="bg-white hover:bg-white/80 z-40 rounded flex font-bold items-center text-black py-2 px-4">
            <Play className="size-6 mr-2 fill-black z-40" />
            Play
            </Link>
            <Link to={"/"} className="bg-gray-500/70 hover:bg-gray-500 z-40 rounded flex font-bold items-center text-white py-2 px-4">
            <Info className="size-6 mr-2  z-40" />
            More Info
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
