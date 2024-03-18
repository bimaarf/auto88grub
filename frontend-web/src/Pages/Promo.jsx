import React, { useEffect, useState } from "react";
import { ListCarPromo } from "../Components/__ListCarPromo";

import { CurrentFormat } from "../Components/___CurrentFormat";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { fetchCarComp } from "./Service/__FetchCarComp";
import { fetchCarPromos } from "./Service/__FetchCarPromos";
import { reqCarPromoFilter } from "./Service/__ReqCarFilter";
import { ListCarSkeleton } from "./Context/__ListCarSkeleton";

export const Promo = () => {
  const [allCars, setAllCars] = useState(null);
  const [getComp, setComp] = useState(null);
  const [loadFetch, setLoadFetch] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [formInput, setFormInput] = useState({});
  const [filteredCars, setFilteredCars] = useState(null);
  const [pageAllCar, setPageAllCar] = useState({
    page: 1,
    perPage: 8,
  });
  const [pageFilteredCar, setPageFilteredCar] = useState({
    page: 1,
    perPage: 8,
  });

  const [filterChanged, setFilterChanged] = useState(false);

  const handleInfiniteScroll = () => {
    if (loadFetch) return;

    if (formInput.price || formInput.brand || formInput.model) {
      handleLoadMoreFilteredCar();
    } else {
      handleLoadMoreAllCar();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight &&
        !loadFetch &&
        !reachedEnd &&
        ((!formInput.price &&
          !formInput.brand &&
          !formInput.model &&
          allCars?.data.length > 0) ||
          filteredCars?.data.length > 0)
      ) {
        if (formInput.price || formInput.brand || formInput.model) {
          handleLoadMoreFilteredCar();
        } else {
          handleLoadMoreAllCar();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadFetch, reachedEnd, allCars, filteredCars, formInput]);

  useEffect(() => {
    async function fetchData() {
      await GET_CAR_COMP();
      await GET_ALL_CAR();
    }
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const GET_ALL_CAR = async () => {
    try {
      setLoadFetch(true);
      const response = await fetchCarPromos(pageAllCar);
      setAllCars((prevData) => ({
        ...response.data,
        data: [...(prevData ? prevData.data : []), ...response.data.data],
      }));
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoadFetch(false);
    }
  };

  const GET_CAR_COMP = async () => {
    try {
      const response = await fetchCarComp();
      setComp(response.data);
    } catch (error) {
      console.error("Error fetching car components:", error);
    }
  };

  const fetchFilteredCars = async () => {
    setLoadFetch(true);
    try {
      const response = await reqCarPromoFilter(
        pageFilteredCar.page,
        pageFilteredCar.perPage,
        formInput
      );
      setFilteredCars(response.data); // Simpan hasil filter ke dalam state
    } catch (error) {
      console.error("Error fetching filtered cars:", error);
    } finally {
      setLoadFetch(false);
    }
  };

  const handleLoadMoreAllCar = async () => {
    if (reachedEnd || loadFetch) return;
    setLoadFetch(true);
    const nextPage = {
      page: pageAllCar.page + 1,
      perPage: pageAllCar.perPage,
    };

    setPageAllCar(nextPage);
    try {
      const response = await fetchCarPromos(nextPage);
      setAllCars((prevData) => ({
        ...response.data,
        data: [...(prevData ? prevData.data : []), ...response.data.data],
      }));

      if (
        response.data.data.length === 0 ||
        nextPage.page === response.data.lastPage
      ) {
        setReachedEnd(true);
      }
    } catch (error) {
      console.error("Error fetching new cars:", error);
    } finally {
      setLoadFetch(false);
    }
  };

  const handleLoadMoreFilteredCar = async () => {
    if (reachedEnd || loadFetch) return;
    setLoadFetch(true);
    const nextPage = {
      page: pageFilteredCar.page + 1,
      perPage: pageFilteredCar.perPage,
    };

    setPageFilteredCar(nextPage);
    try {
      const response = await reqCarPromoFilter(
        nextPage.page,
        nextPage.perPage,
        formInput
      );
      if (response.data.data.length > 0) {
        setFilteredCars((prevData) => ({
          ...response.data,
          data: [...(prevData ? prevData.data : []), ...response.data.data],
        }));
      } else {
        setReachedEnd(true);
      }
    } catch (error) {
      console.error("Error fetching new filtered cars:", error);
    } finally {
      setLoadFetch(false);
    }
  };

  const handleSubmit = async () => {
    setPageFilteredCar({ page: 1, perPage: 8 }); // Setel ulang halaman ke 1 saat pengiriman filter baru
    setLoadFetch(true);
    try {
      await fetchFilteredCars();
    } catch (error) {
      console.error("Error fetching filtered cars:", error);
    } finally {
      setLoadFetch(false);
    }
  };
  const handleChange = async (e) => {
    e.persist();
    const { name, value } = e.target;
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      [name]: value,
    }));

    // Set filterChanged ke true setiap kali ada perubahan input
    setFilterChanged(true);

    // Reset state yang lain seperti yang Anda lakukan sebelumnya
    setAllCars(null);
    setFilteredCars(null);
    setReachedEnd(false);
    setPageAllCar({
      page: 1,
      perPage: 8,
    });
    setPageFilteredCar({
      page: 1,
      perPage: 8,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchFilteredCars();
      } catch (error) {
        console.error("Error fetching filtered cars:", error);
      }
    };

    if (filterChanged) {
      fetchData();
      setFilterChanged(false);
    }
  }, [formInput, filterChanged]);
  return (
    <>
      <HighLightHeader />
      <div className="lg:container shadow bg-base-100 rounded-xl p-4 sm:mx-1 lg:mx-auto">
        <div className="md:flex justify-center items-start align-top gap-4">
          <div className="sm:w-full md:w-1/4 md:border-r md:sticky md:top-16 md:pb-32 space-y-5 overflow-y-auto pr-4">
            <div className="collapse collapse-arrow top-0 w-full bg-opacity-0 mt-4">
              <div className="collapse-title">
                <div className="text-md font-medium pb-2 w-full border-b border-dashed mb-4">
                  <p>Filter Mobil</p>
                </div>
              </div>
              <input
                type="checkbox"
                defaultChecked={window.innerWidth <= 768 ? false : true}
              />
              <div className="collapse-content space-y-4">
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
              {allCars && !filteredCars && (
                <ListCarPromo getCarPromos={allCars} />
              )}
              {!allCars && filteredCars && (
                <ListCarPromo getCarPromos={filteredCars} />
              )}
              {loadFetch && <ListCarSkeleton />}

              {reachedEnd && (
                <div className="text-start w-full text-gray-500 py-2">
                  <p className="text-sm">No more cars to load</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
