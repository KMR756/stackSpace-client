import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Select from "react-select";
import Loading from "../shared/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";

const AddPost = () => {
  const [userPostsCount, setUserPostsCount] = useState(0);
  const [isMembershipUser, setIsMembershipUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handlePayment = (email) => {
    navigate(`/dashboard/membership/${email}`);
    console.log(user);
  };
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

  // Fetch user and their post count
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, postRes] = await Promise.all([
          axiosSecure.get(`/users/${user.email}`),
          axiosSecure.get(`/posts?authorEmail=${user.email}`),
        ]);

        setIsMembershipUser(userRes.data.membership);
        setUserPostsCount(postRes.data.length);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user/posts:", error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [user, axiosSecure]);

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((res) => {
          setUserData(res.data); // ✅ Save to state
        })
        .catch((error) => {
          // console.error("Error fetching user data:", error);
        });
    }
  }, [user?.email]);
  const onSubmit = (data) => {
    if (!isMembershipUser && userPostsCount >= 5) {
      alert("You’ve reached the post limit. Become a member to post more!");
      return;
    }

    const postData = {
      ...data,
      upVote: 0,
      downVote: 0,
      createdAt: new Date().toISOString(),
      author: {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      },
    };

    axiosSecure.post("/posts", postData).then((res) => {
      if (res.data._id) {
        toast.success("post created successfully!", {
          duration: 3000,
          style: {
            background: "#22c55e",
            color: "#fff",
          },
        });
        navigate(`/dashboard/my-posts/${user.uid}`);
      }
    });
  };

  if (loading) return <Loading />;

  if (!isMembershipUser && userPostsCount >= 5) {
    return (
      <div className="text-center my-20">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          You've reached your free post limit!
        </h2>
        <p className="mb-6 text-gray-600">
          Upgrade to membership to publish unlimited posts.
        </p>
        <button
          onClick={() => handlePayment(user.email)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg"
        >
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-2/3 mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-5xl text-center text-navFooter font-bold mb-6">
        Add Post
      </h2>

      <div className="flex justify-center items-center flex-col border-transparent p-10 rounded-3xl bg-amber-100 md:mx-20 lg:mx-30 xl:mx-60">
        <img
          className="w-20 h-20 object-cover rounded-full"
          src={user.photoURL}
          alt={user.displayName}
        />

        <h1 className="lato font-bold mt-3 text-xl">{user.displayName}</h1>
        <h1 className="lato mt-2">{user.email}</h1>
        <p className="lato border-transparent bg-blue-400 text-white font-semibold px-2 py-1 rounded-2xl mt-2">
          {userData?.membership ? "Gold" : "Bronze"}
        </p>
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
            type="text"
            {...register("postTitle", {
              required: "Post title is required",
              maxLength: { value: 120, message: "Max 120 characters" },
            })}
            className="lato shadow border border-accent rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="The Future of Web Development in 2024"
          />
          {errors.postTitle && (
            <p className="text-red-500 text-xs italic">
              {errors.postTitle.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="lato block text-gray-700 text-xl font-bold mb-2">
            Description :
          </label>
          <textarea
            rows="6"
            {...register("postDescription", {
              required: "Description is required",
            })}
            className="lato shadow border border-accent rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            rules={{ required: "Please select a tech category" }}
            render={({ field }) => (
              <Select
                {...field}
                options={techTagOptions}
                className="basic-single"
                classNamePrefix="select"
                value={techTagOptions.find(
                  (option) => option.value === field.value?.value
                )}
                onChange={(selected) => field.onChange(selected)}
              />
            )}
          />
          {errors.tag && (
            <p className="text-red-500 text-xs italic">{errors.tag.message}</p>
          )}
        </div>

        {/* Hidden vote fields */}
        <input type="hidden" {...register("upVote")} value={0} />
        <input type="hidden" {...register("downVote")} value={0} />
        <input type="hidden" {...register("createdAt")} />

        <div className="flex items-center justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full text-lg"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
