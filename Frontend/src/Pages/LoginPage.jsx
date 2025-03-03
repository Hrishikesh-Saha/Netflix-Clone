import React, { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "/notflix-logo.png";
import { authUser } from "../store/authUser";

const LoginPage = () => {
  const { login, isLoggingIn } = authUser();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
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
            Login
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

            <button className="text-white font-semibold transition-all duration-300 cursor-pointer rounded-md w-full py-2 bg-red-600 hover:bg-red-700">
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-white text-center">
            Don't have an account?{" "}
            <Link className="text-red-500 hover:underline" to={"/signup"}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
