import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";

export const CarouselCarRecomen = () => {
  return (
    <TECarousel showControls showIndicators ride="carousel">
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] ">
        <TECarouselItem
          itemID={1}
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
          <div className="grid sm:grid-cols-1 md:grid-cols-5 gap-4">
            {(function (rows, i, len) {
              while (++i <= len) {
                rows.push(
                  <div
                    key={i}
                    className="block  w-full max-w-[32rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                      <img
                        className="rounded-t-lg"
                        src={require("../Images/Cars/car1.jpg")}
                        alt=""
                      />
                    </div>
                    <div className="p-6">
                      <h1 className="font-bold text-gray-800 text-sm">
                        DAIHATSU ALL NEW AYLA (WHITE) TIPE X 1.0 M/T (2023)....
                      </h1>
                      <p className="text-gray-800 font-medium text-right">
                        Rp 1x4.000.000
                      </p>
                    </div>
                  </div>
                );
                // Break loop if mobile screen and only add one item
                if (window.innerWidth <= 768) break;
              }
              return rows;
            })([], 0, 5)}
          </div>
        </TECarouselItem>
        <TECarouselItem
          itemID={2}
          className="relative float-none -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
          <div className="grid sm:grid-cols-1 md:grid-cols-5 gap-4">
            {(function (rows, i, len) {
              while (++i <= len) {
                rows.push(
                  <div
                    key={i}
                    className="block  w-full max-w-[32rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                      <img
                        className="rounded-t-lg"
                        src={require("../Images/Cars/car1.jpg")}
                        alt=""
                      />
                    </div>
                    <div className="p-6">
                      <h1 className="font-bold text-gray-800 text-sm">
                        DAIHATSU ALL NEW AYLA (WHITE) TIPE X 1.0 M/T (2023)....
                      </h1>
                      <p className="text-gray-800 font-medium text-right">
                        Rp 1x4.000.000
                      </p>
                    </div>
                  </div>
                );
                // Break loop if mobile screen and only add one item
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
