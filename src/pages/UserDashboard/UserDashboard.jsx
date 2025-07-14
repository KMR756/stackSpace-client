import React from "react";
import myProfile from "../../assets/myProfile.svg";
import addPost from "../../assets/addPost.svg";
import myPost from "../../assets/myPost.svg";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
const UserDashboard = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div>
      <div class="w-full h-full bg-rose-100/30  py-16">
        <div class="max-w-6xl mx-auto flex flex-col justify-center items-center">
          {/* <!-- Title --> */}

          <h2 class="lato text-navFooter text-3xl lg:text-6xl text-center font-serif font-semibold mb-12 ">
            Dashboard
          </h2>

          {/* <!-- Cards --> */}
          <div class="flex flex-wrap gap-8 justify-center items-center">
            <Link to={`/dashboard/my-profile/${user.uid}`}>
              <div className="group w-[18rem] sm:w-[20rem] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <img
                  className="w-full h-[14rem] object-cover"
                  src={myProfile}
                  alt="Profile"
                />
                <div className="p-5">
                  <h2 className="lato text-2xl text-center font-bold mb-1 group-hover:text-rose-600">
                    My Profile
                  </h2>
                </div>
              </div>
            </Link>

            <Link to={"/dashboard/add-post"}>
              <div class="group w-[18rem] sm:w-[20rem] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <img
                  class="w-full h-[14rem] object-cover"
                  src={addPost}
                  alt="Sushi"
                />
                <div class="p-5">
                  <h2 class="lato text-2xl text-center font-bold  mb-1 group-hover:text-rose-600 ">
                    Add Post
                  </h2>
                </div>
              </div>
            </Link>
            <Link to={`/dashboard/my-posts/${user.uid}`}>
              <div class="group w-[18rem] sm:w-[20rem] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <img
                  class="w-full h-[14rem] object-cover"
                  src={myPost}
                  alt="Sushi"
                />
                <div class="p-5">
                  <h2 class="lato text-2xl text-center font-bold  mb-1 group-hover:text-rose-600 ">
                    My Posts
                  </h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* <!-- Ionicons -->
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script> */}
    </div>
  );
};

export default UserDashboard;
