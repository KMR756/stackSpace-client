import React from "react";
import Banner from "../shared/Banner/Banner";
import { useLoaderData } from "react-router";
import AllPost from "./AllPost";

const Home = () => {
  const posts = useLoaderData();
  console.log(posts);

  return (
    <div>
      <Banner />
      {posts.map((post) => (
        <AllPost post={post}></AllPost>
      ))}
    </div>
  );
};

export default Home;
