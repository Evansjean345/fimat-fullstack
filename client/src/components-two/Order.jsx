import React, { useState, useEffect, useContext } from "react";
import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import "../App.css";
import axios from "axios";
import { AuthContext } from "../services/account.service";

export default function Order() {
  ///userId information
  const { getUserInfo } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  //modal
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setUser(data._id);
    };
    fetchUserInfo();
  }, [getUserInfo]);

  //utils
  const [toggle, setToggle] = React.useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [date, setDate] = useState(false);
  const [hour, setHour] = useState(0);
  ///dayChange
  const [day1, setday1] = useState(false);
  const [day2, setday2] = useState(false);
  const [day3, setday3] = useState(false);
  ///transportChange
  const [tp1, setTp1] = useState(false);
  const [tp2, setTp2] = useState(false);
  const [tp3, setTp3] = useState(false);
  const [tp4, setTp4] = useState(false);
  ///PayChange
  const [pay1, setPay1] = useState(false);
  const [pay2, setPay2] = useState(false);
  const [pay3, setPay3] = useState(false);
  const [pay4, setPay4] = useState(false);
  const [pay5, setPay5] = useState(false);

  ///////formik Sub
  const [recipient, setRecipient] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [destination, setDestination] = useState("");
  const [payement, setPayement] = useState("");
  const [packs, setPacks] = useState("");
  const [goods_price, setGoods_price] = useState("");
  const [reception, setReception] = useState("");
  const [comments, setComments] = useState("");
  const [transport, setTransport] = useState("");
  const [orderUrl, setOrderUrl] = useState("");
  const [delivery_day, setDelivery_day] = useState("");
  const [delivery_hours, setDelivery_hours] = useState("");

  //Yup validation
  const validationSchema = Yup.object().shape({
    recipient: Yup.object().shape({
      name: Yup.string().required("le nom est obligatoire"),
      phone: Yup.string().required("le numéro est obligatoire"),
      address: Yup.string().required("l'addresse est obligatoire"),
    }),
    destination: Yup.string().required("la destination est obligatoire"),
    payement: Yup.string().required("le moyen de payement est requis"),
    packs: Yup.string().required("le nombre de colis est requis"),
    goods_price: Yup.string().required("le prix de la marchandise est requis"),
    reception: Yup.string().required(
      "le lieu de reception du colis est requis"
    ),
    comments: Yup.string().required(
      "ajoutez des informations concernant le colis"
    ),
    transport: Yup.string().required("le moyen de transport est requis"),
    orderUrl: Yup.mixed().required(),
    delivery_day: Yup.string().required("le jour de la livraison est requis"),
    delivery_hours: Yup.string().required("l'heure de la livraison est requis"),
    user: Yup.string().required(),
  });

  //ChangeFile and Change Hour function

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setOrderUrl(file);
    setImgUrl(url);
  };

  const handleHourChange = (e) => {
    const selectedHour = e.target.value;
    setDelivery_hours(e.target.value);
    setHour(selectedHour);
  };

  const handleDayChange = (dayValue) => {
    setDelivery_day(dayValue);
  };

  const resetDay = () => {
    setDelivery_day("");
  };

  const handleTransportChange = (value) => {
    setTransport(value);
  };

  const handlePayementChange = (value) => {
    setPayement(value);
  };

  const handleOpen = () => setOpen(!open);
  const handleError = () => setError(!error);

  //submit click function

  const changeOnclick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("recipient[name]", recipient.name);
    formData.append("recipient[phone]", recipient.phone);
    formData.append("recipient[address]", recipient.address);
    formData.append("destination", destination);
    formData.append("payement", payement);
    formData.append("packs", packs);
    formData.append("goods_price", goods_price);
    formData.append("reception", reception);
    formData.append("comments", comments);
    formData.append("transport", transport);
    formData.append("orderUrl", orderUrl);
    formData.append("delivery_day", delivery_day);
    formData.append("delivery_hours", delivery_hours);
    formData.append("user", user);
    console.log("formuser", user);

    axios
      .post("http://localhost:4000/order/", formData)
      .then((res) => {
        console.log(res);
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
        handleError();
      });

    console.log(formData);
  };

  const selectedTime = new Date();
  selectedTime.setHours(hour);
  selectedTime.setMinutes(0);
  selectedTime.setSeconds(0);

  return (
    <>
      <div className="flex items-center justify-center py-12 bg-gray-200">
        <div class="xl:w-10/12 w-full px-6">
          <div class="">
            {/*Modal information Start*/}
            <div
              class={
                toggle
                  ? "hidden"
                  : "px-5 py-4 bg-red-100 rounded-lg flex items-center justify-between mt-7"
              }
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 9.99999H20C20.2652 9.99999 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 9.99999 4 9.99999H5V8.99999C5 8.08074 5.18106 7.17049 5.53284 6.32121C5.88463 5.47193 6.40024 4.70026 7.05025 4.05025C7.70026 3.40023 8.47194 2.88462 9.32122 2.53284C10.1705 2.18105 11.0807 1.99999 12 1.99999C12.9193 1.99999 13.8295 2.18105 14.6788 2.53284C15.5281 2.88462 16.2997 3.40023 16.9497 4.05025C17.5998 4.70026 18.1154 5.47193 18.4672 6.32121C18.8189 7.17049 19 8.08074 19 8.99999V9.99999ZM17 9.99999V8.99999C17 7.67391 16.4732 6.40214 15.5355 5.46446C14.5979 4.52678 13.3261 3.99999 12 3.99999C10.6739 3.99999 9.40215 4.52678 8.46447 5.46446C7.52678 6.40214 7 7.67391 7 8.99999V9.99999H17ZM11 14V18H13V14H11Z"
                      fill="red"
                    />
                  </svg>
                </div>

                <p class="text-sm text-red-800 pl-3 font-semibold">
                  Notez Bien : Pour pouvoir passer une commande vous remplir
                  tous les champs du formulaire sans exection
                </p>
              </div>
              <button
                onClick={() => {
                  setToggle(true);
                }}
                class="md:block  focus:outline-none focus:ring-2 focus:ring-red-700 rounded"
              >
                <svg
                  aria-label="Close this banner"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8337 5.34166L14.6587 4.16666L10.0003 8.825L5.34199 4.16666L4.16699 5.34166L8.82533 10L4.16699 14.6583L5.34199 15.8333L10.0003 11.175L14.6587 15.8333L15.8337 14.6583L11.1753 10L15.8337 5.34166Z"
                    fill="red"
                  />
                </svg>
              </button>
            </div>
            {/* Client */}
            <Formik
              validationSchema={validationSchema}
              onSubmit={changeOnclick}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <form id="myForm">
                  <div className="mt-16 bg-white w-24 h-10 rounded-lg font-semibold text-[#db6013] flex items-center justify-center">
                    Le client
                  </div>
                  <div class="lg:flex  py-8 mt-2 bg-white  pb-16 rounded-lg">
                    <div className="w-full flex flex-col ">
                      <div className="flex flex-col">
                        <div className="sm:w-2/4 w-3/4 sm:m-6 m-4 flex">
                          <Input
                            variant="standard"
                            label="nom et prénoms"
                            color="indigo"
                            size="lg"
                            type="text"
                            onChange={(e) => {
                              const value = e.target.value;
                              setRecipient((prevRecipient) => ({
                                ...prevRecipient,
                                name: value,
                              }));
                            }}
                            name="recipient.name"
                            icon={
                              <img
                                src="/images/utilisateur.png"
                                alt=""
                                className="h-4 w-4"
                              />
                            }
                          />
                        </div>
                        <div className="sm:w-2/4 w-3/4 sm:m-6 m-4 flex hidden">
                          <Input
                            variant="standard"
                            size="lg"
                            type="text"
                            name="user"
                            value={user}
                            onChange={changeOnclick}
                            icon={
                              <img
                                src="/images/utilisateur.png"
                                alt=""
                                className="h-4 w-4"
                              />
                            }
                          />
                        </div>
                        <div className="sm:inline-flex m-6 sm:gap-x-6  sm:space-x-6">
                          <div className="sm:w-1/3">
                            <Input
                              variant="standard"
                              label="numéro de téléphone"
                              color="indigo"
                              size="lg"
                              onChange={(e) => {
                                const value = e.target.value;
                                setRecipient((prevRecipient) => ({
                                  ...prevRecipient,
                                  phone: value,
                                }));
                              }}
                              type="text"
                              name="recipient.phone"
                              icon={
                                <img
                                  src="/images/telephone.png"
                                  alt=""
                                  className="h-4 w-4"
                                />
                              }
                            />
                          </div>
                          <div className="sl:w-1/3 mt-2 sm:mt-0">
                            <Input
                              variant="standard"
                              label="addresse"
                              color="indigo"
                              size="lg"
                              onChange={(e) => {
                                const value = e.target.value;
                                setRecipient((prevRecipient) => ({
                                  ...prevRecipient,
                                  address: value,
                                }));
                              }}
                              type="text"
                              name="recipient.address"
                              onBlur={handleBlur}
                              icon={
                                <img
                                  src="/images/adresse-du-domicile.png"
                                  alt=""
                                  className="h-5 w-5"
                                />
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* commnade */}
                  <div className="mt-16 bg-white w-36 h-10 rounded-lg font-semibold text-[#db6013] flex items-center justify-center">
                    La commande
                  </div>
                  <div class="mt-2 lg:flex w-full py-8 bg-white pb-16 rounded-lg">
                    <div className="w-full flex flex-col ">
                      <div className="flex flex-col ">
                        <div className="sm:inline-flex m-6 sm:gap-x-6  sm:space-x-6">
                          <div className="sm:w-1/3 w-4/4">
                            <Input
                              variant="standard"
                              label="lieu de réception"
                              color="indigo"
                              size="lg"
                              onChange={(e) => {
                                setReception(e.target.value);
                              }}
                              type="text"
                              name="reception"
                              onBlur={handleBlur}
                              icon={
                                <img
                                  src="/images/boite.png"
                                  alt=""
                                  className="h-4 w-4"
                                />
                              }
                            />
                          </div>
                          <div className="sm:w-1/3 w-4/4  mt-2 sm:mt-0">
                            <Input
                              variant="standard"
                              label="montant de la marchandise"
                              color="indigo"
                              size="lg"
                              onChange={(e) => {
                                setGoods_price(e.target.value);
                              }}
                              type="text"
                              name="goods_price"
                              onBlur={handleBlur}
                              icon={
                                <img
                                  src="/images/pieces-de-monnaie.png"
                                  alt=""
                                  className="h-5 w-5"
                                />
                              }
                            />
                          </div>
                          <div className="sm:w-1/3 w-4/4  mt-2 sm:mt-0">
                            <Input
                              variant="standard"
                              label="nombre de packs"
                              color="indigo"
                              size="lg"
                              onChange={(e) => {
                                setPacks(e.target.value);
                              }}
                              type="text"
                              name="packs"
                              onBlur={handleBlur}
                              icon={
                                <img
                                  src="/images/boite-ouverte.png"
                                  alt=""
                                  className="h-5 w-5"
                                />
                              }
                            />
                          </div>
                        </div>
                        <div className="sm:inline-flex  m-6 sm:gap-x-6  sm:space-x-6">
                          <div className="sm:w-1/3 w-3/4 ">
                            <Input
                              label="photo de l'article"
                              color="orange"
                              variant="outline"
                              size="lg"
                              type="file"
                              filename="orderUrl"
                              onChange={handleFileChange}
                              className="file:rounded-lg file:border-0 file:font-semibold file:bg-[#f9e2d3] file:mr-8 file:text-[#db6013]"
                            />
                            {imgUrl && (
                              <img src={imgUrl} alt="" className="p-6" />
                            )}
                          </div>
                          <div className="sm:w-1/3 ">
                            <Input
                              variant="standard"
                              label="commentaire"
                              color="indigo"
                              size="lg"
                              onChange={(e) => {
                                setComments(e.target.value);
                              }}
                              type="text"
                              name="comments"
                              onBlur={handleBlur}
                              icon={
                                <img
                                  src="/images/bulle.png"
                                  alt=""
                                  className="h-4 w-4"
                                />
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* La livraison */}
                  <div className="mt-16 bg-white w-36 h-10 rounded-lg font-semibold text-[#db6013] flex items-center justify-center">
                    La livraison
                  </div>
                  <div class="mt-2 lg:flex w-full py-8 bg-white pb-16 rounded-lg">
                    <div className="w-full flex flex-col ">
                      {/* Transport */}
                      <div className="sm:inline-flex w-full sm:pt-16 pt-8 sm:px-24 px-8">
                        <div className="sm:w-[30%] font-semibold inline-flex gap-6">
                          <img
                            src="/images/voiture-avant.png"
                            alt=""
                            className="h-5 w-5"
                          />
                          Type de livraison
                        </div>
                        <div className="sm:w-[70%] mt-8 sm:mt-0 inline-flex  sm:gap-28 gap-10">
                          <img
                            src="/images/marcher.png"
                            alt=""
                            className={
                              tp1
                                ? "h-6 w-6 cursor-pointer bg-[#db6013] rounded-full p-1"
                                : "h-6 w-6 cursor-pointer"
                            }
                            onClick={() => {
                              handleTransportChange("à pied");
                              setTp1(!tp1);
                              setTp2(false);
                              setTp3(false);
                              setTp4(false);
                            }}
                          />
                          <img
                            src="/images/livreur.png"
                            alt=""
                            className={
                              tp2
                                ? "h-6 w-6 cursor-pointer bg-[#db6013] rounded-full p-1"
                                : "h-6 w-6 cursor-pointer"
                            }
                            onClick={() => {
                              handleTransportChange("à moto");
                              setTp2(!tp2);
                              setTp1(false);
                              setTp3(false);
                              setTp4(false);
                            }}
                          />
                          <img
                            src="/images/voiture.png"
                            alt=""
                            className={
                              tp3
                                ? "h-6 w-6 cursor-pointer bg-[#db6013] rounded-full p-1"
                                : "h-6 w-6 cursor-pointer"
                            }
                            onClick={() => {
                              handleTransportChange("en voiture");
                              setTp3(!tp3);
                              setTp2(false);
                              setTp1(false);
                              setTp4(false);
                            }}
                          />

                          <img
                            src="/images/camion.png"
                            alt=""
                            className={
                              tp4
                                ? "h-6 w-6 cursor-pointer bg-[#db6013] rounded-full p-1"
                                : "h-6 w-6 cursor-pointer"
                            }
                            onClick={() => {
                              handleTransportChange("en camion");
                              setTp4(!tp4);
                              setTp3(false);
                              setTp2(false);
                              setTp1(false);
                            }}
                          />
                        </div>
                      </div>
                      {/* Date */}
                      <div className="sm:inline-flex w-full sm:pt-16 pt-8 sm:px-24 px-8">
                        <div className="sm:w-[30%] font-semibold inline-flex gap-6">
                          <img
                            src="/images/calendrier.png"
                            alt=""
                            className="h-5 w-5"
                          />
                          Date de livraison
                        </div>
                        <div className="sm:w-[70%] mt-8 sm:mt-0 sm:inline-flex sm:flex-row flex flex-col  sm:gap-6 gap-4">
                          <Button
                            alt=""
                            size="sm"
                            className={
                              day1
                                ? "focus:bg-white scale-75 focus:text-[#db6013] focus:border-[#db6013] focus:border cursor-pointer flex items-center justify-center rounded-2xl bg-[#db6013]"
                                : "focus:bg-white focus:text-[#db6013] focus:border-[#db6013] focus:border cursor-pointer flex items-center justify-center rounded-2xl bg-[#db6013]"
                            }
                            onClick={() => {
                              handleDayChange("Aujourd'hui");
                              setday1(!day1);
                              setday2(false);
                              setday3(false);
                              setDate(false);
                            }}
                          >
                            Aujoud'hui
                          </Button>
                          <Button
                            alt=""
                            size="sm"
                            className={
                              day2
                                ? "focus:bg-white scale-75 focus:text-[#db6013] focus:border-[#db6013] focus:border cursor-pointer flex items-center justify-center rounded-2xl bg-[#db6013]"
                                : "focus:bg-white focus:text-[#db6013] focus:border-[#db6013] focus:border cursor-pointer flex items-center justify-center rounded-2xl bg-[#db6013]"
                            }
                            onClick={() => {
                              handleDayChange("Demain");
                              setday2(!day2);
                              setday1(false);
                              setday3(false);
                              setDate(false);
                            }}
                          >
                            demain
                          </Button>
                          <Button
                            alt=""
                            size="sm"
                            className={
                              day3
                                ? "focus:bg-white scale-75 focus:text-[#db6013] focus:border-[#db6013] focus:border cursor-pointer flex items-center justify-center rounded-2xl bg-[#db6013]"
                                : "focus:bg-white focus:text-[#db6013] focus:border-[#db6013] focus:border cursor-pointer flex items-center justify-center rounded-2xl bg-[#db6013]"
                            }
                            onClick={() => {
                              handleDayChange("Après-demain");
                              setday3(!day3);
                              setday2(false);
                              setday1(false);
                              setDate(false);
                            }}
                          >
                            Après-demain
                          </Button>
                          <Button
                            alt=""
                            size="sm"
                            className="focus:bg-white focus:text-[#db6013] focus:border-[#db6013] focus:border cursor-pointer flex items-center justify-center rounded-2xl bg-[#db6013]"
                            onClick={() => {
                              setDate(!date);
                              setday1(false);
                              setday2(false);
                              setday3(false);
                              resetDay();
                            }}
                          >
                            Choisir une date
                          </Button>
                        </div>
                      </div>
                      {date && (
                        <div className="w-3/4 sm:flex sm:flex-row flex-col h-2 sm:px-24 px-10 font-semibold  sm:py-16 py-8 ">
                          <div className="py-4 sm:py-0">
                            {" "}
                            Touchez l'icône du calendrier pour choisr la date :
                          </div>
                          <Input
                            type="date"
                            variant="outlined"
                            className=" sm:px-12  px-12 font-mono font-semibold border-4 "
                            name="delivery_day"
                            value={delivery_day}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setDelivery_day(e.target.value);
                            }}
                          />
                        </div>
                      )}
                      {/* Hours */}
                      <div
                        className={
                          date
                            ? "sm:inline-flex w-full sm:pt-16 pt-40 sm:px-34 px-8"
                            : "sm:inline-flex w-full sm:pt-16 pt-8 sm:px-24 px-8"
                        }
                      >
                        <div className="sm:w-[30%] font-semibold inline-flex gap-6">
                          <img
                            src="/images/horloge-murale.png"
                            alt=""
                            className="h-5 w-5"
                          />
                          Heure de la livraison
                        </div>
                        <div className="sm:w-[70%] mt-8 sm:mt-0 sm:inline-flex sm:flex-row flex flex-col  sm:gap-6 gap-4">
                          <Button
                            alt=""
                            size="sm"
                            className="w-1/2 cursor-pointer rounded-2xl bg-[#db6013]"
                          >
                            {selectedTime.toLocaleTimeString()}
                          </Button>
                          <input
                            type="range"
                            className="w-3/4 cursor-pointer rounded-full "
                            value={hour}
                            id="range"
                            max={24}
                            min={0}
                            onChange={handleHourChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Le payement */}
                  <div className="mt-16 bg-white w-36 h-10 rounded-lg font-semibold text-[#db6013] flex items-center justify-center">
                    Le payement
                  </div>
                  <div class="mt-2 lg:flex w-full py-8 bg-white pb-16 rounded-lg">
                    <div className="w-full flex flex-col ">
                      {/* Payement Method */}
                      <div className="sm:inline-flex w-full sm:pt-16 pt-8 sm:px-24 px-8">
                        <div className="sm:w-[30%] font-semibold inline-flex gap-6">
                          <img
                            src="/images/paiement-securise.png"
                            alt=""
                            className="h-6 w-6"
                          />
                          Moyen de paiement
                        </div>
                        <div className="sm:w-[70%] mt-8 sm:mt-0 sm:inline-flex sm:flex-row flex flex-col  sm:gap-6 gap-4">
                          <img
                            src="/logo/Moov_africa_logo.png"
                            alt=""
                            className={
                              pay1
                                ? "h-[48px] w-[119px]  cursor-pointer shadow-2xl scale-75 hover:shadow-2xl  focus:scale-75 transition-all object-cover"
                                : "h-[48px] w-[119px]  cursor-pointer hover:shadow-2xl hover:scale-75  focus:scale-75 transition-all object-cover"
                            }
                            onClick={() => {
                              handlePayementChange("MOOV-africa");
                              setPay1(!pay1);
                              setPay2(false);
                              setPay3(false);
                              setPay4(false);
                              setPay5(false);
                            }}
                          />
                          <img
                            src="/logo/MTN-1.jpg"
                            alt=""
                            className={
                              pay2
                                ? "h-[48px] w-[119px]  cursor-pointer shadow-2xl scale-75 hover:shadow-2xl  focus:scale-75 transition-all object-cover"
                                : "h-[48px] w-[119px]  cursor-pointer hover:shadow-2xl hover:scale-75  focus:scale-75 transition-all object-cover"
                            }
                            onClick={() => {
                              handlePayementChange("MTN-momo");
                              setPay2(!pay2);
                              setPay1(false);
                              setPay3(false);
                              setPay4(false);
                              setPay5(false);
                            }}
                          />
                          <img
                            src="/logo/orange-money.jpg"
                            alt=""
                            className={
                              pay3
                                ? "h-[48px] w-[119px]  cursor-pointer shadow-2xl scale-75 hover:shadow-2xl  focus:scale-75 transition-all object-cover"
                                : "h-[48px] w-[119px]  cursor-pointer hover:shadow-2xl hover:scale-75  focus:scale-75 transition-all object-cover"
                            }
                            onClick={() => {
                              handlePayementChange("ORANGE-money");
                              setPay3(!pay3);
                              setPay1(false);
                              setPay2(false);
                              setPay4(false);
                              setPay5(false);
                            }}
                          />
                          <img
                            src="/logo/gtbBank.png"
                            alt=""
                            className={
                              pay4
                                ? "h-[48px] w-[119px]  cursor-pointer shadow-2xl scale-75 hover:shadow-2xl  focus:scale-75 transition-all "
                                : "h-[48px] w-[119px]  cursor-pointer hover:shadow-2xl hover:scale-75  focus:scale-75 transition-all"
                            }
                            onClick={() => {
                              handlePayementChange("GTBank");
                              setPay4(!pay4);
                              setPay1(false);
                              setPay3(false);
                              setPay2(false);
                              setPay5(false);
                            }}
                          />
                          <img
                            src="/logo/cashOndelivery.png"
                            alt=""
                            className={
                              pay5
                                ? "h-[48px] w-[119px]  cursor-pointer shadow-2xl scale-75 hover:shadow-2xl focus:scale-75 transition-all"
                                : "h-[48px] w-[119px]  cursor-pointer hover:shadow-2xl hover:scale-75  focus:scale-75 transition-all"
                            }
                            onClick={() => {
                              handlePayementChange("à-la-Livraison");
                              setPay5(!pay5);
                              setPay1(false);
                              setPay3(false);
                              setPay2(false);
                              setPay4(false);
                            }}
                          />
                        </div>
                      </div>
                      {/* La destination */}
                      <div className="sm:inline-flex w-full sm:pt-16 pt-8 sm:px-24 px-8">
                        <div className="sm:w-[30%] font-semibold inline-flex gap-6 sm:mt-4">
                          <img
                            src="/images/lieu.png"
                            alt=""
                            className="h-6 w-6"
                          />
                          Lieu de Livraison
                        </div>
                        <div className="sm:w-[70%] mt-8 sm:mt-0 sm:inline-flex sm:flex-row flex flex-col  sm:gap-6 gap-4">
                          <Input
                            variant="static"
                            color="indigo"
                            size="lg"
                            onChange={(e) => {
                              setDestination(e.target.value);
                            }}
                            type="text"
                            name="destination"
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Soumission */}
                  <button
                    type="button"
                    onClick={changeOnclick}
                    className="mt-8 hover:bg-gray-200 hover:text-[#db6013] cursor-pointer transition-all hover:scale-95 hover:border-[#db6013] hover:border-2 w-44 h-14 rounded-lg font-semibold text-white bg-[#db6013] flex items-center justify-center"
                  >
                    Passer la commande
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {/* commande confirmée */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Votre commande a bien été enregistrée</DialogHeader>
        <DialogBody divider className="text-semibold">
          Merci pour votre confiance l'equipe Chapchrono vous remercie pour
          votre confiance nous la traiterons dans les plus brefs delais
        </DialogBody>
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
      {/* commande refusée*/}
      <Dialog open={error} handler={handleError}>
        <DialogHeader>Nous ne pouvons traitez votre commande</DialogHeader>
        <DialogBody divider className="text-semibold">
          Veuillez renseigner tous les champs avant de pouvoir passer une
          commande , l'équipe Chapchrono vous remercie de votre compréhension
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="red" onClick={handleError}>
            <span>Fermer</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
