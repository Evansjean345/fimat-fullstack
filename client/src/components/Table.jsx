import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../layouts/SearchBar";
import { CardFooter, Button, IconButton, Chip } from "@material-tailwind/react";

function Table() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    function PerPage() {
      fetch("http://localhost:4000/order/")
        .then((data) => data.json())
        .then((data) => setData(data))
        .catch((error) => setData(error));
    }
    PerPage();
  }, []);

  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentData = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const valid = (
    <Chip
      variant="ghost"
      color="green"
      size="sm"
      value="colis livré"
      icon={
        <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-green-900" />
      }
    />
  );

  const Facture = (
    <Chip
      variant="ghost"
      color="green"
      size="sm"
      value="facture reglée"
      icon={
        <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-green-900" />
      }
    />
  );

  const invalid = (
    <Chip
      variant="ghost"
      color="red"
      size="sm"
      value="en attente"
      icon={
        <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-red-900" />
      }
    />
  );

  return (
    <div className="py-12 ">
      <div className="w-full sm:px-6 bg-white rounded-xl">
        <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
          <div className="w-full lg:w-1/3 flex flex-col  items-start lg:items-center">
            <SearchBar />
          </div>
          <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
            <div className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
              <Link
                to="/dashboard/admin/all-order"
                className="mx-2 my-2 flex items-center bg-white hover:bg-gray-200  transition duration-150 ease-in-out hover:border-gray-700 hover:text-gray-600 rounded border border-gray-600 text-gray-500 pl-3 pr-6 py-2 text-sm"
              >
                <span className="h-4 w-4 mr-2">
                  <svg
                    xmlns="www.w3.org/2000/svg"
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
                </span>
                Trie des commandes
              </Link>
            </div>
            <div className="lg:ml-6 flex items-center">
              <button className="bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm">
                <Link to="dashboard/admin/order-administration">
                    Administrer une commande
                </Link>
              </button>
              <div className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-8 h-8 rounded flex items-center justify-center"></div>
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
                  Status
                </th>
                <th className="font-semibold font-mono text-left pl-20">
                  Paiement
                </th>
                <th className="font-semibold font-mono text-left pl-16">
                  Coût Total
                </th>
                <th className="font-semibold font-mono text-left pl-16">
                  Statut de la facture
                </th>
                <th className="font-semibold font-mono text-left pl-16">
                  Jour de livraison
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {currentData.map((item) => (
                <tr
                  key={item._id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                >
                  <td className="pl-4 cursor-pointer">
                    <div className="flex items-center text-indigo-500 font-semibold">
                      <Link to={`/dashboard/admin/order/details/${item._id}`}>
                        {item.tracking}
                      </Link>
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
                    <p className="text-xs leading-3 font-medium text-gray-600 mt-2">
                      {item.recipient.phone}
                    </p>
                  </td>
                  <td className="pl-16">
                    <p className="font-medium">
                      {item.status === true ? valid : invalid}
                    </p>
                  </td>
                  <td className="pl-20">
                    <p className="text-sm font-medium leading-none">
                      <Chip
                        variant="ghost"
                        color="yellow"
                        size="sm"
                        value={item.payement}
                        icon={
                          <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-yellow-900" />
                        }
                      />
                    </p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">{item.totalCost}</p>
                  </td>
                  <td className="pl-16">
                    <p className="font-medium flex items-center">
                      {item.invoiceStatus === true ? Facture : invalid}
                    </p>
                  </td>
                  <td className="pl-16">
                    <p className="font-medium flex items-center">
                      <Chip color="teal" value={item.delivery_day} />
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <CardFooter className="flex  items-center justify-between border-t border-blue-gray-50 p-4">
            <Button
              variant="outlined"
              color="blue-gray"
              size="sm"
              onClick={prePage}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {numbers.map((n, i) => {
                return (
                  <>
                    <IconButton
                      key={n}
                      className={`${
                        currentPage === n ? "border border-blue-300" : ""
                      }`}
                      variant="outlined"
                      color="blue-gray"
                      size="sm"
                      onClick={() => {
                        changePage(n);
                      }}
                    >
                      {n}
                    </IconButton>
                  </>
                );
              })}
            </div>
            <Button
              variant="outlined"
              color="blue-gray"
              size="sm"
              onClick={nextPage}
            >
              Next
            </Button>
          </CardFooter>
        </div>
      </div>
    </div>
  );
}

export default Table;
