import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";

export const CarouselTestimonySkeleton = () => {
  return (
    <>
      <TECarousel showControls showIndicators ride="carousel">
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <TECarouselItem
            itemID={1}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
            <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-4">
              {(function (rows, i, len) {
                while (++i <= len) {
                  rows.push(
                    <div
                      key={i}
                      className="block active:scale-95 cursor-pointer duration-300 w-full max-w-[32rem] bg-base-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                      <div className="relative overflow-hidden bg-cover flex bg-no-repeat justify-center items-center">
                        <img
                          className="skeleton animate-ping"
                          src="https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                          alt=""
                        />
                        <i className="fas fa-spinner align-middle self-center absolute text-gray-300 animate-spin"></i>
                      </div>
                      <div className="p-6 text-center">
                        <p className="skeleton h-4 w-full"></p>
                        <p className="skeleton mt-2 h-4 w-full"></p>
                        <div className="flex justify-center">
                          <p className="skeleton mt-2 h-4 w-1/2"></p>
                        </div>
                        <article className="prose mt-2 prose-slate text-sm"></article>
                      </div>
                    </div>
                  );
                  if (window.innerWidth <= 768) break;
                }
                return rows;
              })([], 0, 4)}
            </div>
          </TECarouselItem>
        </div>
      </TECarousel>
    </>
  );
};
