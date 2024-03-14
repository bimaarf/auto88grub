import React, { useEffect } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { Footer } from "../Components/Footer";
export const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HighLightHeader />
      <div className="md:container mb-44 bg-base-200/40 rounded-xl -mt-20 p-4 md:p-20 sm:mx-2 md:mx-auto shadow">
        <div role="tablist" className="tabs tabs-lifted slide-in fade-in-left">
          <input
            checked
            type="radio"
            name="my_tabs_2"
            id="tab1"
            role="tab"
            className="tab"
            aria-controls="tabpanel1"
            aria-label="Umum"
            onChange={(e) => e.preventDefault()}
          />
          <div
            id="tabpanel1"
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="collapse bg-base-200 bg-opacity-20">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-md font-medium">
                Siapa Auto88Group?
              </div>
              <div className="collapse-content">
                <p>
                  Auto88group adalah showroom mobil bekas berkualitas yang
                  berdomisili di Pontianak, Kalimantan Barat.
                </p>
              </div>
            </div>
          </div>
          <input
            checked
            type="radio"
            name="my_tabs_2"
            id="tab2"
            role="tab"
            className="tab"
            aria-controls="tabpanel2"
            aria-label="Website"
            onChange={(e) => e.preventDefault()}
          />
          <div
            id="tabpanel2"
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="collapse bg-base-200 bg-opacity-20">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-md font-medium">
                Apa layanan Auto88Group?
              </div>
              <div className="collapse-content">
                <p>
                  Di Auto88group kami menjual mobil bekas berkualitas dan
                  bergaransi, selain itu kamu juga melayani tukar tambah mobil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
