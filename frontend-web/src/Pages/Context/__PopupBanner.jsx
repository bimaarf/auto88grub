import { Carousel, IconButton } from "@material-tailwind/react";
import React, { useEffect } from "react";

export const PopupBanner = ({ getPopup }) => {
  useEffect(() => {
    const modalShown = getCookie("modalShown");
    if (!modalShown && getPopup) {
      document.getElementById("my_modal_2").showModal();
      setCookie("modalShown", "true", 60); 
    }
  }, [getPopup]);

  const setCookie = (name, value, minutes) => {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ")
        cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEQ) === 0)
        return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
  };

  return (
    <>
      <dialog id="my_modal_2" className="modal backdrop-blur-sm">
        <div
          className="modal-box bg-transparent shadow-none flex justify-center items-center"
          style={{ top: "13vh" }}>
          {getPopup && (
            <Carousel
              loop
              autoplay
              prevArrow={({ handlePrev }) => (
                <IconButton
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handlePrev}
                  className="!absolute top-2/4 left-4 -translate-y-2/4 bg-black bg-opacity-20 hover:bg-black/50 duration-300 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </IconButton>
              )}
              nextArrow={({ handleNext }) => (
                <IconButton
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handleNext}
                  className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-black bg-opacity-20 hover:bg-black/50 duration-300 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </IconButton>
              )}>
              {getPopup.map((item, key) => (
                <div
                  key={key}
                  className="flex justify-center items-center align-middle">
                  <img
                    loading="eager"
                    src={`${process.env.REACT_APP_API}storage/${item.image}`}
                    alt=""
                  />
                </div>
              ))}
            </Carousel>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => document.getElementById("my_modal_2").close()}>
            Close
          </button>
        </form>
      </dialog>
    </>
  );
};
