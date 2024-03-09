import React, { useState } from "react";

export const CircleModal = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [shuffledNames, setShuffledNames] = useState([]);

  const names = ["Eliana", "Dea", "Lestari", "Zulfa"];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <>
      <div
        className={`flex justify-center duration-1000 fixed z-30 bottom-44  -right-7 ${
          showBubble ? "opacity-100" : "opacity-0"
        }`}></div>
      <label
        onClick={() => {
          !showBubble && setShuffledNames(shuffleArray([...names]));
          setShowBubble((prev) => !prev);
        }}
        className="fixed z-30 scale-50 lg:scale-100 bottom-0 sm:right-0 md:right-10 cursor-pointer inline-block rounded-full duration-200 leading-normal text-white">
        <div className="flex">
          <div
            className={`chat duration-500 scale-110 chat-end absolute right-10 z-30 ${
              showBubble
                ? "opacity-125 bottom-64 "
                : " opacity-0 -bottom-72 scale-y-0"
            }`}>
            <div className="chat-bubble w-96 bg-transparent">
              <div className="text-gray-700">
                <div className="space-y-4 scale-125">
                  <div
                    onClick={() =>
                      window.open(
                        `https://api.whatsapp.com/send/?phone=6281347923588&text=Halo+%2C+Saya+melihat+dari+website+untuk+mobil+&type=phone_number&app_absent=0`,
                        "_blank"
                      )
                    }
                    className="flex justify-end items-center gap-2 hover:scale-95 duration-300">
                    <p className="whitespace-nowrap gap-4 skeleton bg-green-900/70 text-white px-2 rounded text-md font-medium">
                      Telepon Sekarang
                    </p>
                    <i
                      className={`fas fa-phone ${
                        showBubble ? "rotate-0 " : "animate-spin"
                      } duration-100 text-white text-2xl bg-green-600 p-2 rounded-full px-3`}></i>
                  </div>
                  {shuffledNames.map((name) => (
                    <div
                      key={name}
                      onClick={() =>
                        window.open(
                          `https://api.whatsapp.com/send/?phone=6281347923588&text=Halo+${name}%2C+Saya+melihat+dari+website+untuk+mobil+&type=phone_number&app_absent=0`,
                          "_blank"
                        )
                      }
                      className="flex justify-end items-center gap-2 hover:scale-95 duration-300">
                      <p className="whitespace-nowrap gap-4 skeleton bg-orange-800/85 text-white px-2 rounded text-md font-medium">
                        {name}
                      </p>
                      <i className="fa-brands fa-whatsapp text-green-500 text-2xl"></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <img
            src={require("../../Images/Icon/contact.png")}
            className={`h-40 w-40 duration-300 active:scale-95 ${
              showBubble && "skeleton *:bg-black/5 bg-opacity-20"
            }`}
            width={100}
            alt=""
          />
        </div>
      </label>
    </>
  );
};
