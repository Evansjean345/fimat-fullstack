import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:4000/order/${id}`)
      .then((res) => setOrder(res.data));
  }, [id]);

  const {
    recipient,
    orderUrl,
    date,
    destination,
    totalCost,
    payement,
    tracking,
    goods_price,
    reception,
    delivery_day,
    delivery_hours,
  } = order;

  return (
    <>
      <div className="flex flex-col h-full  xl:flex-row">
        <div className="xl:w-[17%] w-full">
          <Navbar />
        </div>
        <div className="bg-gray-200 xl:w-[83%] w-full py-4 xl:px-16 px-8 flex flex-col  ">
          <strong className="px-2 py-6 font-mono  text-2xl text-gray-800">
            Facture de la commande{" "}
            <img src="/logo/logo-no-text.png" alt="" className="h-12 mt-4" />
          </strong>
          <div className="flex w-full pb-24 font-mono border border-black px-8 py-16 ">
            <div className="w-1/2 border border-black px-2 py-4">
              {" "}
              <h3>Destinataire</h3>
              <p>nom du destinataire: {recipient && recipient.name}</p>
              <p>numéro du destinataire: {recipient && recipient.phone}</p>
              <p>adresse du destinataire: {recipient && recipient.address}</p>
              <p>Coût Total: {totalCost}</p>
            </div>
            <div className="w-1/2 border border-black px-2 py-4">
              <h3>Details de la facture</h3>
              <p>numero de la commande: {tracking}</p>
              <p>date de la commande: {date}</p>
              <p>moyen de paiyement: {payement}</p>
              <p>Prix de la marchandise : {goods_price}</p>
              <p>Lieu de reception du colis : {reception}</p>
              <p>
                Jour et heure de livraison : {delivery_day} / {delivery_hours} h
              </p>
              <p>Destination: {destination}</p>
              <p>Total Cost: {totalCost}</p>
            </div>
            {orderUrl === null ? (
              <img
                src="/images/order-img.png"
                alt=""
                className="h-24 w-24 ml-4"
              />
            ) : (
              <img src={orderUrl} alt="" className="h-24 w-24" />
            )}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
