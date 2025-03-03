import React, { useState } from "react";

import { Link } from "react-router-dom";

import { authUser } from "../store/authUser";

import Logo from "/notflix-logo.png";

import { Eye, EyeOff } from "lucide-react";

const SignUpPage = () => {
  const { signUp, isSigningUp } = authUser();

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [formData, setFormData] = useState({
    username: "",
    email: emailValue || "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div className="hero-bg w-full h-screen">
      <header className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link to={"/"}>
          <img src={Logo} alt="missing" className="w-52" />
        </Link>
      </header>

      <div className="mt-12 mx-3 flex justify-center items-center">
        <div className="max-w-md p-8 w-full space-y-6 bg-black/60 shadow-md rounded-lg">
          <h1 className="text-center text-2xl text-white font-bold mb-4">
            Sign Up
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 mt-1 rounded-md border border-gray-700 focus:outline-none text-white bg-transparent focus:ring"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 mt-1 rounded-md border border-gray-700 focus:outline-none text-white bg-transparent focus:ring"
                placeholder="Hrishi123"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  className="w-full px-3 py-2  rounded-md border border-gray-700 focus:outline-none text-white bg-transparent focus:ring"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <span
                  className="text-white absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-300 block"
              >
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type={show2 ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none text-white bg-transparent focus:ring"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <span
                  className="text-white absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                  onClick={() => setShow2(!show2)}
                >
                  {show2 ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            <button className="text-white font-semibold transition-all duration-300 cursor-pointer rounded-md w-full py-2 bg-red-600 hover:bg-red-700">
              {isSigningUp ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="text-white text-center">
            Already a member?{" "}
            <Link className="text-red-500 hover:underline" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
