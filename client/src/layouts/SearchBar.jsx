import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrder = () => {
      fetch("http://localhost:4000/order")
        .then((res) => res.json())
        .then((res) => setData(res));
    };
    fetchOrder();
  }, []);

  console.log("data", data);

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log("search", searchTerm);
  };

  return (
    <>
      <div className=" border-b-2 border-gray-200 pb-2 flex justify-center items-center md:mt-0 mt-10  w-full ">
        <input
          placeholder="numéro de suivi"
          type="text"
          aria-label="Search"
          value={value}
          onChange={onChange}
          className="lg:w-96 md:w-72 w-full rounded-md  px-3 focus:outline-none placeholder-gray-600 text-base font-normal text-gray-600 leading-4 "
        />
        <svg
          className=" cursor-pointer"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            onSearch(value);
          }}
        >
          <path
            d="M6.66667 11.3333C9.244 11.3333 11.3333 9.244 11.3333 6.66667C11.3333 4.08934 9.244 2 6.66667 2C4.08934 2 2 4.08934 2 6.66667C2 9.244 4.08934 11.3333 6.66667 11.3333Z"
            stroke="#4B5563"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 14L10 10"
            stroke="#4B5563"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="dropdown flex flex-col p-2 empty:border-none border border-solid border-gray-500 w-full overflow-y-scroll h-[120px] empty:h-[0px] empty:overflow-hidden rounded-lg">
        {data
          .filter((item) => {
            const searchTerm = value;
            const tracking = item.tracking;
            return searchTerm && tracking !== searchTerm;
          })
          .slice(0, 10)
          .map((item) => (
            <Link
              to={`/dashboard/admin/order/details/${item._id}`}
              className="hover:bg-gray-300 rounded-lg w-full"
            >
              <div
                className="w-full cursor-pointer text-start mt-[2px] font-semibold text-indigo-500 hover:bg-gray-300 rounded-lg"
                onClick={() => onSearch(item.tracking)}
                key={item.tracking}
              >
                {item.tracking}
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
