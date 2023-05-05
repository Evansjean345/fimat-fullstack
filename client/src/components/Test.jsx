import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { Link, useParams } from "react-router-dom";

export default function Test() {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/user/file/${id}`)
      .then((res) => {
       setImageUrl(res.data)
      })
      .catch((err) => console.log(err));
  }, [id])

  console.log(imageUrl);
  return (
    <>
      <img src={imageUrl} alt="" className="h-1/2 w-1/2" />
    </>
  );
}
