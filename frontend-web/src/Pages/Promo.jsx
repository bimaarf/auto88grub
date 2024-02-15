import React, { useEffect, useRef } from "react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";

export const Promo = () => {
  const promoRef = useRef(null);

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
        ref={promoRef}
        className="w-full -z-10 px-20 relative top-0 fade-in-on-scroll overflow-hidden"
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
                className="md:space-y-4 font-bold text-center align-middle flex w-96 justify-center bg-black px-10 py-4 bg-opacity-20"
                style={{ fontFamily: "'Marko One', sans-serif" }}>
                <div className="space-y-4">
                  <h1 className="text-white text-3xl">Koleksi Kami</h1>
                  <h1 className=" text-5xl">PROMO</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:container mb-44 bg-white rounded-xl -mt-20 p-10 md:p-20 sm:mx-1 md:mx-auto">
        <div className="flex justify-center gap-4 ">
          <div className="grid sm:grid-cols-1 md:grid-cols-5 gap-4">
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
                        DAIHATSU ALL NEW AYLA (WHITE) TIPE X 1.0 M/T (2023)....
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
