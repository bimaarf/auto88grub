import React, { useEffect } from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";

export const Consultation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
            <div className="text-white flex justify-center items-center align-middle">
              <div
                className="md:space-y-4 font-bold text-center align-middle flex  bg-black px-10 py-4 bg-opacity-20"
                style={{ fontFamily: "'Marko One', sans-serif" }}>
                <div className="space-y-4">
                  <h1 className="text-white text-3xl capitalize">
                    Panduan Konsultasi
                  </h1>
                  <h1 className="text-xl md:text-5xl">AUTO88GROUP</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-44 bg-white rounded-xl -mt-20 p-10 md:p-20 mx-auto">
        <h1 className="text-xl md:text-5xl w-full border-b mb-6 pb-4 border-dashed font-semibold text-red-800">
          Konsultasi
        </h1>
        <div className="grid sm:grid-cols-1 space-y-40 md:space-y-0 md:grid-cols-4">
          <div>
            <div className="flex justify-center">
              <img
                draggable={false}
                loading="lazy"
                src="https://auto88group.com/image/consultation/20211022034859.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Cari Mobil Impian mu</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Gunakan fitur pencarian Kami yang sudah Kami sediakan
                </p>
              </article>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img
                draggable={false}
                loading="lazy"
                src="https://auto88group.com/image/consultation/20211022034912.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Hubungi Admin Kami</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Klik tombol "Hubungi Kami" melalui "Telp/WhatsApp"
                </p>
              </article>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img
                draggable={false}
                loading="lazy"
                src="https://auto88group.com/image/consultation/20211022034922.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Konsultasikan Kebutuhan Anda</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Konsultasi segala kebutuhan Anda dan Staff Kami akan
                  memberikan solusi terbaik untuk Anda
                </p>
              </article>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img
                draggable={false}
                loading="lazy"
                src="https://auto88group.com/image/consultation/20211022034951.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Konsultasikan Kebutuhan Anda</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Konsultasi segala kebutuhan Anda dan Staff Kami akan
                  memberikan solusi terbaik untuk Anda
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
