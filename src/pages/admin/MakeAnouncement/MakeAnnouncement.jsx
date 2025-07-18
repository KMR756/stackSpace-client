import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://stack-space-server.vercel.app/announcements",
        data
      );
      if (res.data.insertedId) {
        Swal.fire("Success", "Announcement created!", "success");
        reset();
      }
    } catch (error) {
      console.error("Failed to post announcement:", error);
      Swal.fire("Error", "Failed to make announcement", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📢 Make Announcement
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Author Image */}
        <div>
          <label className="block font-semibold mb-1">Author Image URL</label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            className="w-full border px-4 py-2 rounded"
            {...register("authorImage", {
              required: "Author image is required",
            })}
          />
          {errors.authorImage && (
            <p className="text-red-500 text-sm">{errors.authorImage.message}</p>
          )}
        </div>

        {/* Author Name */}
        <div>
          <label className="block font-semibold mb-1">Author Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            className="w-full border px-4 py-2 rounded"
            {...register("authorName", { required: "Author name is required" })}
          />
          {errors.authorName && (
            <p className="text-red-500 text-sm">{errors.authorName.message}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Announcement Title</label>
          <input
            type="text"
            placeholder="Exciting Update!"
            className="w-full border px-4 py-2 rounded"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            placeholder="Write your announcement here..."
            className="w-full border px-4 py-2 rounded h-32"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Publish Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
