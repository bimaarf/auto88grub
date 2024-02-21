import React, { useEffect } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";

export const TradeIns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HighLightHeader />
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
