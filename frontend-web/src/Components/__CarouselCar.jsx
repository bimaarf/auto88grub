import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";

export const CarouselCar = () => {
  return (
    <>
      <TECarousel showControls showIndicators ride="carousel">
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <TECarouselItem
            itemID={1}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
            <div className="grid sm:grid-cols-1 md:grid-cols-10 gap-4">
              {(function (rows, i, len) {
                while (++i <= len) {
                  rows.push(
                    <img
                      key={i}
                      className="hover:scale-105 duration-300 cursor-pointer"
                      src={require("../Images/Cars/download.jfif")}
                      alt=""
                    />
                  );
                  if (window.innerWidth <= 768) break;
                }
                return rows;
              })([], 0, 10)}
            </div>
          </TECarouselItem>
          <TECarouselItem
            itemID={2}
            className="relative float-left hidden -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
            <div className="grid sm:grid-cols-1 md:grid-cols-10 gap-4">
              {(function (rows, i, len) {
                while (++i <= len) {
                  rows.push(
                    <img
                      key={i}
                      className="hover:scale-105 duration-300 cursor-pointer"
                      src={require("../Images/Cars/download.jfif")}
                      alt=""
                    />
                  );
                  if (window.innerWidth <= 768) break;
                }
                return rows;
              })([], 0, 10)}
            </div>
          </TECarouselItem>
          <TECarouselItem
            itemID={3}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
            <div className="grid sm:grid-cols-1 md:grid-cols-10 gap-4">
              {(function (rows, i, len) {
                while (++i <= len) {
                  rows.push(
                    <img
                      key={i}
                      className="hover:scale-105 duration-300 cursor-pointer"
                      src={require("../Images/Cars/download.jfif")}
                      alt=""
                    />
                  );
                  if (window.innerWidth <= 768) break;
                }
                return rows;
              })([], 0, 10)}
            </div>
          </TECarouselItem>
        </div>
      </TECarousel>
    </>
  );
};
