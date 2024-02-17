import React, { useEffect, useRef } from "react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";
import { useNavigate } from "react-router-dom";

export const Promo = () => {
  const promoRef = useRef(null);
  const navRedirect = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      if (promoRef.current) {
        const elementTop = promoRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight) {
          promoRef.current.classList.add("fade-in");
        } else {
          promoRef.current.classList.remove("fade-in");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="w-full -z-10 px-20 relative top-0 overflow-hidden"
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
                className="md:space-y-4 font-bold text-center align-middle flex justify-center bg-black px-10 py-4 bg-opacity-20"
                style={{
                  fontFamily: "'Marko One', sans-serif",
                  width: "500px",
                }}>
                <div className="space-y-4">
                  <img
                    draggable={false}
                    src={require("../Images/Banner/logo-tfnCopy.png")}
                    width={300}
                    alt=""
                  />
                  <h1 className="text-white text-3xl">Mobil Promo</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:container mb-44 bg-white rounded-xl -mt-20 p-4 md:p-10 sm:mx-1 md:mx-auto">
        <h1 className="text-gray-800 font-medium border-b mb-4 pb-2">
          Mobil Promo
        </h1>
        <div className="flex justify-center gap-4 ">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {(function (rows, i, len) {
              while (++i <= len) {
                rows.push(
                  <div
                    onClick={() =>
                      navRedirect({
                        pathname: "/car/preview",
                        search: `?slug=DAIHATSU ALL NEW AYLA (WHITE) TIPE X 1.0 M/T (2023)`,
                      })
                    }
                    key={i}
                    className="block active:scale-90 hover:scale-95 cursor-pointer duration-300 w-full max-w-[32rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                      <div className="relative overflow-hidden bg-cover flex bg-no-repeat justify-center items-center">
                        <img
                          className="skeleton animate-ping"
                          src="https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                          alt=""
                        />
                        <i className="fas fa-spinner text-3xl align-middle self-center absolute text-gray-300 animate-spin"></i>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="skeleton h-3 w-full"></p>
                      <p className="skeleton h-3 w-2/3 mt-2"></p>
                      <div className="flex justify-end">
                        <p className="skeleton h-2 w-1/2 mt-2"></p>
                      </div>
                      <div className="flex justify-end">
                        <p className="skeleton h-2 w-1/2 mt-2"></p>
                      </div>
                      <div className="flex justify-between">
                        <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-gray-600">
                          <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                            <p className="skeleton h-2 w-4 mt-2"></p>
                            <p className="skeleton h-2 w-10 mt-2"></p>
                          </div>
                          <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                            <p className="skeleton h-2 w-4 mt-2"></p>
                            <p className="skeleton h-2 w-10 mt-2"></p>
                          </div>
                        </div>
                        <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-gray-600">
                          <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                            <p className="skeleton h-2 w-4 mt-2"></p>
                            <p className="skeleton h-2 w-10 mt-2"></p>
                          </div>
                          <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                            <p className="skeleton h-2 w-4 mt-2"></p>
                            <p className="skeleton h-2 w-10 mt-2"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return rows;
            })([], 0, 9)}
          </div>
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
