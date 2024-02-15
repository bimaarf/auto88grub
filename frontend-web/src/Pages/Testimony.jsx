import React from "react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";
import { CarouselCar } from "../Components/__CarouselCar";
import { CarouselTestimony } from "../Components/__CarouselTestimony";

export const Testimony = () => {
  return (
    <>
      <div
        className="w-full -z-10 px-20 relative top-0"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundSize: "cover", // Ensure the background image covers the entire container
          height: "40vh",
          // filter: "blur(2px)", // Apply blur effect to the image
        }}>
        <div className="absolute inset-0 bg-gradient-to-b flex justify-center from-transparent to-black">
          <div className="md:p-20 p-8 md:rounded-xl">
            <div className="text-white flex justify-center items-center align-middle">
              <div
                className="md:space-y-4 font-bold text-center align-middle flex  bg-black px-10 py-4 bg-opacity-20"
                style={{ fontFamily: "'Marko One', sans-serif" }}>
                <div className="space-y-4">
                  <h1 className="text-white text-3xl capitalize">
                    Konsumen Yang Berbahagia
                  </h1>
                  <h1 className=" text-5xl">Testimoni</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-44 bg-white rounded-xl -mt-20 p-10 md:p-20 mx-auto">
        <div className="flex justify-center">
          <CarouselTestimony />
        </div>
        <div className="text-xs mt-2 text-red-600 cursor-pointer font-bold flex justify-center items-center gap-1 ">
          <div className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
            <i className="fas fa-angle-down"></i>
            <p>Selengkapnya</p>
          </div>
        </div>
      </div>
    </>
  );
};
