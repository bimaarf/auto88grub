import React from "react";
import bannerImg from "../Images/Banner/banner-home.jpg";
export const Home = () => {
  return (
    <>
      <div
        className="w-full -z-10 px-20 relative container mx-auto mt-10 rounded-3xl"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundSize: "cover", // Ensure the background image covers the entire container
          height: "50vh",
        }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black ">
          <div className="md:p-20 p-8 md:rounded-xl md:w-3/4">
            <div className="text-white md:flex md:justify-between items-center">
              <div className="md:w-2/3">
                <div
                  className="md:space-y-4 text-lg md:text-5xl font-bold"
                  style={{ fontFamily: "'Marko One', sans-serif" }}>
                  <h1>Cari Mobil Bekas Impian Sekarang</h1>
                </div>
                {/* <div className="flex inset-11 bg-red-400 justify-start gap-4 items-center mt-20">
                  <input
                    type="search"
                    className="form-control outline-none rounded-full text-gray-500 px-8 py-4 w-96"
                    placeholder="Ketik merek atau tipe mobil yang ingin dicari"
                  />
                  <button className="bg-cyan-600 text-white py-4 px-13 w-40 justify-center flex items-center gap-2 rounded-full">
                    <i className="fas fa-search"></i>
                    <p>Cari</p>
                  </button>
                </div> */}
                <p className="md:mt-10 mt-4 text-xs md:text-sm font-medium md:w-2/3">
                  Pencarian unit mobil dan transaksional akan kami arahkan ke
                  mobbi. Kenalan dulu yuk!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen container w-2/3 mx-auto -mt-10 z-30 relative">
        <div className="bg-white shadow p-10 py-5 rounded-3xl">
          <div className="flex justify-between border-b border-dashed mb-4 pb-2 items-center">
            <h1 className="text-gray-800 font-bold">Mobil Promo</h1>
            <h1 className="text-red-500 font-bold text-xs">Lihat Lebih</h1>
          </div>
          {/* <div className="grid grid-cols-5 gap-4">
            {(function (rows, i, len) {
              while (++i <= len) {
                rows.push(
                  <img
                    key={i}
                    className="hover:scale-105 duration-300 cursor-pointer"
                    src={require("../Images/Cars/download.jfif")}
                    alt=""
                  />
                );
              }
              return rows;
            })([], 0, 10)}
          </div> */}
          <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
              <div className="grid grid-cols-10 gap-4">
                {(function (rows, i, len) {
                  while (++i <= len) {
                    rows.push(
                      <img
                        key={i}
                        className="hover:scale-105 duration-300 cursor-pointer"
                        src={require("../Images/Cars/download.jfif")}
                        alt=""
                      />
                    );
                  }
                  return rows;
                })([], 0, 10)}
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <label href="#slide4" className="btn btn-circle">
                  ❮
                </label>
                <label href="#slide2" className="btn btn-circle">
                  ❯
                </label>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <div className="grid grid-cols-10 gap-4">
                {(function (rows, i, len) {
                  while (++i <= len) {
                    rows.push(
                      <img
                        key={i}
                        className="hover:scale-105 duration-300 cursor-pointer"
                        src={require("../Images/Cars/download.jfif")}
                        alt=""
                      />
                    );
                  }
                  return rows;
                })([], 0, 10)}
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <div className="grid grid-cols-10 gap-4">
                {(function (rows, i, len) {
                  while (++i <= len) {
                    rows.push(
                      <img
                        key={i}
                        className="hover:scale-105 duration-300 cursor-pointer"
                        src={require("../Images/Cars/download.jfif")}
                        alt=""
                      />
                    );
                  }
                  return rows;
                })([], 0, 10)}
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <div className="grid grid-cols-10 gap-4">
                {(function (rows, i, len) {
                  while (++i <= len) {
                    rows.push(
                      <img
                        key={i}
                        className="hover:scale-105 duration-300 cursor-pointer"
                        src={require("../Images/Cars/download.jfif")}
                        alt=""
                      />
                    );
                  }
                  return rows;
                })([], 0, 10)}
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-between border-b border-dashed mb-4 pb-2 items-center mt-4">
            <h1 className="text-gray-800 font-bold">Mobil Promo</h1>
            <h1 className="text-red-500 font-bold text-xs">Lihat Lebih</h1>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {(function (rows, i, len) {
              while (++i <= len) {
                rows.push(
                  <img
                    key={i}
                    className="hover:scale-105 duration-300 cursor-pointer"
                    src={require("../Images/Cars/car1.jpg")}
                    alt=""
                  />
                );
              }
              return rows;
            })([], 0, 10)}
          </div>
        </div>
      </div>
    </>
  );
};
