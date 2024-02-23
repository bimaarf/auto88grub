import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListCarPromo } from "../Components/__ListCarPromo";

import { useStateContext } from "../Providers/StateProvider";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { fetchCarPromos } from "./Service/__FetchCarPromos";
import { fetchCarComp } from "./Service/__FetchCarComp";
import { reqCarPromoFilter } from "./Service/__ReqCarFilter";
import { CurrentFormat } from "../Components/___CurrentFormat";
import { ListCarSkeleton } from "./Context/__ListCarSkeleton";

export const Promo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    __GET_CAR_COMP();
  }, []);

  const { state, setState } = useStateContext();
  const { getCarPromos, pageCarPromo } = state;
  const [getCarFilter, setCarsFilter] = useState("");

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

  const [loadFech, setLoadFetch] = useState(false);

  const [getComp, setComp] = useState("");
  const __GET_CAR_COMP = async () => {
    const response = await fetchCarComp();
    setComp(response.data);
  };
  const [formInput, setFormInput] = useState();

  const handleSubmit = async () => {
    setLoadFetch(true);
    const response = await reqCarPromoFilter(formInput);
    setCarsFilter(response);
    setLoadFetch(false);
  };

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [name]: value,
    }));
  };
  useEffect(() => {
    handleSubmit();
  }, [formInput]);
  return (
    <>
      <HighLightHeader />
      <div className="lg:container  shadow mb-44 bg-white rounded-xl -mt-10 p-4 sm:mx-1 lg:mx-auto">
        <div className="md:flex justify-center items-start align-top gap-4">
          <div className="sm:w-full md:w-1/4 md:border-r md:sticky md:top-16  md:pb-32  space-y-5 sm:h-full  pr-4">
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
                    onChange={handleChange}
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:brightness-95 duration-300">
                    <option value="">-- Semua --</option>
                    <option value="1000000000">
                      ≤ <CurrentFormat value={1000000000} />
                    </option>
                    <option value="750000000">
                      ≤ <CurrentFormat value={750000000} />
                    </option>
                    <option value="500000000">
                      ≤ <CurrentFormat value={500000000} />
                    </option>
                    <option value="300000000">
                      ≤ <CurrentFormat value={300000000} />
                    </option>
                    <option value="150000000">
                      ≤ <CurrentFormat value={150000000} />
                    </option>
                    <option value="100000000">
                      ≤ <CurrentFormat value={100000000} />
                    </option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="brand" className="font-semibold">
                    *Merk:
                  </label>
                  <select
                    name="brand"
                    id="brand"
                    onChange={handleChange}
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:brightness-95 duration-300">
                    <option value="">-- Semua --</option>
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
                    onChange={handleChange}
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:brightness-95 duration-300">
                    <option value="">-- Semua --</option>
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
                    onChange={handleChange}
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:brightness-95 duration-300">
                    <option value="">-- Semua --</option>
                    {getComp &&
                      getComp.type.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="kind" className="font-semibold">
                    *Jenis:
                  </label>
                  <select
                    name="kind"
                    id="kind"
                    onChange={handleChange}
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:brightness-95 duration-300">
                    <option value="">-- Semua --</option>
                    {getComp &&
                      getComp.kind.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="cylinder" className="font-semibold">
                    *Silinder:
                  </label>
                  <select
                    name="cylinder"
                    id="cylinder"
                    onChange={handleChange}
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:brightness-95 duration-300">
                    <option value="">-- Semua --</option>
                    {getComp &&
                      getComp.cylinder.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.volume}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="transmission" className="font-semibold">
                    *Transmisi:
                  </label>
                  <select
                    name="transmission"
                    id="transmission"
                    onChange={handleChange}
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:brightness-95 duration-300">
                    <option value="">-- Semua --</option>
                    {getComp &&
                      getComp.transmission.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="series" className="font-semibold">
                    *Seri:
                  </label>
                  <select
                    name="series"
                    id="series"
                    onChange={handleChange}
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:brightness-95 duration-300">
                    <option value="">-- Semua --</option>
                    {getComp &&
                      getComp.series.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="gear" className="font-semibold">
                    *Garden:
                  </label>
                  <select
                    name="gear"
                    id="gear"
                    onChange={handleChange}
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:brightness-95 duration-300">
                    <option value="">-- Semua --</option>
                    {getComp &&
                      getComp.gear.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="fuel" className="font-semibold">
                    *Bahan Bakar:
                  </label>
                  <select
                    name="fuel"
                    id="fuel"
                    onChange={handleChange}
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:brightness-95 duration-300">
                    <option value="">-- Semua --</option>
                    {getComp &&
                      getComp.fuel.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="color" className="font-semibold">
                    *Warna:
                  </label>
                  <select
                    onChange={handleChange}
                    name="color"
                    id="color"
                    className="form-control px-2 py-2 w-full outline-none bg-base-200 bg-opacity-50 rounded active:brightness-95 duration-300">
                    <option value="">-- Semua --</option>
                    {getComp &&
                      getComp.color.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={handleSubmit}
                    className="w-full glass active:brightness-95 bg-red-700 skeleton  duration-300 p-2 rounded text-white">
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:w-full md:w-3/4 justify-center gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {getCarPromos && !loadFech ? (
                <ListCarPromo
                  getCarPromos={getCarFilter ? getCarFilter : getCarPromos}
                />
              ) : (
                <ListCarSkeleton />
              )}
            </div>
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
