import React, { useEffect, useState } from "react";
import axios from "axios";

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get("https://stack-space-server.vercel.app/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <h2 className="text-4xl font-bold text-Secondary mb-4">Announcements</h2>

      {announcements.map(
        ({ _id, authorImage, authorName, title, description, createdAt }) => (
          <div
            key={_id}
            className="border-transparent bg-[#c63c51] p-4 rounded-4xl shadow-md"
          >
            <div className="flex text-white items-center space-x-4 mb-2">
              <img
                src={authorImage}
                alt={authorName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{authorName}</p>
                <p className="text-sm text-white">
                  {new Date(createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-1 text-white">{title}</h3>
            <p className="text-white">{description}</p>
          </div>
        )
      )}
    </div>
  );
};

export default AnnouncementList;
