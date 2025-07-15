import Logo from "../shared/Logo/Logo";
// import userPicDemo from "../../assets/userPic.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import { useState } from "react";

const Registration = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const location = useLocation();
  const Navigate = useNavigate();
  const from = location.state?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;

        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };

        updateUserProfile(userProfile)
          .then(() => {
            console.log("Firebase profile updated");

            const saveUser = {
              name: data.name,
              email: data.email,
              photoURL: profilePic,
              createdAt: new Date(),
              membership: false, // <-- Add membership field
            };

            axios
              .post("http://localhost:3000/users", saveUser)
              .then(() => {
                console.log("User saved to DB");
                Navigate(from);
              })
              .catch((err) => console.error("Failed to save user:", err));
          })
          .catch((err) => console.log("Profile update error:", err));
      })
      .catch((err) => {
        console.log("Registration error:", err);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const imgUploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imgUploadURL, formData);
    setProfilePic(res.data.data.url);
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
              Registration Now
            </h1>
            <div className="w-full flex-1 mt-8">
              <SocialLogin />

              <div className="my-12 border-b text-center">
                <div className="lato leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or registration with e-mail
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto max-w-xs">
                  <input
                    onChange={handleImageUpload}
                    className="w-full  px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="file"
                    placeholder="profile picture"
                  />
                  <input
                    className="w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1 block">
                      Name is required
                    </span>
                  )}
                  <input
                    className="w-full px-8 py-4 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1 block">
                      Email is required
                    </span>
                  )}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                        message: "Password must include letters and numbers",
                      },
                    })}
                  />

                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.password.message}
                    </span>
                  )}

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-[#8f5989] text-gray-100 w-full py-4 rounded-lg hover:bg-navFooter transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
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
                    <span className="lato ml-3">Registration</span>
                  </button>
                  <p className="lato mt-6 text-xs text-gray-600 text-center">
                    Already have an account? <Link to="/auth/login">LogIn</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
