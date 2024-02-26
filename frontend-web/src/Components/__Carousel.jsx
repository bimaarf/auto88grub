import { Carousel, IconButton } from "@material-tailwind/react";
import React from "react";

export const CarouselSl = ({ getSliders }) => {
  return (
    <>
      <Carousel
        loop
        autoplay
        className="rounded-xl w-full md:scale-150 mx-auto"
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
        {getSliders.map((item, key) => (
          <div key={key} className="relative h-full w-full">
            <img
              loading="eager"
              src={`${process.env.REACT_APP_API}storage/${item.image}`}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </Carousel>

      {/* <TECarousel showControls showIndicators ride="carousel" className="">
        <div className="relative w-full scale-125 overflow-hidden after:clear-both after:block after:content-[''] rounded-xl">
          <TECarouselItem
            itemID={1}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
            <img
              draggable={false}
              loading="eager"
              src="https://www.auto88group.com/image/slider/20240218013231.jpg"
              className="block w-full object-contain"
              alt="..."
            />
          </TECarouselItem>
          <TECarouselItem
            itemID={2}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
            <img
              draggable={false}
              src={require("../Images/Banner/banner-home.jpg")}
              loading="eager"
              className="block w-full object-contain"
              alt="..."
            />
          </TECarouselItem>
        </div>
      </TECarousel> */}
    </>
  );
};
