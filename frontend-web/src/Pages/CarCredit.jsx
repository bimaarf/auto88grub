import React, { useEffect } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";

export const CarCredit = () => {
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
