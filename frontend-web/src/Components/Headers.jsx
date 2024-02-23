import React, { useEffect, useState } from "react";
import { SidebarMenu } from "./__SidebarMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeMarquee } from "../Pages/Context/__HomeMarquee";

export const Headers = () => {
  const [navTogleBtn, setNavTogleBtn] = useState(false);
  const navRedirect = useNavigate();
  const location = useLocation();

  return (
    <>
      <HomeMarquee />
      <div className="p-4 lg:px-10 sticky top-0 z-50 bg-white/80 shadow-lg backdrop-filter backdrop-blur-lg">
        <div className="lg:container lg:mx-auto  whitespace-nowrap">
          <div className="flex justify-between">
            <h1
              onClick={() => navRedirect("/")}
              className="text-xl font-medium text-slate-700 cursor-pointer active:scale-95 duration-300">
              AUTO
              <span className="text-red-500">88</span>
              GROUP
            </h1>
            <SidebarMenu
              navTogleBtn={navTogleBtn}
              setNavTogleBtn={setNavTogleBtn}
            />
            <div className="md:flex text-md hidden justify-center items-center gap-10">
              <div
                onClick={() => navRedirect("/")}
                className={`flex ${
                  location.pathname === "/" ? "text-red-700" : "text-slate-700"
                } cursor-pointer active:scale-95 duration-200 justify-start items-center gap-1 font-semibold text-sm`}>
                <i className="fas fa-home"></i>
                <p className="font-semibold ">Beranda</p>
              </div>
              <div
                onClick={() => navRedirect("/promo")}
                className={`flex ${
                  location.pathname === "/promo"
                    ? "text-red-700"
                    : "text-slate-700"
                } cursor-pointer active:scale-95 duration-200 justify-start items-center gap-1 font-semibold text-sm`}>
                <i className="fas fa-percentage"></i>
                <p className="font-semibold ">Promo</p>
              </div>
              <div
                onClick={() => navRedirect("/mobil")}
                className={`flex ${
                  location.pathname.split("/")[1] === "mobil"
                    ? "text-red-700"
                    : "text-slate-700"
                } cursor-pointer active:scale-95 duration-200 justify-start items-center gap-1 font-semibold text-sm`}>
                <i className="fas fa-car"></i>
                <p className="font-semibold ">Mobil</p>
              </div>
              <div
                onClick={() => navRedirect("/testimoni")}
                className={`flex ${
                  location.pathname === "/testimoni"
                    ? "text-red-700"
                    : "text-slate-700"
                } cursor-pointer active:scale-95 duration-200 justify-start items-center gap-1 font-semibold text-sm`}>
                <i className="fas fa-handshake"></i>
                <p className="font-semibold ">Testimoni</p>
              </div>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className={`flex ${
                    location.pathname === "/konsultasi" ||
                    location.pathname === "/tukar-tambah" ||
                    location.pathname === "/kredit-mobil"
                      ? "text-red-700"
                      : "text-slate-700"
                  } cursor-pointer active:scale-95 duration-200 justify-start items-center gap-1 font-semibold text-sm`}>
                  <p>Panduan</p>
                  <i className="fas fa-caret-down"></i>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-xl bg-white text-gray-700  rounded-box w-52">
                  <li>
                    <div
                      onClick={() => navRedirect("/konsultasi")}
                      className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-book"></i>
                      <p className="whitespace-nowrap">Konsultasi</p>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navRedirect("/tukar-tambah")}
                      className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-book"></i>
                      <p className="whitespace-nowrap">Tukar Tambah</p>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navRedirect("/kredit-mobil")}
                      className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-book"></i>
                      <p className="whitespace-nowrap">Kredit Mobil</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className={`flex ${
                    location.pathname === "/syarat-dan-ketentuan" ||
                    location.pathname === "/tentang-kami" ||
                    location.pathname === "/kunjungi-kami"
                      ? "text-red-700"
                      : "text-slate-700"
                  } cursor-pointer active:scale-95 duration-200 justify-start items-center gap-1 font-semibold text-sm`}>
                  <p>Lihat Lebih</p>
                  <i className="fas fa-caret-down"></i>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-xl bg-white text-gray-700  rounded-box w-52">
                  <li>
                    <div
                      onClick={() => navRedirect("/syarat-dan-ketentuan")}
                      className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-book"></i>
                      <p className="whitespace-nowrap">Syarat dan Ketentuan</p>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navRedirect("/tentang-kami")}
                      className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-building"></i>
                      <p className="whitespace-nowrap">Tentang Kami</p>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navRedirect("/kunjungi-kami")}
                      className="flex justify-start items-center gap-1  text-slate-700 hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-phone"></i>
                      <p className="whitespace-nowrap">Kunjungi Kami</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div
                onClick={() => navRedirect("/FAQ")}
                className={`${
                  location.pathname === "/FAQ"
                    ? "text-red-700"
                    : "text-slate-700"
                } flex justify-start hover:text-red-700 cursor-pointer active:scale-95 duration-200 items-center gap-1 font-medium text-sm`}>
                <i className="fas fa-question"></i>
                <p className="whitespace-nowrap">FAQ</p>
              </div>
              <div
                onClick={() => navRedirect("/karir")}
                className={`${
                  location.pathname === "/karir"
                    ? "text-red-700"
                    : "text-slate-700"
                } flex justify-start hover:text-red-700 cursor-pointer active:scale-95 duration-200 items-center gap-1 font-medium text-sm`}>
                <i className="fas fa-link"></i>
                <p className="whitespace-nowrap">Karir</p>
              </div>
              <div
                className={`${
                  location.pathname === "/masuk"
                    ? "text-red-700"
                    : "text-slate-700"
                } flex justify-start hover:text-red-700 cursor-pointer active:scale-95 duration-200 items-center gap-1 font-medium text-sm`}>
                <i className="fas fa-sign-in"></i>
                <p className="whitespace-nowrap">Masuk</p>
              </div>
            </div>
            <p></p>
            <button
              onClick={() => setNavTogleBtn(navTogleBtn ? false : true)}
              className="py-2 text-slate-700 px-4 fas fa-bars md:hidden rounded active:scale-95 hover:bg-gray-300 hover:bg-opacity-20 duration-300 bg-white bg-opacity-10"></button>
          </div>
        </div>
      </div>
    </>
  );
};
