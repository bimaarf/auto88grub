import React from "react";
import { useNavigate } from "react-router-dom";

export const ListCarPromo = ({ getCarPromos }) => {
  const navRedirect = useNavigate();
  return (
    <>
      {getCarPromos.data.map((item, key) => (
        <div
          onClick={() => {
            const params = new URLSearchParams();
            params.append("slug", item.slug);
            params.append("index", item.id);
            navRedirect({
              pathname: "/mobil/preview",
              search: `?${params.toString()}`,
            });
          }}
          key={key}
          className="block select-none border-transparent border hover:border-red-500 active:scale-95 cursor-pointer duration-300 w-full max-w-[32rem] rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <div className="relative overflow-hidden flex justify-center bg-cover bg-no-repeat">
            <img
              className="rounded-t-lg object-contain"
              src="https://www.auto88group.com/image/promo/1812/1812.jpg"
              alt=""
            />
          </div>
        </div>
      ))}
    </>
  );
};
