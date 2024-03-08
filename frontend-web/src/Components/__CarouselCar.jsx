import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import { Carousel, IconButton } from "@material-tailwind/react";

export const CarouselCar = () => {
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
        <div className="relative overflow-hidden grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {(function (rows, i, len) {
            while (++i <= len) {
              rows.push(
                <div key={i} className="flex justify-center">
                  <div>
                    <img
                      className="hover:scale-95 duration-300 cursor-pointer"
                      src="https://www.auto88group.com/image/kind/20230704093137.png"
                      alt=""
                    />
                    <p>1</p>
                  </div>
                </div>
              );
              // if (window.innerWidth <= 768) break;
            }
            return rows;
          })([], 0, 6)}
        </div>
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {(function (rows, i, len) {
            while (++i <= len) {
              rows.push(
                <div key={i} className="flex justify-center">
                  <img
                    className="hover:scale-95 duration-300 cursor-pointer"
                    src="https://www.auto88group.com/image/kind/20230704093137.png"
                    alt=""
                  />
                </div>
              );
              // if (window.innerWidth <= 768) break;
            }
            return rows;
          })([], 0, 6)}
        </div>
      </Carousel>
    </>
  );
};
