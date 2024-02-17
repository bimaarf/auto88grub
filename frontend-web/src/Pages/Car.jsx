import React, { useEffect } from "react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";
import { TESelect } from "tw-elements-react";

export const Car = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dataPrice = [
    { text: "One", value: 1 },
    { text: "Two", value: 2 },
    { text: "Three", value: 3 },
    { text: "Four", value: 4 },
    { text: "Five", value: 5 },
    { text: "Six", value: 6 },
    { text: "Seven", value: 7 },
    { text: "Eight", value: 8 },
  ];
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
                className="md:space-y-4 font-bold text-center align-middle flex justify-center bg-black px-10 py-4 bg-opacity-20"
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
                  <h1 className="text-white text-3xl">Koleksi Mobil</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:container shadow p-4 bg-white rounded-xl -mt-20 sm:mx-2 md:mx-auto z-30 relative">
        <div className="md:flex justify-center items-start align-top gap-4">
          <div className="sm:w-full md:w-1/4 md:border-r md:sticky md:top-16 md:overflow-y-auto md:pb-32 md:overflow-hidden space-y-5 sm:h-full md:h-screen pr-4">
            <div className="collapse collapse-arrow w-full bg-opacity-0 mt-4">
              <div className="collapse-title">
                <div className="text-md font-medium pb-2 flex items-center gap-2 justify-start border-b border-dashed mb-4">
                  <p>Filter Mobil</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked />
              <div className="collapse-content  space-y-4">
                <div className="space-y-2">
                  <TESelect data={dataPrice} />
                  <label htmlFor="price" className="font-semibold">
                    *Harga Mobil Dibawah:
                  </label>
                  <select
                    name="price"
                    id="price"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-1000">
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
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-1000">
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
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-1000">
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
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-1000">
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
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-1000">
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
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-1000">
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
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-1000">
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
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-1000">
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
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-1000">
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
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-1000">
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
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:scale-95 duration-1000">
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
                  <button className="w-full glass active:scale-95 bg-green-500 hover:bg-green-600 duration-300 p-2 rounded text-white">
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:w-full md:mt-0 mt-10 md:w-3/4">
            <h1 className="text-gray-800 font-medium border-b mb-4 pb-2">
              Koleksi Mobil
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {(function (rows, i, len) {
                while (++i <= len) {
                  rows.push(
                    <div
                      key={i}
                      className="block active:scale-95 cursor-pointer duration-300 w-full max-w-[32rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                      <div className="relative overflow-hidden bg-cover bg-no-repeat">
                        <img
                          className="rounded-t-lg"
                          src={require("../Images/Cars/car1.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="p-6">
                        <h1 className="font-bold text-gray-700 text-xs">
                          DAIHATSU ALL NEW AYLA (WHITE) TIPE X 1.0 M/T
                          (2023)....
                        </h1>
                        <p className="text-gray-700 text-sm font-medium line-through text-right">
                          Rp 1x4.000.000
                        </p>
                        <p className="text-sky-700 text-md font-bold text-right">
                          Rp 1x4.000.000
                        </p>
                        <div className="flex justify-between">
                          <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-gray-600">
                            <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                              <i className="fas fa-gauge"></i>
                              <p>65.132 km</p>
                            </div>
                            <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                              <i className="fas fa-calendar"></i>
                              <p>2014</p>
                            </div>
                          </div>
                          <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-gray-600">
                            <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                              <i className="fas fa-gear"></i>
                              <p>4x2</p>
                            </div>
                            <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                              <i className="fas fa-eye"></i>
                              <p>114</p>
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
          </div>
        </div>
      </div>
    </>
  );
};
