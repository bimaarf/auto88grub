import React, { useEffect, useState } from "react";
import bannerImg from "../../Images/Banner/red_wavy_with_halftone_background.jpg";
import axios from "axios";

export const HighLightHeader = () => {
  const [getHighlight, setHighLight] = useState("");
  const _fetchData = async () => {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get("api/highlight/show");
    setHighLight(response.data);
  };
  useEffect(() => {
    _fetchData();
  }, []);
  return (
    <>
      <div
        className="w-full -z-10 px-20 relative top-0 overflow-hidden "
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "bottom right",
          backgroundSize: "cover",
          height: "80vh",
          marginBottom: "-60vh",
          borderBottomLeftRadius: "30vh",
          borderBottomRightRadius: "30vh",
          // filter: "blur(2px)", // Apply blur effect to the image
        }}
      />
      <div className="absolute inset-0 mt-10 flex justify-center">
        <div className="md:p-20 p-8 md:rounded-xl">
          <div className="text-black/80 flex justify-center items-center">
            <div
              className="md:space-y-4 text-3xl sm:text-4xl md:text-5xl font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              {getHighlight ? (
                <h1>{getHighlight[0].title}</h1>
              ) : (
                <div className="container w-screen mx-auto space-y-3">
                  <div className="flex justify-center">
                    <p className="h-6 w-96 skeleton bg-opacity-50"></p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {getHighlight ? (
            <p className="md:mt-10 mt-4 sm:text-xs md:text-lg font-medium text-black/80 text-center">
              {getHighlight[0].subtitle}
              {/* Pencarian unit mobil dan transaksional akan kami arahkan ke mobbi.
              Kenalan dulu yuk! */}
            </p>
          ) : (
            <div className="container w-screen mx-auto mt-3">
              <div className="flex justify-center">
                <p className="h-6 w-10/12 skeleton bg-opacity-50"></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
