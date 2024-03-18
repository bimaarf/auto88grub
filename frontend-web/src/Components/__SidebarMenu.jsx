import React from "react";
import { useNavigate } from "react-router-dom";

export const SidebarMenu = ({
  setNavTogleBtn,
  navTogleBtn,
  theme,
  setTheme,
  dataTheme,
}) => {
  const navRedirect = useNavigate();
  return (
    <>
      <div
        className={`fixed overflow-y-scroll h-screen lg:hidden top-10 z-40 p-4 duration-300 ease-in-out bg-base-100 shadow-xl xl:w-64
        ${navTogleBtn ? "-left-4" : "-left-80   overflow-hidden"}
        `}>
        <div className="space-y-3">
          <div
            onClick={() => {
              navRedirect("/");
              setNavTogleBtn(false);
            }}
            className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
            <div className="w-1/12">
              <i className="fas fa-home"></i>
            </div>
            <h1
              className={`${
                navTogleBtn ? "block" : "hidden"
              } font-normal w-11/12`}>
              Beranda
            </h1>
          </div>
          <div
            onClick={() => {
              navRedirect("/promo");
              setNavTogleBtn(false);
            }}
            className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
            <div className="w-1/12">
              <i className="fas fa-percentage"></i>
            </div>
            <h1
              className={`${
                navTogleBtn ? "block" : "hidden"
              } font-normal w-11/12`}>
              Promo
            </h1>
          </div>
          <div
            onClick={() => {
              navRedirect("/mobil");
              setNavTogleBtn(false);
            }}
            className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
            <div className="w-1/12">
              <i className="fas fa-car"></i>
            </div>
            <h1
              className={`${
                navTogleBtn ? "block" : "hidden"
              } font-normal w-11/12`}>
              Mobil
            </h1>
          </div>
          <div
            onClick={() => {
              navRedirect("/testimoni");
              setNavTogleBtn(false);
            }}
            className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
            <div className="w-1/12">
              <i className="fas fa-car"></i>
            </div>
            <h1
              className={`${
                navTogleBtn ? "block" : "hidden"
              } font-normal w-11/12`}>
              Testimoni
            </h1>
          </div>
          <div
            className="collapse bg-transparent"
            style={{ marginTop: "", marginLeft: "-2px" }}>
            <input type="checkbox" defaultChecked />
            <div className="collapse-title">
              <div className="text-pretty w-52 bg-transparent bg-opacity-0 rounded-lg cursor-pointer flex justify-start items-center gap-2 text-sm">
                <i className="fas fa-caret-down w-3.5"></i>
                <p
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal w-11/12`}>
                  Panduan
                </p>
              </div>
            </div>
            <div className="collapse-content">
              <div
                onClick={() => {
                  navRedirect("/testimoni");
                  setNavTogleBtn(false);
                }}
                className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                <div className="w-1/12">
                  <i className="fas fa-book"></i>
                </div>
                <h1
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal w-11/12`}>
                  <p className="whitespace-nowrap">Konsultasi</p>
                </h1>
              </div>
              <div
                onClick={() => {
                  navRedirect("/tukar-tambah");
                  setNavTogleBtn(false);
                }}
                className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                <div className="w-1/12">
                  <i className="fas fa-book"></i>
                </div>
                <h1
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal w-11/12`}>
                  <p className="whitespace-nowrap">Tukar Tambah</p>
                </h1>
              </div>
              <div
                onClick={() => {
                  navRedirect("/kredit-mobil");
                  setNavTogleBtn(false);
                }}
                className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                <div className="w-1/12">
                  <i className="fas fa-book"></i>
                </div>
                <h1
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal w-11/12`}>
                  <p className="whitespace-nowrap">Kredit Mobil</p>
                </h1>
              </div>
            </div>
          </div>
          <div
            className="collapse bg-transparent"
            style={{ marginTop: "", marginLeft: "-2px" }}>
            <input type="checkbox" />
            <div className="collapse-title">
              <div className="text-pretty w-52 bg-transparent bg-opacity-0 rounded-lg cursor-pointer flex justify-start items-center gap-2 text-sm">
                <i className="fas fa-caret-down w-3.5"></i>
                <p
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal w-11/12`}>
                  Theme
                </p>
              </div>
            </div>
            <div className="collapse-content">
              {dataTheme &&
                dataTheme.map((item, key) => (
                  <div
                    key={key}
                    onClick={() => {
                      document
                        .querySelector("html")
                        .setAttribute("data-theme", item.themeList);
                      setTheme(item.themeList);
                    }}
                    className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                    <div className="w-1/12">
                      <i className="fas fa-snowflake"></i>
                    </div>
                    <h1
                      className={`${
                        navTogleBtn ? "block" : "hidden"
                      } font-normal w-11/12`}>
                      <p className="whitespace-nowrap">{item.themeList}</p>
                    </h1>
                  </div>
                ))}
            </div>
          </div>
          <div
            className="collapse bg-transparent"
            style={{ marginTop: "-1.5px", marginLeft: "-2px" }}>
            <input type="checkbox" defaultChecked />
            <div className="collapse-title">
              <div className="text-pretty w-52 bg-transparent bg-opacity-0 rounded-lg cursor-pointer flex justify-start items-center gap-2 text-sm">
                <i className="fas fa-caret-down w-3.5"></i>
                <p>Lihat Lebih</p>
              </div>
            </div>
            <div className="collapse-content">
              <div
                onClick={() => {
                  navRedirect("/syarat-dan-ketentuan");
                  setNavTogleBtn(false);
                }}
                className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                <div className="w-1/12">
                  <i className="fas fa-book"></i>
                </div>
                <h1
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal w-11/12`}>
                  <p className="whitespace-nowrap">Syarat dan Ketentuan</p>
                </h1>
              </div>
              <div
                onClick={() => {
                  navRedirect("/tentang-kami");
                  setNavTogleBtn(false);
                }}
                className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                <div className="w-1/12">
                  <i className="fas fa-building"></i>
                </div>
                <h1
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal w-11/12`}>
                  <p className="whitespace-nowrap">Tentang Kami</p>
                </h1>
              </div>
              <div
                onClick={() => {
                  navRedirect("/kunjungi-kami");
                  setNavTogleBtn(false);
                }}
                className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                <div className="w-1/12">
                  <i className="fas fa-phone"></i>
                </div>
                <h1
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal w-11/12`}>
                  <p className="whitespace-nowrap">Kunjungi Kami</p>
                </h1>
              </div>
            </div>
            <div
              onClick={() => {
                navRedirect("/FAQ");
                setNavTogleBtn(false);
              }}
              className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
              <div className="w-1/12">
                <i className="fas fa-question"></i>
              </div>
              <h1
                className={`${
                  navTogleBtn ? "block" : "hidden"
                } font-normal w-11/12`}>
                FAQ
              </h1>
            </div>
            <div
              onClick={() => {
                navRedirect("/karir");
                setNavTogleBtn(false);
              }}
              className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
              <div className="w-1/12">
                <i className="fas fa-link"></i>
              </div>
              <h1
                className={`${
                  navTogleBtn ? "block" : "hidden"
                } font-normal w-11/12`}>
                Karir
              </h1>
            </div>
            <div className="h-32"></div>
          </div>
          {/* {secureLocalStorage.getItem("auth_token") && (
            <>
              <div className="text-pretty w-52 mt-10 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                <div className="w-1/12">
                  <i className="fa-solid fa-user-gear"></i>
                </div>
                <h1
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal w-11/12`}>
                  Author
                </h1>
              </div>
              <div className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                <div className="w-1/12"></div>
                <div
                  onClick={() => navRedirect("/author/profile")}
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal flex justify-start items-center gap-1 w-11/12`}>
                  <i className="fa fa-user"></i>
                  <p>Akun Saya</p>
                </div>
              </div>
              <div className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                <div className="w-1/12"></div>
                <div
                  onClick={() => navRedirect("/author/category")}
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal flex justify-start items-center gap-2 w-11/12`}>
                  <i className="fa-solid fa-tag"></i>
                  <p className="-ml-1">Kelola Kategori</p>
                </div>
              </div>
              <div className="text-pretty w-52 hover:bg-base-300 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                <div className="w-1/12"></div>
                <div
                  onClick={() => navRedirect("/author/post")}
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal flex justify-start items-center gap-1 w-11/12`}>
                  <i className="fa fa-user"></i>
                  <p>Kelola Postingan</p>
                </div>
              </div>
            </>
          )} */}
        </div>
      </div>
    </>
  );
};
