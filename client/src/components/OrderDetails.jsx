import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:4000/order/${id}`)
      .then((res) => setOrder(res.data));
  }, [id]);

  const { recipient, delivery_person, destination, totalCost } = order;
  return (
    <div>
      <h3>Order Details</h3>
      <p>Recipient: {recipient && recipient.name}</p>
      <p>Delivery Person: {delivery_person && delivery_person.name}</p>
      <p>Destination: {destination}</p>
      <p>Total Cost: {totalCost}</p>
    </div>
  );
};

export default OrderDetails;
