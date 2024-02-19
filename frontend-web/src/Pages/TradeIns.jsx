import React, { useEffect } from "react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";

export const TradeIns = () => {
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
                    Pandan Tuker-Tambah
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
                src="https://auto88group.com/image/trade/20211022040053.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Foto Unit dan Berkas-berkas</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Foto Unit & Berkas-berkas Asli Unit Anda kepada Kami
                </p>
              </article>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img
                draggable={false}
                loading="lazy"
                src="https://auto88group.com/image/trade/20211022040102.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Kami Akan Melalukan Penilaian Terhadap Unit Anda</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Kami akan memeriksa & memberi penilaian terhadap unit Anda
                </p>
              </article>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img
                draggable={false}
                loading="lazy"
                src="https://auto88group.com/image/trade/20211022040110.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Pilih Unit Yang Diinginkan & Negosisasi</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Pilih unit yang ingin di tukar-tambah kan & lakukan negosisasi
                </p>
              </article>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <img
                draggable={false}
                loading="lazy"
                src="https://auto88group.com/image/trade/20211022040120.png"
                alt=""
              />
            </div>
            <div className="text-center mt-4">
              <p>Deal & Mobil Impian Anda Siap Dibawa</p>
              <article className="prose prose-slate">
                <p className="whitespace-pre-wrap italic  font-thin">
                  Selesaikan Transaksi & mobil impian Anda siap untuk dibawa
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
