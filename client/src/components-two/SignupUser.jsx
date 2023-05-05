import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field } from "formik";
import * as Yup from "yup";

export default function SignupUser() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [imgUrl, setImgUrl] = useState("");
  const [obj, setobj] = useState({ first: "", two: "", three: "" });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom est obligatoire"),
    lastname: Yup.string().required("Le prénom est obligatoire"),
    username: Yup.string().required("Le nom d'utilisateur est obligatoire"),
    phone: Yup.string().required("Le numéro de téléphone est obligatoire"),
    email: Yup.string()
      .email(`L'adresse email n'est pas valide`)
      .required("L'adresse email est obligatoire"),
    password: Yup.string().required(
      "Le mot de passe doit contenir au moins 4 caractères"
    ),
    imgUrl: Yup.mixed().required("l'image est requise"),
  });

  // const onChangeFile = (e) => {
  //   setImgUrl(e.target.files[0]);
  // };

  const changeOnClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    // formData.append("imgUrl", imgUrl);

    setName("");
    setLastname("");
    setUsername("");
    setPhone("");
    setEmail("");
    setPassword("");

    axios
      .post("http://localhost:4000/user/signup", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(formData);
  };

  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="flex justify-center min-h-screen">
          <div
            class="hidden bg-cover lg:block lg:w-2/5"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
            }}
          ></div>

          <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div class="w-full">
              <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Obtenez Votre Compte Gratuit Dès Maintenant.
              </h1>

              <p class="mt-4 text-gray-500 dark:text-gray-400">
                Commençons par vous préparer afin que vous puissiez vérifier
                votre compte personnel et commencer à configurer votre profil.
              </p>

              <div class="mt-6">
                <h1 class="text-gray-500 dark:text-gray-300">
                  Sélectionnez le type de compte
                </h1>

                <div class="mt-3 md:flex md:items-center md:-mx-2">
                  <button class="flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-lg md:w-auto md:mx-2 focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span class="mx-2">administrateur</span>
                  </button>

                  <button class="flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>

                    <span class="mx-2">client</span>
                  </button>
                </div>
              </div>
              {/* Formulaire Start */}
              <Formik
                initialValues={{
                  name: name,
                  lastname: lastname,
                  username: username,
                  phone: phone,
                  email: email,
                  password: password,
                  //  imgUrl: imgUrl,
                }}
                validationSchema={validationSchema}
                onSubmit={changeOnClick}
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isSubmitting,
                }) => (
                  <form
                    class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
                    encType="multipart/form-data"
                    onSubmit={changeOnClick}
                  >
                    <div>
                      <label
                        class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                        htmlFor="name"
                        enctype
                      >
                        First Name
                      </label>
                      <Field
                        type="text"
                        placeholder="entrez votre nom"
                        name="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        onBlur={handleBlur}
                        class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {touched.name && errors.name && (
                        <div className="w-full border flex  py-1 bg-red-200 text-gray-600 border-red-500 px-6 mt-1 rounded-lg text-sm">
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                        htmlFor="lastname"
                      >
                        Last name
                      </label>
                      <Field
                        type="text"
                        placeholder="entrez votre prenom"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        onBlur={handleBlur}
                        class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {touched.name && errors.lastname && (
                        <div className="w-full border flex  py-1 bg-red-200 text-gray-600 border-red-500 px-6 mt-1 rounded-lg text-sm">
                          {errors.lastname}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <Field
                        type="text"
                        placeholder="choisissez un nom d'utilisateur"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={handleBlur}
                        class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {touched.name && errors.username && (
                        <div className="w-full border flex  py-1 bg-red-200 text-gray-600 border-red-500 px-6 mt-1 rounded-lg text-sm">
                          {errors.username}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                        htmlFor="phone"
                      >
                        Phone number
                      </label>
                      <input
                        type="text"
                        placeholder="XXX-XX-XXXX-XXX"
                        name="phone"
                        value={phone}
                        onBlur={handleBlur}
                        onChange={(e) => setPhone(e.target.value)}
                        class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {touched.phone && errors.phone && (
                        <div className="w-full border flex  py-1 bg-red-200 text-gray-600 border-red-500 px-6 mt-1 rounded-lg text-sm">
                          {errors.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                        htmlFor="email"
                      >
                        Email address
                      </label>
                      <Field
                        type="email"
                        placeholder="johnsnow@example.com"
                        name="email"
                        value={email}
                        onBlur={handleBlur}
                        onChange={(e) => setEmail(e.target.value)}
                        class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {touched.email && errors.email && (
                        <div className="w-full border flex  py-1 bg-red-200 text-gray-600 border-red-500 px-6 mt-1 rounded-lg text-sm">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onBlur={handleBlur}
                        onChange={(e) => setPassword(e.target.value)}
                        class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {touched.password && errors.password && (
                        <div className="w-full border flex  py-1 bg-red-200 text-gray-600 border-red-500 px-6 mt-1 rounded-lg text-sm">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    {/*
                    <div>
                      <label
                        class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                        htmlFor="imgUrl"
                      >
                        img
                      </label>
                      <input
                        type="file"
                        filename="imgUrl"
                        onChange={onChangeFile}
                        required
                        class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {touched.imgUrl && errors.imgUrl && (
                        <div className="w-full border flex  py-1 bg-red-200 text-gray-600 border-red-500 px-6 mt-1 rounded-lg text-sm">
                          {errors.imgUrl}
                        </div>
                      )}
                    </div> */}

                    <button
                      class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <span>Sign Up </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 rtl:-scale-x-100"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
