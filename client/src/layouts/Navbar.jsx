import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../services/account.service";
import "../App.css";

/* Install pure-react-carousel using -> npm i pure-react-carousel */

export default function Navbar() {
  const [show, setShow] = useState(false);
  const { getUserInfo, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setUserInfo(data);
    };
    fetchUserInfo();
  }, [getUserInfo]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="z-50 fixed w-full">
      {/* Nav version mobile */}
      <div className="bg-[#4D148C]   rounded-r shadow xl:hidden flex justify-between w-full p-6 items-center border-b border-transparent sm:border-gray-200 ">
        {/* Mobile Logo */}
        <button className="flex text-white hover:text-indigo-200 focus:outline-none focus:text-indigo-200 justify-between  items-center space-x-3">
          <svg
            width={34}
            height={34}
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z"
              fill="currentColor"
            />
          </svg>
          <p className="text-2xl leading-6  ">Chapchrono</p>
        </button>
        {/* toggler */}
        <div aria-label="toggler" className="flex justify-center items-center">
          <button
            id="open"
            aria-label="open"
            onClick={() => setShow(!show)}
            className={`${
              show ? "" : "hidden"
            } focus:outline-none focus:ring-2 `}
          >
            <svg
              className="text-indigo-200"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 18H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            id="close"
            aria-label="close"
            onClick={() => setShow(!show)}
            className={`${
              show ? "hidden" : ""
            } focus:outline-none focus:ring-2  `}
          >
            <svg
              className="text-indigo-200"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Nav version pc */}
      <div
        id="Main"
        className={`${
          show ? "-translate-x-full" : "translate-x-0 "
        } bg-[#4D148C] transform  xl:translate-x-0 shadow xl:rounded-r fixed h-full  top-22 sm:z-50 z-50 hover:overflow-auto  ease-in-out transition duration-500 flex justify-start items-start w-full sm:w-64 flex-col px-0 pb-24 sm:pb-0`}
      >
        <button className="hidden focus:outline-none hover:text-indigo-200 focus:text-indigo-200 text-white sm:flex justify-start p-6 items-center space-x-0  w-full">
          <img
            src="/logo/logo-no-text.png"
            alt=""
            className="w-[84px] h-[44px]"
            id="logo-no-text"
          />
          <img
            src="/logo/logo-title.png"
            alt=""
            className="w-[204px] h-[54px] mb-3"
          />
        </button>
        {/* Avatar */}
        <div className="w-full sm:px-5 px-10 sm:py-0 py-5">
          <div
            className="px-6 text-indigo-200  w-full bg-[#37145d] rounded-2xl py-2"
            id="avatar"
          >
            <div class="flex flex-col items-center mb-2 -mx-2">
              {userInfo === null ? (
                "ok"
              ) : (
                <img
                  class="object-cover w-24 h-24 mx-2 rounded-full"
                  src={
                    userInfo.imgUrl === null
                      ? "/images/user.jpeg"
                      : userInfo.imgUrl
                  }
                />
              )}
              <h4 class="mx-2 mt-2 font-medium">
                {userInfo === null ? "ok" : userInfo.username}
              </h4>
              <p class="mx-2 mt-1 text-sm font-medium ">
                {userInfo === null ? "ok" : userInfo.email}
              </p>
            </div>
          </div>
        </div>
        {/* Dashboard routes start */}
        <div className="   mt-4 flex flex-col px-6 justify-start items-center w-full   ">
          {/* Dashboard */}
          <button className="focus:outline-none focus:text-white  flex jusitfy-start   hover:text-white  text-indigo-200  rounded py-3  items-center space-x-6 w-full ">
            <svg
              className="fill-stroke "
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base leading-4 border-b border-transparent  hover:border-white focus:border-white  ">
              <Link to="/">Tableau de bord</Link>
            </p>
          </button>
          {/* Order */}
          <button className="focus:outline-none focus:text-white  flex jusitfy-start text-indigo-200 hover:text-white rounded py-3   items-center w-full  space-x-6">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 7L12 13L21 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base text-start leading-4 border-b border-transparent ">
              {userInfo === null ? (
                "ok"
              ) : userInfo.isAdmin === true ? (
                <Link to="/dashboard/admin/all-order">
                  Repartition des commandes
                </Link>
              ) : (
                <Link to={`/dashboard/user/${userInfo._id}/order`} >Mes commandes</Link>
              )}
            </p>
          </button>
          {/* User */}
          <button className="focus:outline-none focus:text-white  flex justify-start items-center space-x-6    text-indigo-200 hover:text-white rounded  py-3    w-full ">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base leading-4 border-b border-transparent  hover:border-white focus:border-white  ">
              {userInfo === null ? (
                "ok"
              ) : userInfo.isAdmin === true ? (
                <Link to="/dashboard/admin/all-user">Utilisateurs</Link>
              ) : (
                <Link to="/dashboard/profile">Profile</Link>
              )}
            </p>
          </button>
          {/* Administration */}
          {userInfo === null ? (
            "ok"
          ) : userInfo.isAdmin === true ? (
            <button className="focus:outline-none focus:text-white  flex justify-start items-center space-x-6 bg-[#37145d] p-1 text-indigo-200 hover:text-white rounded-xl  py-3    w-full ">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34315 18.6569 4 17 4C15.3431 4 14 5.34315 14 7C14 8.65685 15.3431 10 17 10Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-base text-start leading-4 border-b border-transparent   ">
                <Link to="/dashboard/admin/order-administration">
                  {" "}
                  Administration des commandes
                </Link>
              </p>
            </button>
          ) : (
            <></>
          )}
        </div>
        {/* Dashboard routes end  */}
        <div className="px-6 my-4 w-full">
          <hr className="border-indigo-400  w-full" />
        </div>
        <div className="mt-4  px-6 flex justify-start w-full items-start">
          <p className="text-base leading-4 text-indigo-200">Raccourcis</p>
        </div>
        {/* Shortcurts */}
        <div className="  mt-4 flex flex-col px-6 justify-start items-center w-full   ">
          {/* Help */}
          <button className="focus:outline-none focus:text-white  flex jusitfy-start     text-indigo-200 hover:text-white rounded py-3  items-center space-x-6 w-full ">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base leading-4 border-b border-transparent  hover:border-white focus:border-white  ">
              Assistance
            </p>
          </button>
          {/* Logout */}
          <button className="focus:outline-none focus:text-white  flex justify-start items-center space-x-6  hover:text-white   text-indigo-200 hover:text-white rounded  py-3    w-full ">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 8V6C14 5.46957 13.7893 4.96086 13.4142 4.58579C13.0391 4.21071 12.5304 4 12 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H12C12.5304 20 13.0391 19.7893 13.4142 19.4142C13.7893 19.0391 14 18.5304 14 18V16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 12H21M21 12L18 9M21 12L18 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p
              className="text-base leading-4 border-b border-transparent  hover:border-white focus:border-white  "
              onClick={handleLogout}
            >
              Se déconnecter
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
