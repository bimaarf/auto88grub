import React, { useEffect, useState } from "react";
import bgDark from "../../Images/Background/automobile_.jpg";
import bgLight from "../../Images/Background/abstract-blue-geometric-shapes-background.jpg";
import axios from "axios";

export const HighLightHeader = ({ theme }) => {
  const [getHighlight, setHighLight] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const _fetchData = async () => {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get("api/highlight/show");
    setHighLight(response.data);
    if (response.data[0] && response.data[0].video_url) {
      setVideoUrl(response.data[0].video_url);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);
  return (
    <>
  

      <div className=" flex justify-center">
        <div className="md:p-20 p-8 md:rounded-xl">
          <div className="flex justify-center items-center">
            <div
              className="md:space-y-4 text-3xl sm:text-4xl md:text-5xl font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div className="font-extrabold md:text-6xl opacity-75 text-shadow">
                <span className="text-pretty">AUTO</span>
                <span className="text-red-500">88</span>
                <span className="text-pretty">GROUP</span>
              </div>
              {/* {getHighlight ? (
                <h1 className="font-extrabold md:text-6xl text-pretty opacity-25">
                  {getHighlight[0].title}
                </h1>
              ) : (
                <div className="md:container w-screen md:mx-auto space-y-3">
                  <div className="flex justify-center">
                    <p className="h-6 w-96 skeleton bg-opacity-50"></p>
                  </div>
                </div>
              )} */}
            </div>
          </div>
          {getHighlight ? (
            <p className="md:mt-10 mt-4 sm:text-xs md:text-xl font-medium text-pretty opacity-80 text-center whitespace-pre-wrap">
              {getHighlight[0].subtitle}
              {/* Pencarian unit mobil dan transaksional akan kami arahkan ke mobbi.
              Kenalan dulu yuk! */}
            </p>
          ) : (
            <div className="md:container w-screen md:mx-auto mt-3">
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
