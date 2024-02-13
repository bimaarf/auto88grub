import React from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export const SidebarMenu = ({ setNavTogle, navTogleBtn }) => {
  const navRedirect = useNavigate();
  return (
    <>
      <div
        className={`fixed lg:hidden top-10 overflow-x-hidden h-screen z-50 p-4 duration-300 ease-in-out bg-white shadow-xl xl:w-64
        ${navTogleBtn ? "left-0" : "xl:-left-44 -left-64 overflow-hidden"}
        `}>
        <div className="xl:fixed left-5">
          <div
            onClick={() => {
              navRedirect("/");
            }}
            className="text-gray-800 w-52 hover:bg-neutral-300 hover:bg-opacity-20 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
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
              navRedirect("/");
            }}
            className="text-gray-800 w-52 hover:bg-neutral-300 hover:bg-opacity-20 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
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

          {secureLocalStorage.getItem("auth_token") && (
            <>
              <div className="text-gray-800 w-52 mt-10 hover:bg-neutral-300 hover:bg-opacity-20 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
                <div className="w-1/12">
                  <i className="fa-solid fa-user-gear ml-0.5"></i>
                </div>
                <h1
                  className={`${
                    navTogleBtn ? "block" : "hidden"
                  } font-normal w-11/12`}>
                  Author
                </h1>
              </div>
              <div className="text-gray-800 w-52 hover:bg-neutral-300 hover:bg-opacity-20 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
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
              <div className="text-gray-800 w-52 hover:bg-neutral-300 hover:bg-opacity-20 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
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
              <div className="text-gray-800 w-52 hover:bg-neutral-300 hover:bg-opacity-20 rounded-lg cursor-pointer p-3 flex justify-start items-center gap-2 text-sm">
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
          )}
        </div>
      </div>
    </>
  );
};
