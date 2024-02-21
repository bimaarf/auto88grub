import React, { useEffect, useState } from "react";
import { CarouselTestimonySkeleton } from "../Components/__CarouselTestimonySkeleton";
import { useStateContext } from "../Providers/StateProvider";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { TestimonyList } from "./Context/__TestymoniList";
import { fetchTestimony } from "./Service/__FetchTestimony";
import { TestimonyListSkeleton } from "./Context/__TestymoniListSkeleton";

export const Testimony = () => {
  const { state, setState } = useStateContext();
  const { getTestimony, pageTestimony } = state;
  const [loading, setLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        !reachedEnd
      ) {
        loadMoreTestimony();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [getTestimony, loading, reachedEnd]);

  const loadMoreTestimony = async () => {
    setLoading(true);

    const nextPage = {
      page: pageTestimony.page,
      perPage: pageTestimony.perPage + 6,
    };

    try {
      const testimonyData = await fetchTestimony(nextPage);

      // Jika jumlah data yang dimuat sama dengan atau melebihi jumlah total data,
      // tandai bahwa sudah mencapai akhir data
      if (testimonyData.data.length >= testimonyData.total) {
        setReachedEnd(true);
      }

      setState((prevState) => ({
        ...prevState,
        getTestimony: {
          ...testimonyData,
          data: [...prevState.getTestimony.data, ...testimonyData.data], // Gabungkan data baru dengan data yang sudah ada
        },
        pageTestimony: nextPage,
      }));
    } catch (error) {
      console.error("Error fetching testimonies:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <HighLightHeader />
      <div className="md:container relative mb-44 bg-white rounded-xl -mt-10 p-4 md:p-10 sm:mx-1 md:mx-auto">
        <ul className="menu bg-white mb-4 border lg:menu-horizontal rounded-box">
          <li>
            <p>
              <i className="fa-solid fa-credit-card"></i>
              Testimoni
              <span className="badge badge-sm">
                {getTestimony && getTestimony.total}+
              </span>
            </p>
          </li>
        </ul>
        {getTestimony ? (
          <>
            <TestimonyList getTestimony={getTestimony} />
          </>
        ) : (
          <div className="flex justify-center">
            <TestimonyListSkeleton />
          </div>
        )}
        {loading && <TestimonyListSkeleton />}
        <div className="text-xs text-red-600 cursor-pointer mt-2 font-bold flex justify-center items-center gap-1">
          {loading ? (
            <div className="flex justify-center skeleton items-center gap-1 w-fit border-b  duration-300 bg-black/5 p-3">
              <i className="fas fa-spinner animate-spin"></i>
              <p>Loading</p>
            </div>
          ) : (
            <>
              {getTestimony &&
                getTestimony.data &&
                getTestimony.data.length < getTestimony.total && (
                  <div
                    onClick={loadMoreTestimony}
                    className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
                    <i className="fas fa-angle-down"></i>
                    <p>Selanjutnya</p>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
