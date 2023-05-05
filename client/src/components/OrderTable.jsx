import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import SearchBar from "../layouts/SearchBar";
import "../App.css";

function OrderTable() {
  const [show, setShow] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/order/")
      .then((data) => data.json())
      .then((data) => setData(data))
      .catch((error) => setData(error));
  }, []);

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
                <Select label="Trier par :" className="rounded-lg hover:bg-gray-200">
                  <Option className="hover:bg-gray-200">Toutes les commandes</Option>
                  <Option className="hover:bg-gray-200">Commandes effectuées</Option>
                  <Option className="hover:bg-gray-200">Commandes en cours</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-normal text-left pl-4">Project</th>
                <th className="font-normal text-left pl-12">Progress</th>
                <th className="font-normal text-left pl-12">Tasks</th>
                <th className="font-normal text-left pl-20">Budget</th>
                <th className="font-normal text-left pl-20">Deadline</th>
                <th className="font-normal text-left pl-16">Members</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data.map((item) => {
                return (
                  <tr 
                  key={item._id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            className="w-full h-full"
                            src="https://cdn.tuk.dev/assets/templates/olympus/projects.png"
                          />
                        </div>
                        <div className="pl-4">
                          <p className="font-medium">
                            UX Design &amp; Visual Strategy
                          </p>
                          <p className="text-xs leading-3 text-gray-600 pt-2">
                            Herman Group
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-sm font-medium leading-none text-gray-800">
                        72%
                      </p>
                      <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                        <div className="w-20 h-3 bg-green-progress rounded-full" />
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium">32/47</p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        5 tasks pending
                      </p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">$13,000</p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        $4,200 left
                      </p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">22.12.21</p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        34 days
                      </p>
                    </td>
                    <td className="pl-16">
                      <div className="flex items-center">
                        <img
                          className="shadow-md w-8 h-8 rounded-full"
                          src="https://cdn.tuk.dev/assets/templates/olympus/projects(8).png"
                        />
                        <img
                          className="shadow-md w-8 h-8 rounded-full -ml-2"
                          src="https://cdn.tuk.dev/assets/templates/olympus/projects(9).png"
                        />
                        <img
                          className="shadow-md w-8 h-8 rounded-full -ml-2"
                          src="https://cdn.tuk.dev/assets/templates/olympus/projects(10).png"
                        />
                        <img
                          className="shadow-md w-8 h-8 rounded-full -ml-2"
                          src="https://cdn.tuk.dev/assets/templates/olympus/projects(11).png"
                        />
                      </div>
                    </td>
                    <td className="xl:pl-7 pl-14 2xl:px-0 hover:cursor-pointer group"
                    id="edit">
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
        </div>
      </div>
    </>
  );
}

export default OrderTable;
