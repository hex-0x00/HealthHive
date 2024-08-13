import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { LoadingBtn } from "../Components";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authConfig";
import { useForm } from "react-hook-form";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const login = async (data) => {
    setLoading(true);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[85vh] flex justify-center items-center dark:bg-[#091f1f] bg-[#EBF7F7]">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Login to <span className="text-[#40bb98]">OutsourcingGPT</span>
        </h2>
        <form onSubmit={handleSubmit(login)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block dark:text-gray-300 text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40bb98]"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Password
            </label>
            <input
              type={showPass ? 'text':'password'}
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#40bb98]"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <div className="flex gap-2 mt-3 cursor-pointer" >

            <input className="cursor-pointer" type="checkbox" name='checkbox' id="checkbox" onClick={() => setShowPass(!showPass)} />
            <label
              htmlFor="checkbox"
              className="block text-gray-700 dark:text-gray-300 font-medium cursor-pointer ">
              Show Password
            </label>
            </div>
            
          </div>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <div className="mt-8">
            {!loading ? (
              <button
                type="submit"
                className="w-full bg-[#40bb98] h-12 text-white py-2 px-4 rounded-md hover:bg-[#32a685] transition-colors duration-300">
                Log In
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#40bb98] h-12 text-white py-2 px-4 rounded-md hover:bg-[#32a685] transition-colors duration-300">
                <LoadingBtn className="h-full flex justify-center items-center" />
              </button>
            )}
          </div>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-[#40bb98] hover:underline">
            Forgot password?
          </a>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/account/signup"
              className="text-[#40bb98] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
