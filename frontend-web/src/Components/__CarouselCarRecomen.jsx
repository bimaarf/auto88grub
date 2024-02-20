import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";

export const CarouselCarRecomen = () => {
  return (
    <TECarousel showControls showIndicators ride="carousel">
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        <TECarouselItem
          itemID={1}
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
          <div className="grid sm:grid-cols-1 md:grid-cols-5 gap-4">
            {(function (rows, i, len) {
              while (++i <= len) {
                rows.push(
                  <div
                    key={i}
                    className="block active:scale-90 hover:scale-95 cursor-pointer duration-300 w-full max-w-[32rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                      <img
                        className="rounded-t-lg"
                        src="https://www.auto88group.com/image/car/1775/20240201113209.jpg"
                        alt=""
                      />
                    </div>
                    <div className="p-6">
                      <h1 className="font-bold text-gray-800 text-sm md:text-md">
                        DAIHATSU ALL NEW AYLA (WHITE) TIPE X 1.0 M/T (2023)....
                      </h1>
                      <p className="text-gray-800 font-light text-xs md:text-md text-left">
                        HATCHBACK / - / PREMIUM
                      </p>

                      <p className="text-gray-800 text-xs md:text-md font-medium line-through text-right">
                        Rp 1x4.000.000
                      </p>
                      <p className="text-gray-800 text-sm md:text-xl font-bold text-right">
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
                if (window.innerWidth <= 768) break;
              }
              return rows;
            })([], 0, 5)}
          </div>
        </TECarouselItem>
        <TECarouselItem
          itemID={2}
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
          <div className="grid sm:grid-cols-1 md:grid-cols-5 gap-4">
            {(function (rows, i, len) {
              while (++i <= len) {
                rows.push(
                  <div
                    key={i}
                    className="block active:scale-95 cursor-pointer duration-300 w-full max-w-[32rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                      <img
                        className="rounded-t-lg"
                        src="https://www.auto88group.com/image/car/1775/20240201113209.jpg"
                        alt=""
                      />
                    </div>
                    <div className="p-6">
                      <h1 className="font-bold text-gray-800 text-sm md:text-md">
                        DAIHATSU ALL NEW AYLA (WHITE) TIPE X 1.0 M/T (2023)....
                      </h1>
                      <p className="text-gray-800 font-light text-xs md:text-md text-left">
                        HATCHBACK / - / PREMIUM
                      </p>

                      <p className="text-gray-800 text-xs md:text-md font-medium line-through text-right">
                        Rp 1x4.000.000
                      </p>
                      <p className="text-gray-800 text-sm md:text-xl font-bold text-right">
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
                if (window.innerWidth <= 768) break;
              }
              return rows;
            })([], 0, 5)}
          </div>
        </TECarouselItem>
      </div>
    </TECarousel>
  );
};
