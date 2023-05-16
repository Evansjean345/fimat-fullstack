import React from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Blog from "../components-two/Blog";

export default function ProfileBlog() {
  return (
    <>
      <div className="flex flex-col h-full  xl:flex-row">
        <div className="xl:w-[17%] w-full">
          <Navbar />
        </div>
        <div className="bg-gray-200 xl:w-[83%] w-full py-4 xl:px-16 px-8 flex flex-col  ">
          <Blog />
          <Footer />
        </div>
      </div>
    </>
  );
}
