import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { ChevronRight } from "lucide-react";

import Logo from "/notflix-logo.png";
import TV from "/tv.png";
import StarngerThingsLg from "/stranger-things-lg.png";
import StrangetThingsSm from "/stranger-things-sm.png";
import DevicePile from "/device-pile.png";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };

  return (
    <>
      <div className="hero-bg relative">
        {/*Navbar: */}
        <header className="flex items-center justify-between w-full max-w-6xl p-4 pb-10 mx-auto py-1">
          <img src={Logo} alt="missing" className="md:w-52 w-32" />
          <Link
            to={"/login"}
            className="px-2.5 py-1 hover:bg-red-700 transition-all duration-300 bg-red-600 rounded font-semibold text-white"
          >
            Sign In
          </Link>
        </header>

        {/* Hero Section: */}
        <div className="max-w-6xl mx-auto flex justify-center items-center text-white flex-col text-center py-40">
          <h1 className="text-4xl md:text-6xl font-bold mb-5">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="mb-2.5 text-lg">Watch anywhere. Cancel anytime.</p>
          <p className="mb-6">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          <form
            className="flex md:flex-row flex-col gap-y-2 gap-x-4 w-1/2"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
              placeholder="Email adress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="text-xl lg:text-2xl lg:px-6 md:py-2 bg-red-600 transition-all duration-300 hover:bg-red-700 cursor-pointer flex justify-center items-center rounded px-2 py-1">
              Get Started <ChevronRight className="size-8 md:size-10" />
            </button>
          </form>
        </div>
      </div>

      {/* Separator: */}
      <div className="w-full h-2 bg-[#232323]" aria-hidden="true"></div>

      {/* 1st Section: */}
      <div className="py-10 bg-black text-white">
        <div className="max-w-6xl px-4 sm:px-6 lg:px-2 flex flex-col md:flex-row mx-auto justify-center items-center">
          <div className="left md:text-left text-center flex-1 ">
            <h2 className="font-extrabold text-4xl md:text-5xl mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on smart TVs, Playstation, Xbox, Chromecasts, Apple TV,
              Blueray players, and more.
            </p>
          </div>
          <div className="right flex-1 relative">
            <img src={TV} alt="missing" className="mt-4 relative z-20" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 z-10 h-1/2 -translate-y-1/2"
              autoPlay={true}
              playsInline
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Separator: */}
      <div className="w-full h-2 bg-[#232323]" aria-hidden="true"></div>

      {/* 2nd Section: */}
      <div className="py-10 text-white bg-black">
        <div className="max-w-6xl mx-auto flex justify-center items-center md:flex-row flex-col-reverse px-4 sm:px-6 lg:px-2">
          <div className="left flex-1">
            <div className="relative">
              <img src={StarngerThingsLg} alt="missing" className="mt-4" />

              <div className="flex items-center gap-2 bottom-5 left-1/2 absolute -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md p-2">
                <img src={StrangetThingsSm} alt="missing" className="h-full" />

                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>

                  <img src="/download-icon.gif" alt="" className="h-12" />
                </div>
              </div>
            </div>
          </div>
          <div className="right flex-1 relative">
            <div className="left md:text-left text-center flex-1 ">
              <h2 className="font-extrabold text-4xl md:text-5xl mb-4">
                Download your shows to watch offline
              </h2>
              <p className="text-lg md:text-xl">
                Save your favourites easily and always have something to watch
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Separator: */}
      <div className="w-full h-2 bg-[#232323]" aria-hidden="true"></div>

      {/* 3rd Section: */}
      <div className="py-10 bg-black text-white">
        <div className="max-w-6xl px-4 sm:px-6 lg:px-2 flex flex-col md:flex-row mx-auto justify-center items-center">
          <div className="left md:text-left text-center flex-1 ">
            <h2 className="font-extrabold text-4xl md:text-5xl mb-4">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          <div className="right flex-1 relative overflow-hidden">
            <img
              src={DevicePile}
              alt="missing"
              className="mt-4 relative z-20"
            />
            <video
              className="absolute top-2 max-w-[63%] left-1/2 -translate-x-1/2 z-10 h-2/3"
              autoPlay={true}
              playsInline
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Separator: */}
      <div className="w-full h-2 bg-[#232323]" aria-hidden="true"></div>

      {/* 4th Section: */}
      <div className="py-10 bg-black text-white">
        <div className="flex flex-col-reverse sm:px-6 items-center justify-center md:flex-row max-w-6xl px-4 lg:px-2 mx-auto ">
          <div className="left flex-1 mt-4">
            <img src="/kids.png" alt="missing" />
          </div>
          <div className="right flex-1 text-center md:text-left">
            <h1 className="font-extrabold md:text-5xl text-4xl mb-4">
              Create profile for kids
            </h1>
            <p className="text-lg md:text-xl">
              Send kids on adventure with their favourite characters in a space
              made just for them-free with your membership
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthScreen;
