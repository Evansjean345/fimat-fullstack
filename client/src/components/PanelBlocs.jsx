import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PanelBlocs() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    function fetchData() {
      const response1 = axios
        .get("http://localhost:4000/order/")
        .then((res) => setData1(res.data));
      const response2 = axios
        .get("http://localhost:4000/user/")
        .then((res) => setData2(res.data));
    }

    fetchData();
  }, []);

  const valid = data1.filter((item) => item.status === true);
  const invalid = data1.filter((item) => item.status === false);
  const validuser = data2.filter((item) => item.isAdmin === false);

  return (
    <div className=" py-12 rounded-xl p-12 bg-[#1507231a]">
      <div>
        <div className="flex md:flex-row  md:flex-nowrap flex-wrap flex-col w-full h-full md:space-x-12 md:space-y-0 space-y-12 rounded-xl p-12">
          {/* Panel 1 */}
          <div className="md:w-1/3 w-full bg-white flex justify-center items-center rounded-xl space-x-1 sm:space-x-4 lg:space-x-8 py-8 px-5 h-44">
            <img src="/images/order-1.png" alt="" className="w-16 h-16 mt-2" />
            <div>
              <p className="mb-2 font-semibold font-mono text-sm">
                Nombres total de livraisons
              </p>
              <strong className="pl-2 text-xl font-mono text-[#5d6bd1]">
                {data1.length}
              </strong>
            </div>
          </div>
          {/* Panel 2 */}
          <div className="md:w-1/3 w-full bg-white flex justify-center items-center rounded-xl space-x-1 sm:space-x-4 lg:space-x-8 py-8 px-5 h-44">
            <img src="/images/order.png" alt="" className="w-16 h-16 mt-2" />
            <div>
              <p className="mb-2 font-semibold font-mono text-sm">
                Nombres de livraisons effectuées
              </p>
              <strong className="pl-2 text-xl font-mono text-[#5d6bd1]">
                {valid.length}
              </strong>
            </div>
          </div>
          {/* Panel 3 */}
          <div className="md:w-1/3 w-full bg-white flex justify-center items-center rounded-xl  space-x-1 sm:space-x-4 lg:space-x-8 py-8 px-5 h-44">
            <img
              src="/images/video-call.png"
              alt=""
              className="w-16 h-16 mt-2"
            />
            <div>
              <p className="mb-2 font-semibold font-mono text-sm">
                Nombres de total d'utilisateurs
              </p>
              <strong className="pl-2 text-xl font-mono text-[#5d6bd1]">
                {validuser.length}
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="px-12">
        <div className="md:w-1/3 w-full bg-white flex justify-center items-center rounded-xl  space-x-1 sm:space-x-4 lg:space-x-8 py-8 px-5 h-44">
          <img src="/images/suivi.png" alt="" className="w-16 h-16 mt-2" />
          <div>
            <p className="mb-2 font-semibold font-mono text-sm">
              Nombres de total de livraisons en cours
            </p>
            <strong className="pl-2 text-xl font-mono">{invalid.length}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
