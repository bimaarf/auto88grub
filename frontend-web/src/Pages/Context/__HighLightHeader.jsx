import React from "react";
import bannerImg from "../../Images/Banner/flag-red-white-indonesia_1912698.jpg";

export const HighLightHeader = () => {
  return (
    <>
      <div
        className="w-full -z-10 px-20 relative top-0 overflow-hidden"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundSize: "cover",
          height: "40vh",
          // filter: "blur(2px)", // Apply blur effect to the image
        }}>
        <div className="absolute inset-0 bg-gradient-to-b mt-10 flex justify-center from-transparent to-black">
          <div className="md:p-20 p-8 md:rounded-xl bg-black/5">
            <div className="text-black/80 flex justify-center items-center">
              <div
                className="md:space-y-4 text-3xl sm:text-4xl md:text-5xl font-bold text-center"
                style={{ fontFamily: "'Marko One', sans-serif" }}>
                <h1>Cari Mobil Bekas Impian Sekarang</h1>
              </div>
            </div>
            <p className="md:mt-10 mt-4 sm:text-xs md:text-lg font-medium text-black/80 text-center">
              Pencarian unit mobil dan transaksional akan kami arahkan ke mobbi.
              Kenalan dulu yuk!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
