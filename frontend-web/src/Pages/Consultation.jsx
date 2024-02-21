import React, { useEffect } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";

export const Consultation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HighLightHeader />
      <div className="container mb-44 bg-white rounded-xl -mt-20 p-10 md:p-20 mx-auto">
        <h1 className="text-gray-800 font-medium border-b mb-4 pb-2">
          Panduan Konsultasi
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
