import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "../Components/__Carousel";
import { CarouselBlog } from "../Components/__CarouselBlog";
import { CarouselBlogSkeleton } from "../Components/__CarouselBlogSkeleton";
import { CarouselCar } from "../Components/__CarouselCar";
import { CarouselCarRecomen } from "../Components/__CarouselCarRecomen";
import { CarouselTestimony } from "../Components/__CarouselTestimony";
import { ListCarPromo } from "../Components/__ListCarPromo";
import { ListCarPromoSkeleton } from "../Components/__ListCarPromoSkeleton";
import { ListNewCar } from "../Components/__ListNewCar";
import { ListNewCarSkeleton } from "../Components/__ListNewCarSkeleton";
import { LoadingScreen } from "../Components/___LoadingScreen";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";
import { useStateContext } from "./../Providers/StateProvider";
import { fetchNewCars } from "./Service/__FetchNewCar";

export const Home = () => {
  const navRedirect = useNavigate();
  const { state, setState } = useStateContext();
  const { getNewCars, getCarPromos, getBlog } = state;
  const { pageNewCar } = state;

  const handleLoadMoreNewCars = async () => {
    const nextPage = { page: pageNewCar.page, perPage: pageNewCar.perPage + 6 };
    setState((prevState) => ({
      ...prevState,
      pageNewCar: nextPage,
    }));

    try {
      const newCars = await fetchNewCars(nextPage);
      setState((prevState) => ({
        ...prevState,
        getNewCars: newCars,
      }));
    } catch (error) {
      console.error("Error fetching new cars:", error);
    }
  };
  const [loadFech, setLoadFetch] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoadFetch(true);
      try {
        const newCars = await fetchNewCars(pageNewCar);
        setState((prevState) => ({
          ...prevState,
          getNewCars: newCars,
        }));
        setLoadFetch(false);
      } catch (error) {
        setLoadFetch(false);
        console.error("Error fetching new cars:", error);
      }
    };
    fetchData();
  }, [pageNewCar, setState]);
  const carouselRef = useRef(null);

  return (
    <>
      <div
        className="w-full -z-10 px-20 top-0 -mb-20"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundSize: "cover",
          height: "40vh",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b mt-10 flex justify-center from-transparent to-black">
        <div className="md:p-20 p-8 md:rounded-xl">
          <div className="text-white flex justify-center items-center">
            <div
              className="md:space-y-4 text-3xl sm:text-4xl md:text-5xl font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <h1>Cari Mobil Bekas Impian Sekarang</h1>
            </div>
          </div>
          <p className="md:mt-10 mt-4 sm:text-xs md:text-lg font-medium text-white text-center">
            Pencarian unit mobil dan transaksional akan kami arahkan ke mobbi.
            Kenalan dulu yuk!
          </p>
        </div>
      </div>
      <div className=" z-40 w-11/12  md:container md:mx-auto md:px-40">
        <div
          className="shadow-2xl md:rounded-badge element fade-in-left"
          ref={carouselRef}>
          <Carousel />
        </div>
      </div>
      <div className="bg-white pb-32">
        <div className="w-11/12  mx-auto mt-10 z-30 ">
          <div className="flex justify-center">
            <div
              className="md:space-y-4 sm:text-xl whitespace-nowrap  text-gray-800 p-4  font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div className="md:p-10 md:space-y-10 md:text-4xl lg:text-4xl element">
                <h1>Mobil Rekomendasi</h1>
              </div>
            </div>
          </div>
          <div className="flex element justify-center gap-4 bg-base-200 rounded-lg bg-opacity-20 p-4">
            <CarouselCarRecomen />
          </div>
        </div>
      </div>
      <div
        className="w-full -z-10 md:px-20"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: "cover", // Ensure the background image covers the entire container
          height: "50vh",
        }}>
        <div
          className="md:space-y-4 element sm:text-xl whitespace-nowrap md:text-4xl text-white p-4 lg:text-4xl font-bold text-center"
          style={{ fontFamily: "'Marko One', sans-serif" }}>
          <div className="md:p-10 md:space-y-10 md:text-4xl lg:text-4xl element my-10">
            <h1>Mobil Berdasarkan Jenis</h1>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <CarouselCar />
          </div>
          <div
            onClick={() => navRedirect("/mobil")}
            className="text-xs text-red-600 cursor-pointer font-bold flex justify-center items-center gap-1 ">
            <div className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
              <i className="fas fa-angle-down"></i>
              <p>Selengkapnya</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white pb-32">
        <div className="w-11/12  mx-auto mt-10 z-30 ">
          <div className="flex justify-center">
            <div
              className="md:space-y-4 sm:text-xl whitespace-nowrap  text-gray-800 p-4  font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div
                className="md:p-10 md:space-y-10 md:text-4xl lg:text-4xl element"
                ref={carouselRef}>
                <h1>Mobil Promosi</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 ">
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
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
      <div className="bg-white pb-32">
        <div className="w-11/12  mx-auto mt-10 z-30 ">
          <div className="flex justify-center">
            <div
              className="md:space-y-4 sm:text-xl whitespace-nowrap  text-gray-800 p-4  font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div
                className="md:p-10 md:space-y-10 md:text-4xl lg:text-4xl element"
                ref={carouselRef}>
                <h1>Mobil Terbaru</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {getNewCars ? (
                <ListNewCar getNewCars={getNewCars} />
              ) : (
                <ListNewCarSkeleton />
              )}
            </div>
          </div>
          {loadFech && <LoadingScreen />}
          {getNewCars && getNewCars.data.length < getNewCars.total && (
            <div className="text-xs text-red-600 cursor-pointer mt-2 font-bold flex justify-center items-center gap-1 ">
              <div
                onClick={handleLoadMoreNewCars}
                className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
                <i className="fas fa-angle-down"></i>
                <p>Selengkapnya</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white pb-32">
        <div className="mt-10 z-30 ">
          <div className="relative">
            <div
              className="w-ful md:px-20 px-2 mt-10 -mb-80"
              style={{
                backgroundImage: `url(${bannerImg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
                backgroundSize: "cover", // Ensure the background image covers the entire container
                height: "40vh",
              }}
            />
            <div
              ref={carouselRef}
              className="md:space-y-4 element text-xl whitespace-nowrap md:text-3xl text-white p- font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div
                className="md:p-10 mt-2 space-y-10 md:text-4xl lg:text-4xl element"
                ref={carouselRef}>
                <h1>Berita Terkini</h1>
                <div className="flex justify-center">
                  {getBlog ? (
                    <CarouselBlog getBlog={getBlog} />
                  ) : (
                    <CarouselBlogSkeleton />
                  )}
                </div>
              </div>
            </div>
            <div className="text-xs mt-20 text-red-600 cursor-pointer font-bold flex justify-center items-center gap-1 ">
              <div className="flex justify-center items-center gap-1 w-fit border-b hover:text-red-700 duration-300 hover:bg-black hover:bg-opacity-5 p-3">
                <i className="fas fa-angle-down"></i>
                <p>Selengkapnya</p>
              </div>
            </div>
          </div>
          <div className="w-full md:px-20 mt-20">
            <div
              ref={carouselRef}
              s
              className="md:space-y-4 element sm:text-xl whitespace-nowrap md:text-4xl text-gray-800 p-4 lg:text-4xl font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div className="md:p-10 md:space-y-10">
                <h1>Testimoni Konsumen</h1>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
