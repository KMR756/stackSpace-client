import React from "react";
import Logo from "../shared/Logo/Logo";
import loginPic from "../../assets/login.svg";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const location = useLocation();
  const Navigate = useNavigate();
  const from = location.state?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then(() => {
        toast.success("login successfully!", {
          duration: 3000,
          style: {
            background: "#22c55e",
            color: "#fff",
          },
        });
        Navigate(from);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Invalid email or password.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="lato text-2xl xl:text-3xl font-extrabold">
              LogIn now
            </h1>
            <div className="w-full flex-1 mt-8">
              <SocialLogin />

              <div className="my-12 border-b text-center">
                <div className="lato leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or login with e-mail
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-500 text-sm mt-1 block">
                      Email is required.
                    </p>
                  )}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-500 text-sm mt-1 block">
                      password is required.
                    </p>
                  )}
                  <button className="mt-5 tracking-wide font-semibold bg-[#8f5989]  text-gray-100 w-full py-4 rounded-lg hover:bg-navFooter transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="lato ml-3">logIn</span>
                  </button>
                  <p className="lato mt-6 text-xs text-gray-600 text-center">
                    Don't have an account?{" "}
                    <Link to={"/auth/registration"}>Registration</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img src={loginPic} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
