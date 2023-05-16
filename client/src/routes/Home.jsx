import React, { useContext, useState, useEffect } from "react";
import Navbar from "../layouts/Navbar";
import PanelBlocs from "../components/PanelBlocs";
import Table from "../components/Table";
import Footer from "../layouts/Footer";
import Order from "../components-two/Order";
import { AuthContext } from "../services/account.service";
import PanelUser from "../components-two/PanelUser";

export default function Home() {
  const { getUserInfo } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setUserInfo(data);
    };
    fetchUserInfo();
  }, [getUserInfo]);

  return (
    <>
      <div className="flex flex-col h-full  xl:flex-row">
        <div className="xl:w-[17%] w-full">
          <Navbar />
        </div>
        <div className="bg-gray-200 xl:w-[83%] w-full py-4 xl:px-16 px-8 flex flex-col ">
          <strong className="px-2 py-6 font-mono text-2xl text-gray-800">
            Panneau de commande
          </strong>
          {userInfo === null ? (
            "chargement"
          ) : userInfo.isAdmin === undefined ? (
            "chargement"
          ) : userInfo.isAdmin === true ? (
            <PanelBlocs />
          ) : (
            <PanelUser />
          )}
          <strong className="px-2 py-6 font-mono text-2xl text-gray-800">
            {userInfo === null
              ? "chargement"
              : userInfo.isAdmin === undefined
              ? "chargement"
              : userInfo.isAdmin === true
              ? "liste des commandes"
              : "interface des commandes"}
          </strong>
          {userInfo === null ? (
            "chargement"
          ) : userInfo.isAdmin === undefined ? (
            "chargement"
          ) : userInfo.isAdmin === true ? (
            <Table />
          ) : (
            <Order />
          )}
          <Footer />
        </div>
      </div>
    </>
  );
}
