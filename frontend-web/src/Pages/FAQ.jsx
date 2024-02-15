import React from "react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";

export const FAQ = () => {
  return (
    <>
      <div
        className="w-full -z-10 px-20 relative top-0"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundSize: "cover", // Ensure the background image covers the entire container
          height: "40vh",
          // filter: "blur(2px)", // Apply blur effect to the image
        }}>
        <div className="absolute inset-0 bg-gradient-to-b flex justify-center from-transparent to-black">
          <div className="md:p-20 p-8 md:rounded-xl">
            <div className="text-white flex justify-center items-center align-middle">
              <div
                className="md:space-y-4 font-bold text-center align-middle flex  bg-black px-10 py-4 bg-opacity-20"
                style={{ fontFamily: "'Marko One', sans-serif" }}>
                <div className="space-y-4">
                  <h1 className="text-white text-3xl capitalize">FAQ</h1>
                  <h1 className="text-xl md:text-5xl">AUTO88GROUP</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-44 bg-white rounded-xl -mt-20 p-10 md:p-20 mx-auto">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
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
            className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="collapse bg-base-200 bg-opacity-20">
              <input type="checkbox" />
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
              <input type="checkbox" />
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
    </>
  );
};
