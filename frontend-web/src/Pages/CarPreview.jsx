import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import { Footer } from "../Components/Footer";
import { ListNewCar } from "../Components/__ListNewCar";
import { ListNewCarSkeleton } from "../Components/__ListNewCarSkeleton";
import { useStateContext } from "../Providers/StateProvider";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { fetchCarPreview } from "./Service/__FetchCarPreview";

export const CarPreview = () => {
  const { state } = useStateContext();
  const { getRecCars } = state;
  const location = useLocation();

  const fadeInOnScroll = (ref) => {
    const element = ref.current;
    if (element) {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight) {
        element.classList.add("fade-in-visible");
      } else {
        element.classList.remove("fade-in-visible");
      }
    }
  };
  const [getCars, setCars] = useState("");

  const __GET_CAR = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const slug = searchParams.get("slug");
    const id = searchParams.get("index");

    if (slug && id) {
      setCars(await fetchCarPreview({ slug, id }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    __GET_CAR();
  }, []);
  return (
    <>
      <HighLightHeader />
      <div className="bg-base-200/10 py-20 rounded-xl mb-10 md:container sm:mx-2 md:mx-auto">
        <div className="w-11/12 mx-auto mt-10 z-30 relative">
          <TECarousel showControls showIndicators ride="carousel">
            <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
              <TECarouselItem
                itemID={1}
                className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                  {(function (rows, i, len) {
                    while (++i <= len) {
                      rows.push(
                        <div
                          key={i}
                          className="block hover:scale-90 scale-95 cursor-pointer duration-300 w-full max-w-[32rem] bg-base-200/40 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                          <div className="relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                              src="https://www.auto88group.com/image/car/1775/20240201113209.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                      if (window.innerWidth <= 768) break;
                    }
                    return rows;
                  })([], 0, 3)}
                </div>
              </TECarouselItem>
              <TECarouselItem
                itemID={2}
                className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                  {(function (rows, i, len) {
                    while (++i <= len) {
                      rows.push(
                        <div
                          key={i}
                          className="block hover:scale-90 scale-95 cursor-pointer duration-300 w-full max-w-[32rem] bg-base-200/40 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                          <div className="relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                              src="https://www.auto88group.com/image/car/1775/20240201113209.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                      if (window.innerWidth <= 768) break;
                    }
                    return rows;
                  })([], 0, 3)}
                </div>
              </TECarouselItem>
            </div>
          </TECarousel>
          {getCars ? (
            <>
              <div className="border-b border-base-300 py-4 mt-20 w-full flex justify-between">
                <p className="font-medium text-xl">Video</p>
                <p className="font-bold text-blue-600 text-xl">
                  Klick untuk menonton
                </p>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Merk</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.brand.name}
                </p>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Model</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.model.name}
                </p>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Tipe</p>
                <p className="font-bold text-xl uppercase">-</p>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Jenis</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.type.name}
                </p>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Silinder</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.cylinder.volume}
                </p>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Transmisi</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.transmission.name}
                </p>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Seri</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.series.name}
                </p>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Gardan</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.gear.name}
                </p>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Bahan Bakar</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.fuel.name}
                </p>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Warna</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.color.name}
                </p>
              </div>
              <h1 className="sm:text-xl mt-10 md:text-4xl w-full border-b border-base-300 mb-6 pb-4 border-dashed font-medium text-pretty">
                Deskripsi Kendaraan
              </h1>
              <p
                className="whitespace-pre-wrap prose text-pretty"
                style={{ whiteSpace: "pre-wrap" }}>
                {getCars.description}
              </p>
            </>
          ) : (
            <>
              <div className="border-b border-base-300 py-4 mt-20 w-full flex justify-between">
                <p className="font-medium text-xl">Video</p>
                <p className="font-bold text-blue-600 text-xl">
                  Klick untuk menonton
                </p>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Merk</p>
                <div className="font-bold text-xl uppercase">
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                </div>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Model</p>
                <div className="font-bold text-xl uppercase">
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                </div>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Tipe</p>
                <div className="font-bold text-xl uppercase">
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                </div>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Jenis</p>
                <div className="font-bold text-xl uppercase">
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                </div>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Silinder</p>
                <div className="font-bold text-xl uppercase">
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                </div>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Transmisi</p>
                <div className="font-bold text-xl uppercase">
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                </div>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Seri</p>
                <div className="font-bold text-xl uppercase">
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                </div>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Gardan</p>
                <div className="font-bold text-xl uppercase">
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                </div>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Bahan Bakar</p>
                <div className="font-bold text-xl uppercase">
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                </div>
              </div>
              <div className="border-b border-base-300 py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Warna</p>
                <div className="font-bold text-xl uppercase">
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                  <span className="loading text-red-700 loading-dots loading-md"></span>
                </div>
              </div>
              <h1 className="sm:text-xl mt-10 md:text-4xl w-full border-b border-base-300 mb-6 pb-4 border-dashed font-medium text-pretty">
                Deskripsi Kendaraan
              </h1>
              <div
                className="whitespace-pre-wrap prose text-pretty w-full bg-opacity-20 skeleton"
                style={{ whiteSpace: "pre-wrap" }}>
                <div className="flex justify-center">
                  <p className="skeleton h-10 w-1/2 mt-10 bg-opacity-30 rounded"></p>
                </div>
                <div className="space-y-3 mt-10 p-10">
                  <p className="skeleton h-6 w-1/2 bg-opacity-30 rounded"></p>
                  <p className="skeleton h-6 w-full bg-opacity-30 rounded"></p>
                  <p className="skeleton h-6 w-full bg-opacity-30 rounded"></p>
                  <p className="skeleton h-6 w-full bg-opacity-30 rounded"></p>
                  <p className="skeleton h-6 w-full bg-opacity-30 rounded"></p>
                  <p className="skeleton h-6 w-full bg-opacity-30 rounded"></p>
                  <p className="skeleton h-6 w-2/3 mt-10 bg-opacity-30 rounded"></p>
                  <p className="skeleton h-6 w-full bg-opacity-30 rounded"></p>
                  <p className="skeleton h-6 w-full bg-opacity-30 rounded"></p>
                  <p className="skeleton h-6 w-full bg-opacity-30 rounded"></p>
                  <p className="skeleton h-6 w-full bg-opacity-30 rounded"></p>
                  <p className="skeleton h-6 w-1/3 bg-opacity-30 rounded"></p>
                </div>
              </div>
            </>
          )}

          <div className="pb-32 mt-20 bg-transparent border-t border-dashed">
            <div className="mt-10 z-30 ">
              <div className="flex justify-center">
                <div
                  className="md:space-y-4 sm:text-xl whitespace-nowrap text-pretty p-4 font-bold text-center"
                  style={{ fontFamily: "'Marko One', sans-serif" }}>
                  <div className="md:space-y-10 md:text-3xl slide-in fade-in-left">
                    <h1 className="slide-in fade-in-left">Mobil Rekomendasi</h1>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 brounded-lg p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {getRecCars ? (
                    <ListNewCar getNewCars={getRecCars.data} />
                  ) : (
                    <ListNewCarSkeleton />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
