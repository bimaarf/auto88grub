import React, { useRef, useEffect } from "react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";
import { Carousel } from "../Components/__Carousel";
import { CarouselCar } from "../Components/__CarouselCar";
import { CarouselCarRecomen } from "../Components/__CarouselCarRecomen";
import "../App.css"; // Import your CSS file containing the animations
import { CarouselBlog } from "../Components/__CarouselBlog";
import { CarouselTestimony } from "../Components/__CarouselTestimony";

export const Home = () => {
  const ref = useRef(null);

  useEffect(() => {
    const fadeInOnScroll = () => {
      const element = ref.current;
      if (element) {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight) {
          element.classList.add("fade-in-left");
        }
      }
    };

    window.addEventListener("scroll", fadeInOnScroll);
    return () => window.removeEventListener("scroll", fadeInOnScroll);
  }, []);

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
            <div className="text-white flex justify-center items-center">
              <div
                className="md:space-y-4 text-3xl font-bold text-center"
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
      </div>
      <div className="relative z-40 w-11/12  md:container mx-auto -mt-40 md:-mt-20 md:px-40">
        <div className="shadow-2xl md:rounded-badge" ref={ref}>
          <Carousel />
        </div>
      </div>
      <div className="bg-white pb-32">
        <div className="w-11/12  mx-auto mt-10 z-30 relative">
          <div className="flex justify-center">
            <div
              className="md:space-y-4 sm:text-xl whitespace-nowrap  text-gray-800 p-4  font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div
                className="md:p-10 md:space-y-10 md:text-4xl lg:text-5xl"
                ref={ref}>
                <h1>Mobil Rekomendasi</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 ">
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
          ref={ref}
          className="md:space-y-4 sm:text-xl whitespace-nowrap md:text-4xl text-white p-4 lg:text-5xl font-bold text-center"
          style={{ fontFamily: "'Marko One', sans-serif" }}>
          <div className="md:p-10 md:space-y-10">
            <h1>Cari Mobil Berdasarkan Jenis</h1>
            <CarouselCar />
          </div>
        </div>
      </div>
      <div className="bg-white pb-32">
        <div className="w-11/12  mx-auto mt-10 z-30 relative">
          <div className="flex justify-center">
            <div
              className="md:space-y-4 sm:text-xl whitespace-nowrap  text-gray-800 p-4  font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div
                className="md:p-10 md:space-y-10 md:text-4xl lg:text-5xl"
                ref={ref}>
                <h1>Mobil Promosi</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 ">
            <div className="grid sm:grid-cols-1 md:grid-cols-5 gap-4" ref={ref}>
              {(function (rows, i, len) {
                while (++i <= len) {
                  rows.push(
                    <div
                      key={i}
                      className="block  w-full max-w-[32rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                      <div className="relative overflow-hidden bg-cover bg-no-repeat">
                        <img
                          className="rounded-t-lg"
                          src={require("../Images/Cars/car1.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="p-6">
                        <h1 className="font-bold text-gray-800 sm:text-sm md:text-md">
                          DAIHATSU ALL NEW AYLA (WHITE) TIPE X 1.0 M/T
                          (2023)....
                        </h1>
                        <p className="text-gray-800 font-medium line-through text-right">
                          Rp 1x4.000.000
                        </p>
                        <p className="text-gray-800 text-xl font-bold text-right">
                          Rp 1x4.000.000
                        </p>
                      </div>
                    </div>
                  );
                  if (window.innerWidth <= 768) break;
                }
                return rows;
              })([], 0, 15)}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white pb-32">
        <div className="w-11/12  mx-auto mt-10 z-30 relative">
          <div className="flex justify-center">
            <div
              className="md:space-y-4 sm:text-xl whitespace-nowrap  text-gray-800 p-4  font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div
                className="md:p-10 md:space-y-10 md:text-4xl lg:text-5xl"
                ref={ref}>
                <h1>Mobil Terbaru</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 ">
            <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4" ref={ref}>
              {(function (rows, i, len) {
                while (++i <= len) {
                  rows.push(
                    <div
                      key={i}
                      className="block  w-full max-w-[32rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                      <div className="relative overflow-hidden bg-cover bg-no-repeat">
                        <img
                          className="rounded-t-lg"
                          src={require("../Images/Cars/car1.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="p-6">
                        <h1 className="font-bold text-gray-800 sm:text-xs md:text-lg">
                          DAIHATSU ALL NEW AYLA (WHITE) TIPE X 1.0 M/T
                          (2023)....
                        </h1>
                        <p className="text-gray-800 font-light sm:text-xs md:text-md text-left">
                          HATCHBACK / - / PREMIUM
                        </p>
                        <p className="text-gray-800 sm:text-xs md:text-md font-medium line-through text-right">
                          Rp 1x4.000.000
                        </p>
                        <p className="text-gray-800 sm:text-xs md:text-md md:text-xl font-bold text-right">
                          Rp 1x4.000.000
                        </p>
                        <div className="flex mt-4 justify-between gap-2 font-medium text-xs md:text-md text-gray-600">
                          <div className="flex justify-start items-center gap-1">
                            <i className="fas fa-gauge"></i>
                            <p>65.132 km</p>
                          </div>
                          <div className="flex justify-start items-center gap-1">
                            <i className="fas fa-calendar"></i>
                            <p>2014</p>
                          </div>
                          <div className="flex justify-start items-center gap-1">
                            <i className="fas fa-gear"></i>
                            <p>4x2</p>
                          </div>
                          <div className="flex justify-start items-center gap-1">
                            <i className="fas fa-eye"></i>
                            <p>114</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return rows;
              })([], 0, 15)}
            </div>
          </div>
        </div>
        <div
          className="w-full -z-10 md:px-20 mt-10"
          style={{
            backgroundImage: `url(${bannerImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            backgroundSize: "cover", // Ensure the background image covers the entire container
            height: "50vh",
          }}>
          <div
            ref={ref}
            className="md:space-y-4 sm:text-xl whitespace-nowrap md:text-4xl text-white p-4 lg:text-5xl font-bold text-center"
            style={{ fontFamily: "'Marko One', sans-serif" }}>
            <div className="md:p-10 md:space-y-10">
              <h1>Berita Terkini</h1>
              <div className="flex justify-center">
                <CarouselBlog />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full -z-10 md:px-20 mt-20">
          <div
            ref={ref}s
            className="md:space-y-4 sm:text-xl whitespace-nowrap md:text-4xl text-gray-800 p-4 lg:text-5xl font-bold text-center"
            style={{ fontFamily: "'Marko One', sans-serif" }}>
            <div className="md:p-10 md:space-y-10">
              <h1>Testimoni Konsumen</h1>
              <div className="flex justify-center">
                <CarouselTestimony />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
