import React, { useEffect, useState } from "react";
import { CarouselTestimony } from "../Components/__CarouselTestimony";
import { CarouselTestimonySkeleton } from "../Components/__CarouselTestimonySkeleton";

import { useStateContext } from "../Providers/StateProvider";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { fetchTestimony } from "./Service/__FetchTestimony";

export const Testimony = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { state, setState } = useStateContext();
  const { getTestimony, pageTestimony } = state;

  const handleLoadMoreTestimony = async () => {
    const nextPage = {
      page: pageTestimony.page,
      perPage: pageTestimony.perPage + 6,
    };
    setState((prevState) => ({
      ...prevState,
      pageTestimony: nextPage,
    }));

    try {
      const testimmonyData = await fetchTestimony(nextPage);
      setState((prevState) => ({
        ...prevState,
        getTestimony: testimmonyData,
      }));
    } catch (error) {
      console.error("Error fetching new cars:", error);
    }
  };
  const [loadFetch, setLoadFetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadFetch(true);
      try {
        const testimmonyData = await fetchTestimony(pageTestimony);
        setState((prevState) => ({
          ...prevState,
          getTestimony: testimmonyData,
        }));
        setLoadFetch(false);
      } catch (error) {
        setLoadFetch(false);
        console.error("Error fetching new cars:", error);
      }
    };
    fetchData();
  }, [pageTestimony, setState]);
  return (
    <>
      <HighLightHeader />
      <div className="md:container mb-44 bg-white rounded-xl -mt-10 p-4 md:p-10 sm:mx-1 md:mx-auto">
        <h1 className="text-gray-800 font-medium border-b mb-4 pb-2">
          Testimoni
        </h1>
        <div className="flex justify-center">
          {getTestimony ? (
            <CarouselTestimony getTestimony={getTestimony} />
          ) : (
            <CarouselTestimonySkeleton />
          )}
        </div>
        {getTestimony && getTestimony.data.length < getTestimony.total && (
          <div className="text-xs text-red-600 cursor-pointer mt-2 font-bold flex justify-center items-center gap-1">
            <div
              onClick={handleLoadMoreTestimony}
              className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
              <i className="fas fa-angle-down"></i>
              <p>Selanjutnya</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
