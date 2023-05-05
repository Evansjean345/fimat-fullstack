import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../layouts/SearchBar";

function Table() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/order/")
      .then((data) => data.json())
      .then((data) => setData(data))
      .catch((error) => setData(error));
  }, []);

  return (
    <div className="py-12 ">
      <div className="w-full sm:px-6 bg-white rounded-xl">
        <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
          <div className="w-full lg:w-1/3 flex flex-col  items-start lg:items-center">
            <SearchBar />
          </div>
          <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
            <div className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
              <p
                className="font-semibold font-mono text-sm text-black"
                id="page-view"
              >
                Voir toutes les commandes
              </p>
            </div>
            <div className="lg:ml-6 flex items-center">
              <button className="bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm">
                Ajoutez une commande
              </button>
              <div className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-8 h-8 rounded flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-plus"
                  width={28}
                  height={28}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={12} y1={5} x2={12} y2={19} />
                  <line x1={5} y1={12} x2={19} y2={12} />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-semibold text-left pl-4 font-mono">
                  Suivi
                </th>
                <th className="font-semibold font-mono text-left pl-12">
                  Date
                </th>
                <th className="font-semibold font-mono text-left pl-12">
                  Destination
                </th>
                <th className="font-semibold font-mono text-left pl-20">
                  Destinataire
                </th>
                <th className="font-semibold font-mono text-left pl-20">
                  Paiement
                </th>
                <th className="font-semibold font-mono text-left pl-16">
                  Coût Total
                </th>
                <th className="font-semibold font-mono text-left pl-16">
                  Statut
                </th>
                <th className="font-semibold font-mono text-left pl-16">
                  Statut de la facture
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                >
                  <td className="pl-4 cursor-pointer">
                    <div className="flex items-center text-indigo-500 font-semibold">
                      <Link to={`/dashboard/admin/order/details/${item._id}`}>{item.tracking}</Link>
                    </div>
                  </td>
                  <td className="pl-12">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {item.date}
                    </p>
                    <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                      <div className="w-20 h-3 bg-green-progress rounded-full" />
                    </div>
                  </td>
                  <td className="pl-12">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {item.destination}
                    </p>
                    <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                      <div className="w-20 h-3 bg-green-progress rounded-full" />
                    </div>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">{item.recipient.name}</p>
                    <p className="text-xs leading-3 text-gray-600 mt-2">
                      {item.recipient.phone}
                    </p>
                  </td>
                  <td className="pl-20">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {item.payement}
                    </p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">{item.totalCost}</p>
                  </td>
                  <td className="pl-16">
                    <p className="font-medium">
                      {item.status == true ? "ok" : "en attente"}
                    </p>
                  </td>
                  <td className="pl-16">
                    <p className="font-medium flex items-center">
                      {item.invoiceStatus == true ? "ok" : "Livrée"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
