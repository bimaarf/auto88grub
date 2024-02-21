import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { fetchCarPreview } from "./Service/__FetchCarPreview";

export const CarPreview = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

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
      <div className="bg-white pb-32 md:container sm:mx-2 md:mx-auto">
        <div className="w-11/12  mx-auto mt-10 z-30 relative">
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
                          className="block hover:scale-90 scale-95 cursor-pointer duration-300 w-full max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
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
                          className="block hover:scale-90 scale-95 cursor-pointer duration-300 w-full max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
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
          {getCars && (
            <>
              <div className="border-b py-4 mt-20 w-full flex justify-between">
                <p className="font-medium text-xl">Video</p>
                <p className="font-bold text-blue-600 text-xl">
                  Klick untuk menonton
                </p>
              </div>
              <div className="border-b py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Merk</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.brand.name}
                </p>
              </div>
              <div className="border-b py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Model</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.model.name}
                </p>
              </div>
              <div className="border-b py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Tipe</p>
                <p className="font-bold text-xl uppercase">-</p>
              </div>
              <div className="border-b py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Jenis</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.type.name}
                </p>
              </div>
              <div className="border-b py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Silinder</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.cylinder.volume}
                </p>
              </div>
              <div className="border-b py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Transmisi</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.transmission.name}
                </p>
              </div>
              <div className="border-b py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Seri</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.series.name}
                </p>
              </div>
              <div className="border-b py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Gardan</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.gear.name}
                </p>
              </div>
              <div className="border-b py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Bahan Bakar</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.fuel.name}
                </p>
              </div>
              <div className="border-b py-4 w-full flex justify-between">
                <p className="font-medium text-xl">Warna</p>
                <p className="font-bold text-xl uppercase">
                  {getCars.color.name}
                </p>
              </div>
              <h1 className="sm:text-xl mt-10 md:text-4xl w-full border-b mb-6 pb-4 border-dashed font-medium text-gray-800">
                Deskripsi Kendaraan
              </h1>
              <p
                className="whitespace-pre-wrap"
                style={{ whiteSpace: "pre-wrap" }}>
                {getCars.description}
              </p>
            </>
          )}

          <div className="flex justify-center">
            <h1 className="sm:text-xl mt-10 md:text-4xl w-full border-b mb-6 pb-4 border-dashed font-medium text-gray-800">
              Mobil Yang Serupa
            </h1>
          </div>
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
                          className="block hover:scale-90 scale-95 cursor-pointer duration-300 w-full max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
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
                          className="block hover:scale-90 scale-95 cursor-pointer duration-300 w-full max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                          <div className="relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                              src="https://www.auto88group.com/image/car/1769/320240215151846.jpg"
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
        </div>
      </div>
    </>
  );
};
