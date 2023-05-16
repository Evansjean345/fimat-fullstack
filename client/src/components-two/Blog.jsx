import React, { useState, useEffect, useContext } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import * as Yup from "yup";
import axios from "axios";
import { Formik } from "formik";
import { AuthContext } from "../services/account.service";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Blog = () => {
  const { getUserInfo } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setUserInfo(data);
    };
    fetchUserInfo();
  }, [getUserInfo]);

  //user Information
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [profile, setProfile] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImgUrl(file);
    setProfile(url);
  };

  // updateUser
  const updateUser = (e) => {
    e.preventDefault();
    const data = {
      name: name !== "" ? name : userInfo.name,
      lastname: lastname !== "" ? lastname : userInfo.lastname,
      username: username !== "" ? username : userInfo.username,
      email: email !== "" ? email : userInfo.email,
      password: password !== "" ? password : userInfo.password,
      imgUrl: imgUrl !== null ? imgUrl : userInfo.imgUrl,
    };

    axios
      .put(`http://localhost:4000/user/${userInfo._id}`, data)
      .then((res) => {
        handleOpen();
        console.log(res);
      })
      .catch((error) => {
        handleError();
        console.log(error);
      });
  };

  const handleOpen = () => setOpen(!open);
  const handleError = () => setError(!error);

  return (
    <>
      <Formik>
        {({ erros, touched, handleChange, handleBlur, isSubmitting }) => (
          <form id="login" className="py-12">
            <div className="bg-white p-12 rounded-xl">
              <div className="container mx-auto bg-white dark:bg-gray-800 rounded">
                <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
                  <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                    <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
                      Profile
                    </p>
                    <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={16}
                        height={16}
                      >
                        <path
                          className="heroicon-ui"
                          d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mx-auto">
                  <div className="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
                    <div className="rounded relative mt-8 h-48">
                      <img
                        src={userInfo === null ? "/images/user.jpeg" : userInfo.imgUrl}
                        alt
                        className="w-full h-full object-cover rounded absolute shadow"
                      />
                      <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                      {/*
                    <div className="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
                      <p className="text-xs text-gray-100">
                        Modifier la photo de profile
                      </p>
                      <div className="ml-2 text-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-edit"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                          <line x1={16} y1={5} x2={19} y2={8} />
                        </svg>
                      </div>
                    </div>
                    <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                      <img
                        src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg"
                        alt
                        className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                      />
                      <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                      <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-edit"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                          <line x1={16} y1={5} x2={19} y2={8} />
                        </svg>
                        <p className="text-xs text-gray-100">Modifier</p>
                      </div>
                    </div> */}
                    </div>
                    <div className="mt-16 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
                      <label
                        htmlFor="username"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        Nom d'utilisateur
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                        placeholder={userInfo === null ? "" : userInfo.username}
                      />
                    </div>
                    {/*
                   <div className="mt-8 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full">
                    <label
                      htmlFor="imgUrl"
                      className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                    >
                      Photo de profile
                    </label>
                  </div>
                  <div className="col-span-full">
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="imgUrl"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="imgUrl"
                              name="imgUrl"
                              type="file"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
              <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
                <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                  <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                    <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
                      Informations personnelles
                    </p>
                    <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={16}
                        height={16}
                      >
                        <path
                          className="heroicon-ui"
                          d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mx-auto pt-4">
                  <div className="container mx-auto">
                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                      <label
                        htmlFor="name"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        Nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                        placeholder={userInfo === null ? "" : userInfo.name}
                      />
                    </div>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                      <label
                        htmlFor="lastname"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastName"
                        value={lastname}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setLastname(e.target.value);
                        }}
                        className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                        placeholder={userInfo === null ? "" : userInfo.lastname}
                      />
                    </div>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                      <label
                        htmlFor="email"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        Email
                      </label>
                      <div className="border border-green-400 shadow-sm rounded flex">
                        <div className="px-4 py-3 dark:text-gray-100 flex items-center border-r border-green-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-mail"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x={3} y={5} width={18} height={14} rx={2} />
                            <polyline points="3 7 12 13 21 7" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400"
                          placeholder={userInfo === null ? "" : userInfo.email}
                        />
                      </div>
                      <div className="flex justify-between items-center pt-1 text-green-400">
                        <p className="text-xs">Addresse mail utilisée</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={16}
                          height={16}
                        >
                          <path
                            className="heroicon-ui"
                            d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0
                              0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                            stroke="currentColor"
                            strokeWidth="0.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                      <div className="flex items-center pb-2">
                        <label
                          htmlFor="password"
                          className="text-sm font-bold text-gray-800 dark:text-gray-100"
                        >
                          Mot de passe
                        </label>
                        <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={16}
                            height={16}
                          >
                            <path
                              className="heroicon-ui"
                              d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        id="password"
                        className="bg-transparent border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                        placeholder=""
                      />
                      <div className="flex justify-between items-center pt-1 text-red-400">
                        <p className="text-xs">Mot de passe</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-x-circle"
                        >
                          <circle cx={12} cy={12} r={10} />
                          <line x1={15} y1={9} x2={9} y2={15} />
                          <line x1={9} y1={9} x2={15} y2={15} />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container mx-auto w-11/12 xl:w-full">
                <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
                  <button className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4">
                    <Link to="/">Annulé</Link>
                  </button>
                  <button
                    className="bg-indigo-700 hover:text-indigo-700 hover:bg-white focus:outline-none transition duration-150 ease-in-out hover:border hover:border-indigo-700 rounded text-white px-8 py-2 text-sm"
                    onClick={updateUser}
                  >
                    enregistré
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      {/* Action réussie */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Vos informations ont bien étées mise à jour</DialogHeader>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen();
              window.location.reload();
            }}
          >
            <span>Fermer</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* Action Annulée*/}
      <Dialog open={error} handler={handleError}>
        <DialogHeader>Quelque chose s'est mal passée </DialogHeader>
        <DialogBody divider className="text-semibold">
          Peut être le Nom d'utilisateur , le numéro de téléphone ou l'email que
          vous essayez d'utilisée dont déjà pris
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="red" onClick={handleError}>
            <span>Fermer</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default Blog;
