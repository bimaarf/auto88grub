import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CarouselSl } from "../Components/__Carousel";
import { CarouselBlog } from "../Components/__CarouselBlog";
import { CarouselBlogSkeleton } from "../Components/__CarouselBlogSkeleton";
import { CarouselTestimony } from "../Components/__CarouselTestimony";
import { CarouselTestimonySkeleton } from "../Components/__CarouselTestimonySkeleton";
import { ListCarPromo } from "../Components/__ListCarPromo";
import { ListCarPromoSkeleton } from "../Components/__ListCarPromoSkeleton";
import { ListNewCar } from "../Components/__ListNewCar";
import { ListNewCarSkeleton } from "../Components/__ListNewCarSkeleton";

import { Footer } from "../Components/Footer";
import { CarouselSkeleton } from "../Components/__CarouselSkeleton";
import { useStateContext } from "./../Providers/StateProvider";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { KindItem } from "../Components/__KindItem";

export const Home = () => {
  const navRedirect = useNavigate();
  const { state } = useStateContext();
  const {
    getNewCars,
    getCarPromos,
    getBlog,
    getTestimony,
    getSliders,
    getRecCars,
    getKind,
  } = state;
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // Change this value based on your requirement
    });

    const elements = document.querySelectorAll(".slide-in");
    elements.forEach((element) => observer.observe(element));
    // window.scrollTo(0, 0);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HighLightHeader />
      <div className="z-40 md:w-11/12 md:container sm:mx-1 md:mx-auto mt-40 md:px-40 bg-transparent">
        <div
          className="shadow-2xl md:rounded-badge fade-in-left mt-20"
          ref={carouselRef}>
          {getSliders ? (
            <CarouselSl getSliders={getSliders} />
          ) : (
            <CarouselSkeleton />
          )}
        </div>
      </div>
      <div className="mt-40 rounded-t-xl md:container md:mx-auto">
        <div className="md:w-11/12 mx-auto mt-10 z-30 ">
          <div className="flex justify-center">
            <div
              className="md:space-y-4 sm:text-xl whitespace-nowrap p-4 font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div className="md:p-10 md:space-y-10 md:text-4xl lg:text-4xl">
                <h1>Mobil Rekomendasi</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 brounded-lg p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {getRecCars ? (
                <ListNewCar getNewCars={getRecCars.data} />
              ) : (
                <ListNewCarSkeleton />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:container overflow-hidden mb-10">
        <div className="overflow-x-auto pb-2 w-full">{/* <BarMenu /> */}</div>
      </div>

      <div className="bg-base-300/10">
        <div
          className="md:space-y-4 sm:text-xl whitespace-nowrap md:container md:mx-auto p-4 font-bold text-center"
          style={{ fontFamily: "'Marko One', sans-serif" }}>
          <div
            className="md:p-10 md:space-y-10 md:text-4xl lg:text-4xl element"
            ref={carouselRef}>
            <h1>Mobil Berdasarkan Jenis</h1>
          </div>
          <div className="flex justify-start items-center gap-4 overflow-x-auto">
            {getKind && <KindItem getKind={getKind} />}
          </div>
          <div
            onClick={() => navRedirect("/mobil")}
            className="text-xs text-red-600 cursor-pointer font-bold flex justify-center items-center gap-1">
            <div className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
              <i className="fas fa-angle-down"></i>
              <p>Selengkapnya</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 bg-base-100">
        <div className="w-11/12 mx-auto mt-10 z-30 slate-100 md:container md:mx-auto">
          <div className="flex justify-center">
            <div
              className="md:space-y-4 sm:text-xl whitespace-nowrap  p-4  font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div
                className="md:p-10 slide-in fade-in-left md:space-y-10 md:text-4xl lg:text-4xl element"
                ref={carouselRef}>
                <h1>Mobil Promosi</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              ref={carouselRef}>
              {getCarPromos ? (
                <ListCarPromo getCarPromos={getCarPromos} />
              ) : (
                <ListCarPromoSkeleton />
              )}
            </div>
          </div>
          <div
            onClick={() => navRedirect("/promo")}
            className="text-xs text-red-600 cursor-pointer mt-2 font-bold flex justify-center items-center gap-1 ">
            <div className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
              <i className="fas fa-angle-down"></i>
              <p>Selengkapnya</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 bg-base-300/10 w-full">
        <div className="md:mx-auto sm:mx-2 mt-10 z-30 slate-100 md:container">
          <div className="flex justify-center">
            <div
              className="md:space-y-4 sm:text-xl whitespace-nowrap  p-4  font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div
                className="md:p-10 slide-in fade-in-left md:space-y-10 md:text-4xl lg:text-4xl element"
                ref={carouselRef}>
                <h1 className="slide-in fade-in-left">Mobil Terbaru</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {getNewCars ? (
                <ListNewCar getNewCars={getNewCars} />
              ) : (
                <ListNewCarSkeleton />
              )}
            </div>
          </div>
          {getNewCars && getNewCars.data.length < getNewCars.total && (
            <div className="text-xs text-red-600 cursor-pointer mt-2 font-bold flex justify-center items-center gap-1 ">
              <div
                onClick={() => navRedirect("/mobil")}
                className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
                <i className="fas fa-angle-down"></i>
                <p>Selengkapnya</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="z-30 bg-base-300/10">
        <div className="relative">
          {/* <div
            className="w-full md:p-20 sm:p-2"
            style={{
              backgroundImage: `url(${bannerImg})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
              backgroundSize: "cover",
              height: "50vh",
            }}></div> */}

          <div
            ref={carouselRef}
            className="md:space-y-4 md:container md:mx-auto text-xl whitespace-nowrap md:text-3xl font-bold text-center mb-10"
            style={{ fontFamily: "Marko One', sans-serif" }}>
            <div
              className="fade-in-left md:space-y-10 md:text-4xl lg:text-4xl element"
              ref={carouselRef}>
              <h1>Berita Terkini</h1>
            </div>
            <div className="flex justify-center">
              {getBlog ? (
                <CarouselBlog getBlog={getBlog} />
              ) : (
                <CarouselBlogSkeleton />
              )}
            </div>
            {/* <div className="text-xs mt-20 text-red-600 cursor-pointer font-bold flex justify-center items-center gap-1 ">
                <div className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
                  <i className="fas fa-angle-down"></i>
                  <p>Selengkapnya</p>
                </div>
              </div> */}
          </div>
          <div className="w-full md:px-20 bg-base-100">
            <div
              ref={carouselRef}
              s
              className="md:space-y-4 md:container md:mx-auto sm:text-xl whitespace-nowrap md:text-4xl p-4 lg:text-4xl font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div
                className="md:p-10 md:text-4xl lg:text-4xl element"
                ref={carouselRef}>
                <h1>Testimoni</h1>
              </div>
              <div className="md:space-y-10 md:text-4xl lg:text-4xl ">
                <div className="flex justify-center">
                  {getTestimony ? (
                    <CarouselTestimony />
                  ) : (
                    <CarouselTestimonySkeleton />
                  )}
                </div>
                <div className="text-xs text-red-600 cursor-pointer mt-2 font-bold flex justify-center items-center gap-1">
                  <div
                    onClick={() => navRedirect("/testimoni")}
                    className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
                    <i className="fas fa-angle-down"></i>
                    <p>Lihat Lebih</p>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
