import React, { useEffect } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { Footer } from "../Components/Footer";

export const Career = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HighLightHeader />

      <div className="md:container slide-in fade-in-left mb-44 bg-base-200 rounded-xl -mt-20 p-10 md:p-20 sm:mx-2 md:mx-auto shadow">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_1"
            id="tab1"
            role="tab"
            className="tab"
            aria-controls="tabpanel1"
            aria-label="Umum"
            checked
            onChange={(e) => e.preventDefault()}
          />
          <div
            id="tabpanel1"
            role="tabpanel"
            className="tab-content bg-base-100 border-b border-base-300ase-300 rounded-box p-6">
            <div className="collapse bg-base-200 bg-opacity-20">
              <input defaultChecked type="checkbox" />
              <div className="collapse-title text-md font-medium">
                <p className=" border-b border-base-300 pb-2">Admin Keuangan</p>
              </div>
              <div className="collapse-content text-sky-700">
                <div className="md:flex sm:space-y-4 md:space-y-0 justify-start items-center gap-10">
                  <div className="flex justify-start text-sm whitespace-nowrap items-center gap-4">
                    <i className="fas w-1/12 fa-shopping-bag"></i>
                    <p className="w-11/12">Finance & Administration</p>
                  </div>
                  <div className="flex justify-start text-sm whitespace-nowrap items-center gap-4">
                    <i className="fas w-1/12 fa-signal "></i>
                    <p className="w-11/12">min 1 tahun</p>
                  </div>
                  <div className="flex justify-start text-sm whitespace-nowrap items-center gap-4">
                    <i className="fas w-1/12 fa-map-marker-alt"></i>
                    <p className="w-11/12">Pontianak</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse bg-base-200 bg-opacity-20 mt-4">
              <input defaultChecked type="checkbox" />
              <div className="collapse-title text-md font-medium">
                <p className=" border-b border-base-300 pb-2">Operator Cuci & Salon Mobil</p>
              </div>
              <div className="collapse-content text-sky-700">
                <div className="md:flex sm:space-y-4 md:space-y-0 justify-start items-center gap-10">
                  <div className="flex justify-start text-sm whitespace-nowrap items-center gap-4">
                    <i className="fas w-1/12 fa-shopping-bag"></i>
                    <p className="w-11/12">Workshop</p>
                  </div>
                  <div className="flex justify-start text-sm whitespace-nowrap items-center gap-4">
                    <i className="fas w-1/12 fa-signal "></i>
                    <p className="w-11/12">min 1 tahun</p>
                  </div>
                  <div className="flex justify-start text-sm whitespace-nowrap items-center gap-4">
                    <i className="fas w-1/12 fa-map-marker-alt"></i>
                    <p className="w-11/12">Pontianak</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse bg-base-200 bg-opacity-20 mt-4">
              <input defaultChecked type="checkbox" />
              <div className="collapse-title text-md font-medium">
                <p className=" border-b border-base-300 pb-2">Marketing</p>
              </div>
              <div className="collapse-content text-sky-700">
                <div className="md:flex sm:space-y-4 md:space-y-0 justify-start items-center gap-10">
                  <div className="flex justify-start text-sm whitespace-nowrap items-center gap-4">
                    <i className="fas w-1/12 fa-shopping-bag"></i>
                    <p className="w-11/12">Marketing</p>
                  </div>
                  <div className="flex justify-start text-sm whitespace-nowrap items-center gap-4">
                    <i className="fas w-1/12 fa-signal "></i>
                    <p className="w-11/12">Fresh Graduate Open</p>
                  </div>
                  <div className="flex justify-start text-sm whitespace-nowrap items-center gap-4">
                    <i className="fas w-1/12 fa-map-marker-alt"></i>
                    <p className="w-11/12">Pontianak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
