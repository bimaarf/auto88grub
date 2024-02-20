import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListCarPromo } from "../Components/__ListCarPromo";
import { LoadingScreen } from "../Components/___LoadingScreen";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";
import { useStateContext } from "../Providers/StateProvider";
import { fetchCarPromos } from "./Service/__FetchCarPromos";

export const Promo = () => {
  const navRedirect = useNavigate();
  const { state, setState } = useStateContext();
  const { getCarPromos, pageCarPromo } = state;

  const handleLoadMoreCarPromos = async () => {
    const nextPage = {
      page: pageCarPromo.page,
      perPage: pageCarPromo.perPage + 6,
    };
    setState((prevState) => ({
      ...prevState,
      pageCarPromo: nextPage,
    }));

    try {
      const promoCars = await fetchCarPromos(nextPage);
      setState((prevState) => ({
        ...prevState,
        getCarPromos: promoCars,
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
        const promoCars = await fetchCarPromos(pageCarPromo);
        setState((prevState) => ({
          ...prevState,
          getCarPromos: promoCars,
        }));
        setLoadFetch(false);
      } catch (error) {
        setLoadFetch(false);
        console.error("Error fetching new cars:", error);
      }
    };
    fetchData();
  }, [pageCarPromo, setState]);

  return (
    <>
      <div
        className="w-full -z-10 px-20 relative top-0 overflow-hidden"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundSize: "cover", // Ensure the background image covers the entire container
          height: "40vh",
          // filter: "blur(2px)", // Apply blur effect to the image
        }}>
        <div className="absolute inset-0 bg-gradient-to-b flex justify-center from-transparent to-black">
          <div className="md:p-20 p-8 md:rounded-xl">
            <div className="text-white flex justify-center items-center align-middle">
              <div
                className="md:space-y-4 animate-pulse font-bold text-center align-middle flex justify-center bg-black px-10 py-4 bg-opacity-20"
                style={{
                  fontFamily: "'Marko One', sans-serif",
                  width: "500px",
                }}>
                <div className="space-y-4">
                  <img
                    draggable={false}
                    src={require("../Images/Banner/logo-tfnCopy.png")}
                    width={300}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:container mb-44 bg-white rounded-xl -mt-10 p-4 md:p-10 sm:mx-1 md:mx-auto">
        <h1 className="text-gray-800 font-medium border-b mb-4 pb-2">
          Mobil Promo
        </h1>
        <div className="flex justify-center gap-4">
          {getCarPromos ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <ListCarPromo getCarPromos={getCarPromos} />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {(function (rows, i, len) {
                while (++i <= len) {
                  rows.push(
                    <div
                      onClick={() =>
                        navRedirect({
                          pathname: "/car/preview",
                          search: `?slug=DAIHATSU ALL NEW AYLA (WHITE) TIPE X 1.0 M/T (2023)`,
                        })
                      }
                      key={i}
                      className="block active:scale-90 hover:scale-95 cursor-pointer duration-300 w-full max-w-[32rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                      <div className="relative overflow-hidden bg-cover bg-no-repeat">
                        <div className="relative overflow-hidden bg-cover flex bg-no-repeat justify-center items-center">
                          <img
                            className="skeleton animate-ping"
                            src="https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                            alt=""
                          />
                          <i className="fas fa-spinner text-3xl align-middle self-center absolute text-gray-300 animate-spin"></i>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="skeleton h-3 w-full"></p>
                        <p className="skeleton h-3 w-2/3 mt-2"></p>
                        <div className="flex justify-end">
                          <p className="skeleton h-2 w-1/2 mt-2"></p>
                        </div>
                        <div className="flex justify-end">
                          <p className="skeleton h-2 w-1/2 mt-2"></p>
                        </div>
                        <div className="flex justify-between">
                          <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-gray-600">
                            <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                              <p className="skeleton h-2 w-4 mt-2"></p>
                              <p className="skeleton h-2 w-10 mt-2"></p>
                            </div>
                            <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                              <p className="skeleton h-2 w-4 mt-2"></p>
                              <p className="skeleton h-2 w-10 mt-2"></p>
                            </div>
                          </div>
                          <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-gray-600">
                            <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                              <p className="skeleton h-2 w-4 mt-2"></p>
                              <p className="skeleton h-2 w-10 mt-2"></p>
                            </div>
                            <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                              <p className="skeleton h-2 w-4 mt-2"></p>
                              <p className="skeleton h-2 w-10 mt-2"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return rows;
              })([], 0, 9)}
            </div>
          )}
        </div>
        {loadFetch && <LoadingScreen />}
        {getCarPromos && (
          <div className="text-xs text-red-600 cursor-pointer mt-2 font-bold flex justify-center items-center gap-1">
            <div
              onClick={handleLoadMoreCarPromos}
              className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
              <i className="fas fa-angle-down"></i>
              <p>Selanjutnya</p> {/* Change "Selengkapnya" to "Selanjutnya" */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
