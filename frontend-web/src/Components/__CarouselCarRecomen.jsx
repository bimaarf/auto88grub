import { Carousel, IconButton } from "@material-tailwind/react";
import React from "react";

export const CarouselCarRecomen = () => {
  return (
    <>
      <Carousel
        loop
        autoplay
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4 bg-black bg-opacity-20 hover:bg-black/50 duration-300 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-black bg-opacity-20 hover:bg-black/50 duration-300 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}>
        <div className="relative grid grid-cols-2 md:grid-cols-3 gap-4">
          {(function (rows, i, len) {
            while (++i <= len) {
              rows.push(
                <div
                  key={i}
                  className="block border-transparent border hover:border-red-500 active:scale-95 cursor-pointer duration-300 w-full mb-3 max-w-[32rem] rounded-lg bg-base-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                      className="rounded-t-lg"
                      src="https://www.auto88group.com/image/car/1775/20240201113209.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="font-bold text-pretty text-sm md:text-md">
                      DAIHATSU ALL NEW AYLA (WHITE) TIP....
                    </h1>
                    <p className="text-pretty font-light text-xs md:text-md text-left">
                      HATCHBACK / - / PREMIUM
                    </p>
                    <p className="text-pretty text-sm md:text-xl font-bold text-right">
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
              // if (window.innerWidth <= 768) break;
            }
            return rows;
          })([], 0, 3)}
        </div>
        <div className="relative grid grid-cols-2 md:grid-cols-3 gap-4">
          {(function (rows, i, len) {
            while (++i <= len) {
              rows.push(
                <div
                  key={i}
                  className="block border-transparent border hover:border-red-500 active:scale-95 cursor-pointer duration-300 w-full mb-3 max-w-[32rem] rounded-lg bg-base-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                      className="rounded-t-lg"
                      src="https://www.auto88group.com/image/car/1775/20240201113209.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="font-bold text-pretty text-sm md:text-md">
                      DAIHATSU ALL NEW AYLA (WHITE) TIP....
                    </h1>
                    <p className="text-pretty font-light text-xs md:text-md text-left">
                      HATCHBACK / - / PREMIUM
                    </p>
                    <p className="text-pretty text-sm md:text-xl font-bold text-right">
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
              // if (window.innerWidth <= 768) break;
            }
            return rows;
          })([], 0, 3)}
        </div>
      </Carousel>
    </>
  );
};
