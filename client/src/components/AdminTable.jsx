import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardFooter, Button, IconButton, Chip } from "@material-tailwind/react";

export default function AdminTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/order`)
      .then((item) => setData(item.data))
      .catch((error) => console.log(error));
  }, []);

  const handleUpdate = (id, newStatus) => {
    axios
      .put(`http://localhost:4000/order/${id}`, {
        status: newStatus,
        invoiceStatus: newStatus,
      })
      .then(() => {
        const newData = data.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        );
        setData(newData);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/order/${id}`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

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

  const invalid = (
    <Chip
      variant="ghost"
      color="yellow"
      size="sm"
      value="en attente"
      icon={
        <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-yellow-900" />
      }
    />
  );

  return (
    <>
      <section class="container px-4 mx-auto py-12">
        <div class="flex flex-col">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-800 font-semibold font-mono">
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 px-4 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div class="flex items-center gap-x-3">
                          <button class="flex items-center gap-x-2">
                            <span>Commande</span>

                            <svg
                              class="h-3"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.1"
                              />
                              <path
                                d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.1"
                              />
                              <path
                                d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.3"
                              />
                            </svg>
                          </button>
                        </div>
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Details
                      </th>
                      <th
                        scope="col"
                        class="px-16 py-3.5 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Destinataire
                      </th>

                      <th
                        scope="col"
                        class="px-8 py-3.5 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        class="px-12 py-3.5 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Destination
                      </th>
                      <th
                        scope="col"
                        class="px-12 py-3.5 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Moyen de paiement
                      </th>
                      <th
                        scope="col"
                        class="px-12 py-3.5 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        lieu de reception du colis
                      </th>
                      <th
                        scope="col"
                        class="px-12 py-3.5 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Nombres de packs
                      </th>
                      <th
                        scope="col"
                        class="px-16 py-3.5 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Prix de la marchandise
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Jour de livraison et heure de la livraison
                      </th>
                      <th
                        scope="col"
                        class="px-16 py-3.5 text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Coût Total
                      </th>

                      <th scope="col" class="relative py-3.5 px-4">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 font-semibold">
                    {currentData.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div class=" items-center gap-x-3 text-indigo-500">
                              <Link
                                to={`/dashboard/admin/order/facturation/${item._id}`}
                              >
                                <span>{item.tracking}</span>
                              </Link>
                              <br />
                              <span className="text-gray-700">
                                {" "}
                                {item.date}
                              </span>
                            </div>
                          </td>
                          <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {item.comments}
                          </td>
                          <td class="px-16 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {item.recipient.name}
                            <br />
                            {item.recipient.phone}
                          </td>
                          <td class="px-2 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-50">
                              {item.status && item.invoiceStatus === true
                                ? valid
                                : invalid}
                            </div>
                          </td>
                          <td class="px-12 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {item.destination}
                          </td>
                          <td class="px-16 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <Chip color="gray" value={item.payement} />
                          </td>
                          <td class="px-12 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {item.reception}
                          </td>
                          <td class="px-12 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {item.packs} packs
                          </td>
                          <td class="px-16 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {item.goods_price} cfa
                            <br />
                          </td>
                          <td class="px-8 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <Chip
                              color="teal"
                              value={`${item.delivery_day}/ ${item.delivery_hours} H`}
                            />
                          </td>
                          <td class="px-2 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"></td>
                          <td class="px-4 py-4 text-sm whitespace-nowrap">
                            <div class="flex items-center gap-x-6">
                              <Button
                                onClick={() => {
                                  handleDelete(item._id);
                                  window.location.reload();
                                }}
                                size="sm"
                                color="red"
                              >
                                supprimé
                              </Button>

                              <Button
                                className="flex items-center"
                                size="sm"
                                onClick={() => {
                                  handleUpdate(
                                    item._id,
                                    !item.status,
                                    !item.invoiceStatus
                                  );
                                  window.location.reload();
                                }}
                              >
                                Confirmé
                              </Button>
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
          </div>
        </div>
      </section>
    </>
  );
}
