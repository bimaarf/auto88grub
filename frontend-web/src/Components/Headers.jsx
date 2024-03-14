import React, { useEffect, useState } from "react";
import { SidebarMenu } from "./__SidebarMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeMarquee } from "../Pages/Context/__HomeMarquee";
import secureLocalStorage from "react-secure-storage";
import { BottomNav } from "./__BottomNav";

export const Headers = ({ setTheme, theme }) => {
  const [navTogleBtn, setNavTogleBtn] = useState(false);
  const navRedirect = useNavigate();
  const location = useLocation();
  const handleTheme = (e) => {
    if (e.target.checked) {
      setTheme("sunset");
    } else {
      setTheme("pastel");
    }
  };
  useEffect(() => {
    secureLocalStorage.setItem("theme", theme);
    const localTheme = secureLocalStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  return (
    <>
      <HomeMarquee />
      <div
        className={`p-4 lg:px-10 sticky top-0 z-50 bg-base-100 odd:shadow-lg ${
          theme === "sunset" && "border-b border-base-200"
        } *:backdrop-blur-0 even:backdrop:shadow-lg backdrop-contrast-200 backdrop-filter backdrop-opacity-0`}>
        <div className="lg:container lg:mx-auto whitespace-nowrap">
          <div className="flex justify-between items-center">
            <label className="swap swap-rotate hover:bg-pink-600 hover:bg-opacity-25 rounded-xl p-1 scale-75 active:scale-90 duration-200">
              <input
                onChange={handleTheme}
                type="checkbox"
                checked={theme === "sunset" ? true : false}
              />
              {/* sun icon */}
              <svg
                className="swap-on fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
            <h1
              onClick={() => navRedirect("/")}
              className="text-xl font-medium  cursor-pointer active:scale-95 duration-300">
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
                  location.pathname === "/" ? "text-red-700" : ""
                } cursor-pointer active:scale-95 duration-200 justify-start items-center gap-1 font-semibold text-sm`}>
                <i className="fas fa-home"></i>
                <p className="font-semibold ">Beranda</p>
              </div>
              <div
                onClick={() => navRedirect("/promo")}
                className={`flex ${
                  location.pathname === "/promo" ? "text-red-700" : ""
                } cursor-pointer active:scale-95 duration-200 justify-start items-center gap-1 font-semibold text-sm`}>
                <i className="fas fa-percentage"></i>
                <p className="font-semibold ">Promo</p>
              </div>
              <div
                onClick={() => navRedirect("/mobil")}
                className={`flex ${
                  location.pathname.split("/")[1] === "mobil"
                    ? "text-red-700"
                    : ""
                } cursor-pointer active:scale-95 duration-200 justify-start items-center gap-1 font-semibold text-sm`}>
                <i className="fas fa-car"></i>
                <p className="font-semibold ">Mobil</p>
              </div>
              <div
                onClick={() => navRedirect("/testimoni")}
                className={`flex ${
                  location.pathname === "/testimoni" ? "text-red-700" : ""
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
                      : ""
                  } cursor-pointer active:scale-95 duration-200 justify-start items-center gap-1 font-semibold text-sm`}>
                  <p>Panduan</p>
                  <i className="fas fa-caret-down"></i>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-300 text-pre rounded-box w-52">
                  <li>
                    <div
                      onClick={() => navRedirect("/konsultasi")}
                      className="flex justify-start items-center gap-1   hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-book"></i>
                      <p className="whitespace-nowrap">Konsultasi</p>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navRedirect("/tukar-tambah")}
                      className="flex justify-start items-center gap-1   hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-book"></i>
                      <p className="whitespace-nowrap">Tukar Tambah</p>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navRedirect("/kredit-mobil")}
                      className="flex justify-start items-center gap-1   hover:text-red-700 font-medium text-sm">
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
                      : ""
                  } cursor-pointer active:scale-95 duration-200 justify-start items-center gap-1 font-semibold text-sm`}>
                  <p>Lihat Lebih</p>
                  <i className="fas fa-caret-down"></i>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-300 text-pre rounded-box w-52">
                  <li>
                    <div
                      onClick={() => navRedirect("/syarat-dan-ketentuan")}
                      className="flex justify-start items-center gap-1   hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-book"></i>
                      <p className="whitespace-nowrap">Syarat dan Ketentuan</p>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navRedirect("/tentang-kami")}
                      className="flex justify-start items-center gap-1   hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-building"></i>
                      <p className="whitespace-nowrap">Tentang Kami</p>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navRedirect("/kunjungi-kami")}
                      className="flex justify-start items-center gap-1   hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-phone"></i>
                      <p className="whitespace-nowrap">Kunjungi Kami</p>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => navRedirect("/kebijakan-privasi")}
                      className="flex justify-start items-center gap-1   hover:text-red-700 font-medium text-sm">
                      <i className="fas fa-shield"></i>
                      <p className="whitespace-nowrap">Kebijakan Privasi</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div
                onClick={() => navRedirect("/FAQ")}
                className={`${
                  location.pathname === "/FAQ" ? "text-red-700" : ""
                } flex justify-start hover:text-red-700 cursor-pointer active:scale-95 duration-200 items-center gap-1 font-medium text-sm`}>
                <i className="fas fa-question"></i>
                <p className="whitespace-nowrap">FAQ</p>
              </div>
              <div
                onClick={() => navRedirect("/karir")}
                className={`${
                  location.pathname === "/karir" ? "text-red-700" : ""
                } flex justify-start hover:text-red-700 cursor-pointer active:scale-95 duration-200 items-center gap-1 font-medium text-sm`}>
                <i className="fas fa-link"></i>
                <p className="whitespace-nowrap">Karir</p>
              </div>
              <div
                className={`${
                  location.pathname === "/masuk" ? "text-red-700" : ""
                } flex justify-start hover:text-red-700 cursor-pointer active:scale-95 duration-200 items-center gap-1 font-medium text-sm`}>
                <i className="fas fa-sign-in"></i>
                <p className="whitespace-nowrap">Masuk</p>
              </div>
            </div>
            <p></p>
            <button
              onClick={() => setNavTogleBtn(navTogleBtn ? false : true)}
              className="py-2  px-4 fas fa-bars md:hidden rounded active:scale-95  hover:bg-opacity-20 duration-300 bg-basae-300 hover:bg-base-200 bg-opacity-10"></button>
          </div>
        </div>
      </div>
      <BottomNav
        handleTheme={handleTheme}
        theme={theme}
        navTogleBtn={navTogleBtn}
        setNavTogleBtn={setNavTogleBtn}
        navRedirect={navRedirect}
      />
    </>
  );
};
