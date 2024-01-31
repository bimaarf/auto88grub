import React from "react";

export const Headers = () => {
  return (
    <>
      <div className="p-4 lg:px-10 flex justify-between sticky top-0 z-40 bg-white shadow-lg backdrop-blur-lg">
        <h1 className="text-xl font-medium text-slate-700">
          AUTO
          <span className="text-red-500">88</span>
          GROUP
        </h1>
        <div className="md:flex text-md hidden justify-center items-center gap-10">
          <div className="flex cursor-pointer text-red-700 justify-start items-center gap-1 font-semibold text-sm">
            <i className="fas fa-home"></i>
            <p className="font-semibold ">Beranda</p>
          </div>
          <div className="flex cursor-pointer text-slate-700 justify-start items-center gap-1 font-semibold text-sm">
            <i className="fas fa-percentage"></i>
            <p className="font-semibold ">Promo</p>
          </div>
          <div className="flex cursor-pointer text-slate-700 justify-start items-center gap-1 font-semibold text-sm">
            <i className="fas fa-car"></i>
            <p className="font-semibold ">Mobil</p>
          </div>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="flex cursor-pointer text-slate-700 hover:text-red-700 font-medium text-sm justify-start items-center gap-1">
              <p>Panduan</p>
              <i className="fas fa-caret-down"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-xl bg-white text-gray-700  rounded-box w-52">
              <li>
                <div className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                  <i className="fas fa-info-circle"></i>
                  <p className="whitespace-nowrap">Panduan Konsultasi</p>
                </div>
              </li>
              <li>
                <div className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                  <i className="fas fa-info-circle"></i>
                  <p className="whitespace-nowrap">Panduan Tukar Tambah</p>
                </div>
              </li>
              <li>
                <div className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                  <i className="fas fa-info-circle"></i>
                  <p className="whitespace-nowrap">Panduan Kredit Mobil</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="flex cursor-pointer text-slate-700 hover:text-red-700 font-medium text-sm justify-start items-center gap-1">
              <p>Lihat Lebih</p>
              <i className="fas fa-caret-down"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-xl bg-white text-gray-700  rounded-box w-52">
              <li>
                <div className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                  <i className="fas fa-info-circle"></i>
                  <p className="whitespace-nowrap">Syarat dan Ketentuan</p>
                </div>
              </li>
              <li>
                <div className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                  <i className="far fa-building"></i>
                  <p className="whitespace-nowrap">Tentang Kami</p>
                </div>
              </li>
              <li>
                <div className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                  <i className="fas fa-phone"></i>
                  <p className="whitespace-nowrap">Kunjungi Kami</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
            <i className="fas fa-question"></i>
            <p className="whitespace-nowrap">FAQ</p>
          </div>
          <div className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
            <i className="fas fa-link"></i>
            <p className="whitespace-nowrap">Karir</p>
          </div>
          <div className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
            <i className="fas fa-sign-in"></i>
            <p className="whitespace-nowrap">Masuk</p>
          </div>
        </div>
        <button className="py-2 text-slate-700 px-4 fas fa-bars rounded hover:scale-105 active:scale-95 duration-300 bg-white bg-opacity-10"></button>
      </div>
    </>
  );
};
