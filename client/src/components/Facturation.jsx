import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import { Formik } from "formik";

export default function Facturation() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [totalCost, setTotalCost] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/order/${id}`)
      .then((res) => setOrder(res.data));
  }, [id]);

  const updateOrder = (e) => {
    e.preventDefault();
    const data = {
      totalCost: totalCost,
    };
    axios
      .put(`http://localhost:4000/order/${id}`, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  console.log(order);

  return (
    <>
      <div className="flex flex-col h-full  xl:flex-row">
        <div className="xl:w-[17%] w-full">
          <Navbar />
        </div>
        <div className=" xl:w-[83%] w-full py-4 xl:px-16 px-8 flex flex-col  ">
          <strong className="px-2 sm:py-6 font-mono  text-2xl text-gray-800">
            Gestion de la commande
            <img src="/logo/logo-no-text.png" alt="" className="h-12 mt-4" />
          </strong>
          {/* Administration de la commande */}
          <div className="flex items-center justify-center">
            <div class=" w-full px-8">
              <div class="xl:px-24">
                <div class="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
                  <div class="w-80">
                    <div class="flex items-center">
                      <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800">
                        Information du client
                      </h1>
                    </div>
                    <p class="mt-4 text-sm leading-5 text-gray-600">
                      informations du client ayant passé la commande
                    </p>
                  </div>
                  <div>
                    <div class="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                      <div class="md:w-64">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="firstName"
                        >
                          Nom du client
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.recipient && order.recipient.name}
                        </div>
                      </div>
                      <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="lastName"
                        >
                          Adresse
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.recipient && order.recipient.address}
                        </div>
                      </div>
                    </div>
                    <div class="md:flex items-center lg:ml-24 mt-8">
                      <div class="md:w-64">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="emailAddress"
                        >
                          Numéro de téléphone
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.recipient && order.recipient.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
                  <div class="w-80">
                    <div class="flex items-center">
                      <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800">
                        Details de la commande
                      </h1>
                    </div>
                    <p class="mt-4 text-sm leading-5 text-gray-600">
                      Informations relatives à la reception de la commande
                    </p>
                  </div>
                  <div>
                    <div class="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                      <div class="md:w-64">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="reception"
                        >
                          Lieu de reception
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.reception}
                        </div>
                      </div>
                      <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="packs"
                        >
                          Nombres de packs
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.packs}
                        </div>
                      </div>
                    </div>
                    <div class="md:flex items-center lg:ml-24 mt-8">
                      <div class="md:w-64">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="goods_price"
                        >
                          Prix de la marchandise
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.goods_price}
                        </div>
                      </div>
                      <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="comments"
                        >
                          Commentaire
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.comments}
                        </div>
                      </div>
                    </div>

                    <div class="md:flex items-center lg:ml-24 mt-8">
                      <div class="md:w-64">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="goods_price"
                        >
                          Date de la commande
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.date}
                        </div>
                      </div>
                      <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="comments"
                        >
                          numero de la commande
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.tracking}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
                  <div class="w-80">
                    <div class="flex items-center">
                      <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800">
                        Details de la livraison
                      </h1>
                    </div>
                    <p class="mt-4 text-sm leading-5 text-gray-600">
                      informations relatives à la livraison du colis
                    </p>
                  </div>
                  <div>
                    <div class="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                      <div class="md:w-64">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="payement"
                        >
                          Moyen de paiement
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.payement}
                        </div>
                      </div>
                      <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="transport"
                        >
                          Type de transport
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.transport}
                        </div>
                      </div>
                    </div>
                    <div class="md:flex items-center lg:ml-24 mt-8">
                      <div class="md:w-64">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="destination"
                        >
                          Destination
                        </label>
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.destination}
                        </div>
                      </div>
                      <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                        <label
                          class="text-sm leading-none text-gray-800"
                          id="altPhone"
                        ></label>
                        Jour et Heure de la livraison
                        <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                          {order.delivery_day} / {order.delivery_hours} h
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Formik>
                  {({ errors, touched, isSubmitting }) => (
                    <form>
                      <div class="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
                        <div class="w-80">
                          <div class="flex items-center">
                            <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800">
                              Facture
                            </h1>
                          </div>
                          <p class="mt-4 text-sm leading-5 text-gray-600">
                            Fixer le montant de la commande
                          </p>
                        </div>
                        <div>
                          <div class="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                            <div class="md:w-64">
                              <label
                                class="text-sm leading-none text-gray-800"
                                id="totalCost"
                              >
                                Coût Total
                              </label>
                              {order.totalCost === undefined ? (
                                <input
                                  type="text"
                                  name="totalCost"
                                  placeholder={
                                    order.totalCost === undefined
                                      ? "fixer le prix "
                                      : order.totalCost
                                  }
                                  onChange={(e) => {
                                    setTotalCost(e.target.value);
                                  }}
                                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                                />
                              ) : (
                                <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                                  {order.totalCost}
                                </div>
                              )}
                            </div>
                            <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                              <label
                                class="text-sm leading-none text-gray-800"
                                id="transport"
                              >
                                Statut de la commande
                              </label>
                              <div className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800">
                                {order.status === false ? (
                                  <div className="text-red-600 font-bold">
                                    en attente de facturation
                                  </div>
                                ) : (
                                  <div className="text-green-600 font-bold">
                                    Facturé réglée
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="md:flex items-center lg:ml-24 mt-8">
                            <div class="md:w-64">
                              <div
                                onClick={() => {
                                  updateOrder();
                                  window.location.reload();
                                }}
                                className="w-full bg-indigo-700 hover:bg-white hover:scale-75 cursor-pointer hover:text-indigo-700 hover:border hover:border-indigo-700 transition-all p-3 mt-3 text-white border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none"
                              >
                                <button>soummettre</button>
                              </div>
                            </div>
                            <div class="md:w-64 md:ml-12 md:mt-0 mt-4">
                              <div className="w-full p-3 mt-3 cursor-pointer hover:text-gray-900 transition-all bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-blue-600">
                                <Link
                                  to={`/dashboard/admin/order/details/${id}`}
                                >
                                  {order.tracking}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
