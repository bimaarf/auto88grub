import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListCarPromo } from "../Components/__ListCarPromo";

import { useStateContext } from "../Providers/StateProvider";
import { HighLightHeader } from "./Context/__HighLightHeader";
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
    window.scrollTo(0, 0);
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoadFetch(true);
  //     try {
  //       const promoCars = await fetchCarPromos(pageCarPromo);
  //       setState((prevState) => ({
  //         ...prevState,
  //         getCarPromos: promoCars,
  //       }));
  //       setLoadFetch(false);
  //     } catch (error) {
  //       setLoadFetch(false);
  //       console.error("Error fetching new cars:", error);
  //     }
  //   };
  //   fetchData();
  // }, [pageCarPromo, setState]);

  return (
    <>
      <HighLightHeader />
      <div className="md:container shadow mb-44 bg-white rounded-xl p-4 md:p-10 sm:mx-1 md:mx-auto">
        <div className="md:flex justify-center items-start align-top gap-4">
          <div className="sm:w-full md:w-1/4 md:border-r md:sticky md:top-16 md:overflow-y-auto md:pb-32 md:overflow-hidden space-y-5 sm:h-full md:h-screen pr-4">
            <div className="collapse collapse-arrow w-full bg-opacity-0 mt-4">
              <div className="collapse-title">
                <div className="text-md font-medium pb-2 w-full border-b border-dashed mb-4">
                  <p>Filter Mobil</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked />
              <div className="collapse-content  space-y-4">
                <div className="space-y-2">
                  {/* <TESelect data={dataPrice} /> */}
                  <label htmlFor="price" className="font-semibold">
                    *Harga Mobil Dibawah:
                  </label>
                  <select
                    name="price"
                    id="price"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-300">
                    <option value="1.000.000.000">1.000.000.000</option>
                    <option value="750.000.000">750.000.000</option>
                    <option value="500.000.000">500.000.000</option>
                    <option value="300.000.000">300.000.000</option>
                    <option value="200.000.000">200.000.000</option>
                    <option value="150.000.000">150.000.000</option>
                    <option value="100.000.000">100.000.000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="merk" className="font-semibold">
                    *Merk:
                  </label>
                  <select
                    name="merk"
                    id="merk"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-300">
                    <option value="Semua">Semua</option>
                    <option value="1.000.000.000">1.000.000.000</option>
                    <option value="750.000.000">750.000.000</option>
                    <option value="500.000.000">500.000.000</option>
                    <option value="300.000.000">300.000.000</option>
                    <option value="200.000.000">200.000.000</option>
                    <option value="150.000.000">150.000.000</option>
                    <option value="100.000.000">100.000.000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="model" className="font-semibold">
                    *Model:
                  </label>
                  <select
                    name="model"
                    id="model"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-300">
                    <option value="1.000.000.000">Semua</option>
                    <option value="1.000.000.000">1.000.000.000</option>
                    <option value="750.000.000">750.000.000</option>
                    <option value="500.000.000">500.000.000</option>
                    <option value="300.000.000">300.000.000</option>
                    <option value="200.000.000">200.000.000</option>
                    <option value="150.000.000">150.000.000</option>
                    <option value="100.000.000">100.000.000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="font-semibold">
                    *Type:
                  </label>
                  <select
                    name="type"
                    id="type"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-300">
                    <option value="1.000.000.000">Semua</option>
                    <option value="1.000.000.000">1.000.000.000</option>
                    <option value="750.000.000">750.000.000</option>
                    <option value="500.000.000">500.000.000</option>
                    <option value="300.000.000">300.000.000</option>
                    <option value="200.000.000">200.000.000</option>
                    <option value="150.000.000">150.000.000</option>
                    <option value="100.000.000">100.000.000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="jenis" className="font-semibold">
                    *Jenis:
                  </label>
                  <select
                    name="jenis"
                    id="jenis"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-300">
                    <option value="1.000.000.000">Semua</option>
                    <option value="1.000.000.000">1.000.000.000</option>
                    <option value="750.000.000">750.000.000</option>
                    <option value="500.000.000">500.000.000</option>
                    <option value="300.000.000">300.000.000</option>
                    <option value="200.000.000">200.000.000</option>
                    <option value="150.000.000">150.000.000</option>
                    <option value="100.000.000">100.000.000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="silinder" className="font-semibold">
                    *Silinder:
                  </label>
                  <select
                    name="silinder"
                    id="silinder"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-300">
                    <option value="1.000.000.000">Semua</option>
                    <option value="1.000.000.000">1.000.000.000</option>
                    <option value="750.000.000">750.000.000</option>
                    <option value="500.000.000">500.000.000</option>
                    <option value="300.000.000">300.000.000</option>
                    <option value="200.000.000">200.000.000</option>
                    <option value="150.000.000">150.000.000</option>
                    <option value="100.000.000">100.000.000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="transmisi" className="font-semibold">
                    *Transmisi:
                  </label>
                  <select
                    name="transmisi"
                    id="transmisi"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-300">
                    <option value="1.000.000.000">Semua</option>
                    <option value="1.000.000.000">1.000.000.000</option>
                    <option value="750.000.000">750.000.000</option>
                    <option value="500.000.000">500.000.000</option>
                    <option value="300.000.000">300.000.000</option>
                    <option value="200.000.000">200.000.000</option>
                    <option value="150.000.000">150.000.000</option>
                    <option value="100.000.000">100.000.000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="seri" className="font-semibold">
                    *Seri:
                  </label>
                  <select
                    name="seri"
                    id="seri"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-300">
                    <option value="1.000.000.000">Semua</option>
                    <option value="1.000.000.000">1.000.000.000</option>
                    <option value="750.000.000">750.000.000</option>
                    <option value="500.000.000">500.000.000</option>
                    <option value="300.000.000">300.000.000</option>
                    <option value="200.000.000">200.000.000</option>
                    <option value="150.000.000">150.000.000</option>
                    <option value="100.000.000">100.000.000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="garden" className="font-semibold">
                    *Garden:
                  </label>
                  <select
                    name="garden"
                    id="garden"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-300">
                    <option value="1.000.000.000">Semua</option>
                    <option value="1.000.000.000">1.000.000.000</option>
                    <option value="750.000.000">750.000.000</option>
                    <option value="500.000.000">500.000.000</option>
                    <option value="300.000.000">300.000.000</option>
                    <option value="200.000.000">200.000.000</option>
                    <option value="150.000.000">150.000.000</option>
                    <option value="100.000.000">100.000.000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="bahan_bakar" className="font-semibold">
                    *Bahan Bakar:
                  </label>
                  <select
                    name="bahan_bakar"
                    id="bahan_bakar"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-300">
                    <option value="1.000.000.000">Semua</option>
                    <option value="1.000.000.000">1.000.000.000</option>
                    <option value="750.000.000">750.000.000</option>
                    <option value="500.000.000">500.000.000</option>
                    <option value="300.000.000">300.000.000</option>
                    <option value="200.000.000">200.000.000</option>
                    <option value="150.000.000">150.000.000</option>
                    <option value="100.000.000">100.000.000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="warna" className="font-semibold">
                    *Warna:
                  </label>
                  <select
                    name="warna"
                    id="warna"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-300">
                    <option value="1.000.000.000">Semua</option>
                    <option value="1.000.000.000">1.000.000.000</option>
                    <option value="750.000.000">750.000.000</option>
                    <option value="500.000.000">500.000.000</option>
                    <option value="300.000.000">300.000.000</option>
                    <option value="200.000.000">200.000.000</option>
                    <option value="150.000.000">150.000.000</option>
                    <option value="100.000.000">100.000.000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <button className="w-full glass active:scale-95 bg-red-700 skeleton  duration-300 p-2 rounded text-white">
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:w-full md:w-3/4 justify-center gap-4">
            {getCarPromos ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <ListCarPromo getCarPromos={getCarPromos} />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
          {/* {loadFetch && <LoadingScreen />} */}
          {getCarPromos && getCarPromos.data.length < getCarPromos.total && (
            <div className="text-xs text-red-600 cursor-pointer mt-2 font-bold flex justify-center items-center gap-1">
              <div
                onClick={handleLoadMoreCarPromos}
                className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
                <i className="fas fa-angle-down"></i>
                <p>Selanjutnya</p>{" "}
                {/* Change "Selengkapnya" to "Selanjutnya" */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
