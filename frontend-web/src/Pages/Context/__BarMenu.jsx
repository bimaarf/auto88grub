import React from "react";
import { useNavigate } from "react-router-dom";

export const BarMenu = () => {
  const navRedirect = useNavigate();
  return (
    <div className="sticky top-40">
      <div className="container">
        <div className="flex justify-start items-center gap-3">
          <div
            onClick={() =>
              setTimeout(() => {
                navRedirect("/mobil");
              }, 100)
            }
            className="p-3 rounded-xl *:border-b *:border-dashed active:scale-95 font-medium w-72 bg-gradient-to-r from-sky-700 to-sky-500 hover:brightness-95 brightness-110 duration-200 h-20 cursor-pointer text-white">
            <div className="flex items-center gap-2">
              <i className="fas fa-car"></i>
              <h1>Rekomendasi</h1>
            </div>
          </div>
          <div
            onClick={() =>
              setTimeout(() => {
                navRedirect("/promo");
              }, 100)
            }
            className="p-3 rounded-xl *:border-b *:border-dashed active:scale-95 font-medium w-72 bg-gradient-to-r from-orange-900 to-orange-700 hover:brightness-95 brightness-110 duration-200 h-20 cursor-pointer text-white">
            <div className="flex items-center gap-2">
              <i className="fas fa-percent"></i>
              <h1>Promo</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
