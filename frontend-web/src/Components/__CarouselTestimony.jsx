import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchTestimony } from "../Pages/Service/__FetchTestimony";

export const CarouselTestimony = () => {
  const [getTestimony, setTestimony] = useState("");
  const [page, setPage] = useState({
    pageTestimony: { page: 1, perPage: 6 },
  });
  const __GET_TESTIMONIAL_API = async () => {
    const { pageTestimony } = page;

    await axios.get("sanctum/csrf-cookie");
    const response = await fetchTestimony(pageTestimony);
    setTestimony(response);
    console.log(response);
  };
  useEffect(() => {
    __GET_TESTIMONIAL_API();
  }, []);
  return (
    <>
      <div>
        <div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-center items-center">
            {getTestimony &&
              getTestimony.data.map((item, key) => (
                <div
                  onClick={() => window.open(item.link, "_blank")}
                  key={key}
                  className="my-4 fade-in-left cursor-pointer hover:scale-95 duration-300">
                  <div className="flex justify-center space-y-2">
                    <img
                      draggable={false}
                      className="rounded-full"
                      width={220}
                      src={`${process.env.REACT_APP_API_IMG}storage/${item.image}`}
                      alt=""
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h1 className="font-bold whitespace-pre-wrap text-gray-800 text-sm">
                      {item.name}
                    </h1>
                    <div className="prose prose-slate text-sm">
                      <p className="whitespace-pre-wrap italic font-thin">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>{" "}
      </div>
    </>
  );
};
