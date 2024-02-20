import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import "../App.css";
export const CarouselBlog = ({ getBlog }) => {
  return (
    <>
      <TECarousel showControls showIndicators ride="carousel">
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {getBlog.map((slide, keySlide) => (
            <TECarouselItem
              key={keySlide}
              itemID={keySlide + 1}
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {slide.map((item, key) => (
                  <div
                    key={key}
                    className="block active:scale-95 cursor-pointer duration-300 rounded  max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="flex justify-center">
                      <div className="relative bg-fixed rounded bg-gradient-to-r from-base-300 bg-base-300 max-w-xs overflow-hidden bg-cover bg-no-repeat">
                        <div className="z-10 absolute m-2">
                          <div className="flex w-full justify-start items-center gap-2 bg-gradient-to-r from-black bg-red-700 bg-opacity-50 p-1 rounded-xl">
                            <img
                              className="rounded-full w-6"
                              src={require("../Images/Banner/logo-tfnCopy.png")}
                              alt=""
                            />
                            <h3 className="logo-text-animation-by-bimarf w-full block font-bold text-xs">
                              AUTO88GROUP
                            </h3>
                          </div>
                        </div>
                        <img
                          src="https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div
                      className="flex justify-start items-center gap-1 px-4 text-orange-500"
                      style={{ fontSize: 10 }}>
                      <i className="fas fa-tag"></i>
                      <p>{item.category.name}</p>
                    </div>
                    <div className="px-4 pb-8">
                      <h1 className="font-bold hover:text-orange-500 whitespace-pre-wrap text-start text-gray-800 text-sm">
                        {item.title.length > 50
                          ? item.title.slice(0, 50) + "..."
                          : item.title}
                      </h1>
                      <p className="text-gray-800 font-medium text-xs whitespace-pre-wrap text-start">
                        {item.content.length > 100
                          ? item.content.slice(0, 100) + "..."
                          : item.content}
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
            </TECarouselItem>
          ))}
        </div>
      </TECarousel>
    </>
  );
};
