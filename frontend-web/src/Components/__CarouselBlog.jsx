import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";

export const CarouselBlog = () => {
  return (
    <>
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
                      className="block hover:scale-105 cursor-pointer duration-300 cursor-pointer w-full max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                      <div className="relative overflow-hidden bg-cover bg-no-repeat">
                        <img
                          src="https://img.antaranews.com/cache/800x533/2024/02/10/gm-logos-reuters-1.jpg"
                          alt=""
                        />
                      </div>
                      <div className="p-6">
                        <h1 className="font-bold hover:text-orange-500 whitespace-pre-wrap text-start text-gray-800 text-sm">
                          Daihatsu bukukan penjualan ritel 16.976 unit mobil
                          pada Januari...
                        </h1>
                        <p className="text-gray-800 font-medium text-xs whitespace-pre-wrap text-start">
                          Daihatsu membukukan raihan penjualan ritel yang
                          positif di Indonesia pada Januari, dengan capaian
                          16.976 unit, atau
                        </p>
                        <div className="flex justify-between text-xs text-orange-500 mt-2">
                          <div className="flex justify-start items-center gap-1">
                            <i className="fas fa-tag"></i>
                            <p>Technology</p>
                          </div>
                          <p>5 Februari 2024 11:34</p>
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
                      className="block cursor-pointer w-full max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                      <div className="relative overflow-hidden bg-cover bg-no-repeat">
                        <img
                          src="https://img.antaranews.com/cache/800x533/2024/02/10/gm-logos-reuters-1.jpg"
                          alt=""
                        />
                      </div>
                      <div className="p-6">
                        <h1 className="font-bold hover:text-orange-500 whitespace-pre-wrap text-start text-gray-800 text-sm">
                          Daihatsu bukukan penjualan ritel 16.976 unit mobil
                          pada Januari...
                        </h1>
                        <p className="text-gray-800 font-medium text-xs whitespace-pre-wrap text-start">
                          Daihatsu membukukan raihan penjualan ritel yang
                          positif di Indonesia pada Januari, dengan capaian
                          16.976 unit, atau
                        </p>
                        <div className="flex justify-between text-xs text-orange-500 mt-2">
                          <div className="flex justify-start items-center gap-1">
                            <i className="fas fa-tag"></i>
                            <p>Technology</p>
                          </div>
                          <p>5 Februari 2024 11:34</p>
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
    </>
  );
};
