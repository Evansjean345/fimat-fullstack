import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../services/account.service";

export default function PanelUser() {
  const { getOrderByUser } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getOrderByUser();
      setOrder(data.orders);
    };
    fetchUserInfo();
  }, [getOrderByUser]);

  let valid = null;
  let invalid = null;

  if (order !== null) {
    valid = order.filter((item) => item.status === true);
    invalid = order.filter((item) => item.status === false);
  }

  const blur = "loading..."

  return (
    <div className=" py-12 rounded-xl p-12 bg-[#1507231a]">
      <div className="px-12 flex md:flex-row  md:flex-nowrap flex-wrap flex-col w-full h-full md:space-x-12 md:space-y-0 space-y-12 rounded-xl p-12">
        <div className="md:w-1/3 w-full bg-white flex justify-center items-center rounded-xl  space-x-1 sm:space-x-4 lg:space-x-8 py-8 px-5 h-44">
          <img src="/images/order-1.png" alt="" className="w-16 h-16 mt-2" />
          <div>
            <p className="mb-2 font-semibold font-mono text-sm">
              Nombres de total de commandes
            </p>
            <strong className="pl-2 text-xl text-[#5d6bd1] font-mono">
              {order === null ? blur : order.length}
            </strong>
          </div>
        </div>
        <div className="md:w-1/3 w-full bg-white flex justify-center items-center rounded-xl  space-x-1 sm:space-x-4 lg:space-x-8 py-8 px-5 h-44">
          <img src="/images/order.png" alt="" className="w-16 h-16 mt-2" />
          <div>
            <p className="mb-2 font-semibold font-mono text-sm">
              Nombres de commandes en cours
            </p>
            <strong className="pl-2 text-xl text-[#5d6bd1] font-mono">
              {order === null ? blur : invalid.length}
            </strong>
          </div>
        </div>
        <div className="md:w-1/3 w-full bg-white flex justify-center items-center rounded-xl  space-x-1 sm:space-x-4 lg:space-x-8 py-8 px-5 h-44">
          <img src="/images/suivi.png" alt="" className="w-16 h-16 mt-2" />
          <div>
            <p className="mb-2 font-semibold font-mono text-sm">
              Nombres de commandes traitées
            </p>
            <strong className="pl-2 text-xl text-[#5d6bd1] font-mono">
              {order === null ? blur : valid.length}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
