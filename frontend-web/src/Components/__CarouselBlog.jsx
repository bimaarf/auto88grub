import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";

export const CarouselBlog = ({ getBlog }) => {
  return (
    <>
      <TECarousel showControls showIndicators ride="carousel">
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {getBlog.map((slide, keySlide) => (
            <TECarouselItem
              itemID={keySlide + 1}
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
              <div className="grid sm:grid-cols-1 md:grid-cols-5 gap-4">
                {slide.map((item, key) => (
                  <div className="block active:scale-95 cursor-pointer duration-300 w-full max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                      <img
                        src="https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                        alt=""
                      />
                    </div>
                    <div className="p-6">
                      <h1 className="font-bold hover:text-orange-500 whitespace-pre-wrap text-start text-gray-800 text-sm">
                        {item.title}
                      </h1>
                      <p className="text-gray-800 font-medium text-xs whitespace-pre-wrap text-start">
                        {item.content.length > 100
                          ? item.content.slice(0, 100) + "..."
                          : item.content}
                      </p>
                      <div className="absolute bottom-0">
                        <div className="flex items-center gap-4 justify-between text-xs text-orange-500 mt-2">
                          <div className="flex justify-start items-center gap-1">
                            <i className="fas fa-tag"></i>
                            <p>{item.category.name}</p>
                          </div>
                          <p className="skeleton h-4 w-20 bg-gray-100"></p>
                        </div>
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
