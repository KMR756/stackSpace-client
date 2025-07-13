// import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
// import axios from "axios";
import { useNavigate } from "react-router";
import Select from "react-select";
import Loading from "../shared/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddPost = () => {
  //   const [postCount, setPostCount] = useState(0);
  //   const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      authorName: user?.displayName || "",
      authorEmail: user?.email || "",
      authorImage: user?.photoURL || "",
      createdAt: new Date().toISOString(),
    },
  });

  // Technology-focused tag options
  const techTagOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-dev", label: "Mobile Development" },
    { value: "ai-ml", label: "AI/ML" },
    { value: "cloud-computing", label: "Cloud Computing" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "data-science", label: "Data Science" },
    { value: "devops", label: "DevOps" },
    { value: "blockchain", label: "Blockchain" },
    { value: "iot", label: "IoT" },
    { value: "programming", label: "Programming" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "database", label: "Database" },
  ];

  //   useEffect(() => {
  //     const fetchPostCount = async () => {
  //       try {
  //         const response = await axios.get("/api/posts/count");
  //         setPostCount(response.data.count);
  //       } catch (error) {
  //         console.error("Error fetching post count:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchPostCount();
  //   }, []);

  const onSubmit = (data) => {
    const postData = {
      ...data,
      upVote: 0,
      downVote: 0,
      createdAt: new Date().toISOString(), // Add current timestamp
      author: {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid, // Add user ID if available
      },
    };

    axiosSecure.post("/posts", postData).then((res) => {
      //   console.log(res.data._id);
      if (res.data._id) {
        alert("post created successfully");
        navigate("/dashboard/my-post");
      }
    });

    // console.log(data.insertedId);
  };

  //   const handleBecomeMember = () => {
  //     navigate("/membership");
  //   };

  //   if (isLoading) {
  //     return <Loading />;
  //   }

  //   if (postCount >= 5) {
  //     return (
  //       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  //         <h2 className="text-2xl font-bold mb-4">Tech Post Limit Reached</h2>
  //         <p className="mb-6">
  //           You've reached the maximum limit of 5 tech posts for free users.
  //           Upgrade to our Tech Pro membership to continue sharing your knowledge!
  //         </p>
  //         <button
  //           onClick={handleBecomeMember}
  //           className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors"
  //         >
  //           Become a Tech Pro Member
  //         </button>
  //       </div>
  //     );
  //   }

  return (
    <div className="w-full lg:w-2/3 mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-5xl text-center text-navFooter font-bold mb-6">
        Add Post
      </h2>

      {/* User Info Section */}
      <div className="flex justify-center items-center flex-col border-transparent p-10 rounded-3xl bg-amber-100 md:mx-20 lg:mx-30 xl:mx-60">
        <div>
          <img
            className="w-20 h-20 rounded-full"
            src={user.photoURL}
            alt={user.displayName}
          />
        </div>
        <h1 className="lato font-bold mt-3 text-xl">{user.displayName}</h1>
        <h1 className="lato mt-2">{user.email}</h1>

        {/* Hidden fields for user data */}
        <input type="hidden" {...register("authorName")} />
        <input type="hidden" {...register("authorEmail")} />
        <input type="hidden" {...register("authorImage")} />
      </div>

      <form
        className="border-transparent rounded-3xl bg-amber-50 p-6 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="lato block text-gray-700 text-xl mt-10 font-bold mb-2">
            Post Title :
          </label>
          <input
            id="postTitle"
            type="text"
            {...register("postTitle", {
              required: "Post title is required",
              maxLength: {
                value: 120,
                message: "Title must be less than 120 characters",
              },
            })}
            className="lato shadow appearance-none border-1 border-accent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="The Future of Web Development in 2024"
          />
          {errors.postTitle && (
            <p className="text-red-500 text-xs italic">
              {errors.postTitle.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="lato block text-gray-700 text-xl font-bold mb-2"
            htmlFor="postDescription"
          >
            Description :
          </label>
          <textarea
            id="postDescription"
            rows="6"
            {...register("postDescription", {
              required: "Description is required",
            })}
            className="lato shadow appearance-none border-1 border-accent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your tech insights, tutorials, or experiences..."
          />
          {errors.postDescription && (
            <p className="text-red-500 text-xs italic">
              {errors.postDescription.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            Tech Category
          </label>
          <Controller
            name="tag"
            control={control}
            rules={{ required: "Please select at least one tech category" }}
            render={({ field }) => (
              <Select
                {...field}
                options={techTagOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selected) => field.onChange(selected)}
                onBlur={field.onBlur}
                value={techTagOptions.find(
                  (option) => option.value === field.value?.value
                )}
              />
            )}
          />
          {errors.tag && (
            <p className="text-red-500 text-xs italic">{errors.tag.message}</p>
          )}
        </div>

        {/* Hidden fields */}
        <input type="hidden" {...register("upVote")} value={0} />
        <input type="hidden" {...register("downVote")} value={0} />
        <input type="hidden" {...register("createdAt")} />

        <div className="flex items-center justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-colors text-lg"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
