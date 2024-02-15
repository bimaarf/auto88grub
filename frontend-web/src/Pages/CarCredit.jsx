import React, { useEffect } from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";

export const CarCredit = () => {
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
                    Pandan Kredit Mobil
                  </h1>
                  <h1 className="text-xl md:text-5xl">AUTO88GROUP</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:container mb-44 bg-white rounded-xl -mt-20 p-10 md:p-20 sm:mx-2 md:mx-auto">
        <h1 className="text-xl md:text-5xl w-full border-b mb-6 pb-4 border-dashed font-semibold text-red-800">
          Tukar Tambah
        </h1>
        <div className="grid sm:grid-cols-1 space-y-40 md:space-y-0 md:grid-cols-4">
          <div>
            <div className="flex justify-center">
              <img
                draggable={false}
                loading="lazy"
                src="https://auto88group.com/image/credit/20211022042922.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Pilih unit idaman Anda di galeri Kami</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Silahkan pilih unit yang Anda inginkan
                </p>
              </article>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img
                draggable={false}
                loading="lazy"
                src="https://auto88group.com/image/credit/20211022042932.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Kami akan memberi hitungan simulasi kredit</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Marketing kami akan mengirimkan simulasi kredit kepada Anda
                </p>
              </article>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img
                draggable={false}
                loading="lazy"
                src="https://auto88group.com/image/credit/20211022042949.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Lakukan transaksi dan lengkapi syarat</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Lakukan panjar dan lengkapi segala persyaratan yang dibutuhkan
                </p>
              </article>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img
                draggable={false}
                loading="lazy"
                src="https://auto88group.com/image/credit/20211022042959.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Jika kredit disetujui maka mobil impian siap dibawa</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Apabila kredit Anda disetujui maka mobil impian Anda siap
                  untuk Anda jemput
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
