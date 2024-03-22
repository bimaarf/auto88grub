import React from "react";
import { CurrentXFormat } from "./___CurrentXFormat";
import { useNavigate } from "react-router-dom";

export const ListNewCar = ({ getNewCars }) => {
  const navRedirect = useNavigate();
  return (
    <>
      {getNewCars.data.map((item, key) => (
        <div
          onClick={() => {
            window.scrollTo(0, 0);
            const params = new URLSearchParams();
            params.append("slug", item.slug);
            params.append("index", item.id);
            navRedirect({
              pathname: "/mobil/preview",
              search: `?${params.toString()}`,
            });
          }}
          key={key}
          className="block select-none border border-base-200 hover:border-red-500 active:scale-95 cursor-pointer duration-300 w-full max-w-[32rem] rounded-lg bg-base-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <div className="relative overflow-hidden flex justify-center bg-cover bg-no-repeat">
            <img
              className="rounded-t-lg h-40 w-full object-cover"
              src="https://www.auto88group.com/image/car/1775/20240201113209.jpg"
              alt=""
            />
          </div>
          <div className="p-3">
            <h1 className="font-bold text-pretty text-sm md:text-md">
              {item.title.length > 40
                ? item.title.slice(0, 40) + "..."
                : item.title}
            </h1>
            <p className="text-pretty font-light text-xs md:text-md text-left uppercase">
              {item.type.name} / {item.series.name} / {item.fuel.name}
            </p>
            <p className="text-pretty text-sm font-bold text-right">
                <CurrentXFormat value={item.price} />
              </p>
            <div className="flex justify-between">
              <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-pretty">
                <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                  <i className="fas fa-gauge"></i>
                  <p>65.132 km</p>
                </div>
                <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                  <i className="fas fa-calendar"></i>
                  <p>{item.year.name}</p>
                </div>
              </div>
              <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-pretty">
                <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                  <i className="fas fa-gear"></i>
                  <p>{item.gear.name}</p>
                </div>
                <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                  <i className="fas fa-eye"></i>
                  <p>114</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
