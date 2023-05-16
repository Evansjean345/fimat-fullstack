import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import SearchBar from "../layouts/SearchBar";
import "../App.css";
import { CardFooter, Button, IconButton, Chip } from "@material-tailwind/react";

function OrderTable() {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/order/")
      .then((data) => data.json())
      .then((data) => {
        setData(data);
        setOriginalData(data);
      })
      .catch((error) => setData(error));
  }, []);

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

  const SortByStatus = (status) => {
    const sortedData = originalData.filter((item) => item.status === status);
    setSortedData(sortedData);
    setCurrentPage(1);
  };

  const resetData = () => {
    setSortedData(data);
    setCurrentPage(1);
  };

  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentData = sortedData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(sortedData.length / recordsPerPage);
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

  return (
    <>
      <div className="w-full sm:px-6 py-12">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between" id="tabSearch">
            <div className="flex sm:flex-col flex-col">
              <p
                className="font-semibold font-mono py-0 sm:py-5 text-sm text-black"
                id="page-view"
              >
                Rechercher une commande
              </p>
              <SearchBar />
            </div>
            <div>
              <p
                className="font-semibold font-mono py-3 text-sm text-black"
                id="page-view"
              >
                Trier les commandes
              </p>
              <div className="w-72">
                <Select
                  label="Trier par :"
                  className="rounded-lg hover:bg-gray-200"
                >
                  <Option
                    onClick={() => {
                      SortByStatus(true);
                    }}
                    className="hover:bg-gray-200"
                  >
                    Commandes effectuées
                  </Option>
                  <Option
                    onClick={() => {
                      SortByStatus(false);
                    }}
                    className="hover:bg-gray-200"
                  >
                    Commandes en cours
                  </Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none font-mono text-gray-800">
                <th className=" text-left pl-4">Commande</th>
                <th className=" text-left pl-12">Coût Total</th>
                <th className="text-left pl-12">Destinataire</th>
                <th className="text-left pl-20">status</th>

                <th className="text-left pl-20">Jour de livraison</th>
                <th className="text-left pl-20">destination</th>
                <th className="text-left pl-16">payement</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {currentData.map((item) => {
                return (
                  <tr
                    key={item._id}
                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                  >
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            className="w-full h-full"
                            src="https://cdn.tuk.dev/assets/templates/olympus/projects.png"
                          />
                        </div>
                        <div className="pl-4">
                          <p className="font-medium text-indigo-500">
                            <Link
                              to={`/dashboard/admin/order/details/${item._id}`}
                            >
                              {item.tracking}
                            </Link>
                          </p>
                          <p className="text-xs leading-3 text-gray-600 pt-2">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        {item.totalCost}
                      </p>
                      <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                        <div className="w-20 h-3 bg-green-progress rounded-full" />
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">
                        {item.recipient && item.recipient.name}
                      </p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        { item.recipient &&  item.recipient.phone}
                      </p>
                    </td>
                    <td className="pl-16">
                      {item.status && item.invoiceStatus === true
                        ? valid
                        : invalid}
                    </td>
                    <td className="pl-20 font-semibold">
                      <Chip
                        color="teal"
                        value={`${item.delivery_day}/${item.delivery_hours}H`}
                      />
                    </td>
                    <td className="pl-20 font-semibold">{item.destination}</td>
                    <td className="pl-12">
                      <Chip
                        variant="ghost"
                        color="yellow"
                        size="sm"
                        value={item.payement}
                        icon={
                          <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-yellow-900" />
                        }
                      />
                    </td>
                    <td
                      className="xl:pl-7 pl-14 2xl:px-0 hover:cursor-pointer group"
                      id="edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-edit"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1={16} y1={5} x2={19} y2={8} />
                      </svg>
                      <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-14 rounded-xl hidden group-hover:block ">
                        <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer rounded-t-xl hover:text-white">
                          <p>Edit</p>
                        </div>
                        <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer rounded-b-xl hover:text-white">
                          <p>Delete</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <CardFooter className="flex  items-center justify-between border-t border-blue-gray-50 p-4 bg-white">
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
    </>
  );
}

export default OrderTable;
