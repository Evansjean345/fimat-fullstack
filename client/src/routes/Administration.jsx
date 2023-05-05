import React from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import AdminTable from "../components/AdminTable";

export default function Administration() {
  return (
    <>
      <div className="flex flex-col h-full  xl:flex-row">
        <div className="xl:w-[17%] w-full">
          <Navbar />
        </div>
        <div className="bg-gray-200 xl:w-[83%] w-full py-4 xl:px-16 px-8 flex flex-col  ">
          <strong className="px-2 py-6 font-mono text-2xl text-gray-800">
            Toutes les commandes
          </strong>
          <AdminTable/>
          <Footer />
        </div>
      </div>
    </>
  );
}
