import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import "../App.css";
import { Carousel, IconButton } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
export const CarouselBlog = ({ getBlog }) => {
  const location = useLocation();
  const navRedirect = useNavigate();
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
        {getBlog.map((slide, keySlide) => (
          <div key={keySlide} itemID={keySlide + 1}>
            <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-4">
              {slide.map((item, key) => (
                <div
                  key={key}
                  onClick={() => window.open(item.link)}
                  className="block active:scale-95 cursor-pointer duration-300 rounded  max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                  <div className="flex justify-center mt-4">
                    <div className="relative bg-fixed rounded bg-gradient-to-r from-black bg-black max-w-xs overflow-hidden bg-cover bg-no-repeat">
                      <div className="z-10 absolute m-2">
                        <div className="flex w-full justify-start items-center gap-2 bg-gradient-to-r from-black bg-black/25 bg-opacity-50 p-1 rounded-xl">
                          <img
                            className="rounded-full w-6"
                            src={require("../Images/Banner/logo-tfnCopy.png")}
                            alt=""
                          />
                          <h3 className="logo-text-animation-by-bimarf animate-pulse w-full block font-bold text-xs">
                            AUTO88GROUP
                          </h3>
                        </div>
                      </div>
                      <img
                        loading="lazy"
                        alt=""
                        src={item.thumbnail}
                        className="max-w-xs w-80 hover:opacity-60 opacity-70 transition duration-300 ease-in-out hover:scale-105 object-cover h-44 w-object-left-top"
                      />
                    </div>
                  </div>
                  <div className="pt-5 px-7 bg-white shadow-sm h-32">
                    <h1 className="font-bold whitespace-pre-wrap text-start text-gray-800 text-sm">
                      {item.title.length > 30
                        ? item.title.slice(0, 30) + "..."
                        : item.title}
                    </h1>
                    <p className="text-gray-800 font-medium text-xs whitespace-pre-wrap text-start">
                      {item.description.length > 100
                        ? item.description.slice(0, 100) + "..."
                        : item.description}
                    </p>

                    <div className="relative bottom-0 right-0">
                      <p
                        className="text-gray-400 text-end"
                        style={{ fontSize: 10 }}>
                        {item.created_at}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
};
