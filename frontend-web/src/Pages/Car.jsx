import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentFormat } from "../Components/___CurrentFormat";

import { useStateContext } from "../Providers/StateProvider";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { fetchCars } from "./Service/__FetchCar";
import { fetchCarComp } from "./Service/__FetchCarComp";

export const Car = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const navRedirect = useNavigate();
  // const dataPrice = [
  //   { text: "One", value: 1 },
  //   { text: "Two", value: 2 },
  //   { text: "Three", value: 3 },
  //   { text: "Four", value: 4 },
  //   { text: "Five", value: 5 },
  //   { text: "Six", value: 6 },
  //   { text: "Seven", value: 7 },
  //   { text: "Eight", value: 8 },
  // ];
  // const [pageAllCar] = useState({ page: 1, perPage: 6 });
  // const __GET_CAR = async () => setCars(await fetchCars(pageAllCar));
  // const [getCars, setCars] = useState("");
  const navRedirect = useNavigate();
  const { state, setState } = useStateContext();
  const { getAllCars, pageAllCar } = state;

  const handleLoadMoreAllCar = async () => {
    setLoadFetch(true);
    const nextPage = { page: pageAllCar.page, perPage: pageAllCar.perPage + 6 };
    setState((prevState) => ({
      ...prevState,
      pageAllCar: nextPage,
    }));

    try {
      const allCar = await fetchCars(nextPage);
      setState((prevState) => ({
        ...prevState,
        getAllCars: allCar,
      }));
    } catch (error) {
      console.error("Error fetching new cars:", error);
    }
    setLoadFetch(false);
  };
  const [loadFech, setLoadFetch] = useState(false);

  const [getComp, setComp] = useState("");
  const __GET_CAR_COMP = async () => {
    const response = await fetchCarComp();
    setComp(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    __GET_CAR_COMP();
  }, []);
  return (
    <>
      <HighLightHeader />
      <div className="md:container shadow mb-44 bg-white rounded-xl -mt-10 p-4 md:p-10 sm:mx-1 md:mx-auto">
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
                    {getComp &&
                      getComp.brand.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
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
                    {getComp &&
                      getComp.model.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
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
                    {getComp &&
                      getComp.type.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
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
                    {getComp &&
                      getComp.type.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
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
                    {getComp &&
                      getComp.cylinder.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.volume}
                        </option>
                      ))}
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
                    {getComp &&
                      getComp.transmission.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
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
                    {getComp &&
                      getComp.series.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
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
                    {getComp &&
                      getComp.gear.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
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
                    {getComp &&
                      getComp.fuel.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
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
                    {getComp &&
                      getComp.color.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
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
          <div className="sm:w-full md:mt-0 mt-10 md:w-3/4">
            {getAllCars ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:gfrid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {getAllCars.data.map((item, key) => (
                  <div
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.append("slug", item.slug);
                      params.append("index", item.id);
                      navRedirect({
                        pathname: "/mobil/preview",
                        search: `?${params.toString()}`,
                      });
                    }}
                    key={key}
                    className="block select-none border-transparent border hover:border-red-500 active:scale-95 cursor-pointer duration-300 w-full max-w-[32rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="relative overflow-hidden flex justify-center bg-cover bg-no-repeat">
                      <img
                        className="rounded-t-lg h-40 object-contain"
                        src="https://www.auto88group.com/image/car/1775/20240201113209.jpg"
                        alt=""
                      />
                    </div>
                    <div className="p-6">
                      <h1 className="font-bold text-gray-800 text-sm md:text-md">
                        {item.title.length > 40
                          ? item.title.slice(0, 40) + "..."
                          : item.title}
                      </h1>
                      <p className="text-gray-800 font-light text-xs md:text-md text-left uppercase">
                        {item.type.name} / {item.series.name} / {item.fuel.name}
                      </p>
                      <p className="text-gray-800 text-xs md:text-md font-medium line-through text-right">
                        Rp 1x4.000.000
                      </p>
                      <p className="text-gray-800 text-sm md:text-xl font-bold text-right">
                        <CurrentFormat value={item.price} />
                      </p>
                      <div className="flex justify-between">
                        <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-gray-600">
                          <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                            <i className="fas fa-gauge"></i>
                            <p>65.132 km</p>
                          </div>
                          <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                            <i className="fas fa-calendar"></i>
                            <p>{item.year.name}</p>
                          </div>
                        </div>
                        <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-gray-600">
                          <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                            <i className="fas fa-gear"></i>
                            <p>{item.gear.name}</p>
                          </div>
                          <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                            <i className="fas fa-eye"></i>
                            <p>114</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                })([], 0, 50)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
