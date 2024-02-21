import React, { useState } from "react";
export const CircleModal = () => {
  const [showBubble, setShowBubble] = useState(false);

  return (
    <>
      {/* <CircleMenuModal /> */}
      <div
        className={`flex justify-center duration-1000 fixed z-30 bottom-36 md:bottom-44 scale-75 -right-7 ${
          showBubble ? "opacity-100" : "opacity-0 rotate-90"
        }`}></div>
      <label
        onClick={() => setShowBubble(showBubble ? false : true)}
        htmlFor="my-modal-help"
        className="fixed z-30 scale-50 lg:scale-100 bottom-0 right-20 cursor-pointer inline-block rounded-full duration-200 leading-normal text-white">
        <div className="flex">
          <div
            className={`chat duration-500 chat-end  relative bottom-20 right-0 mr-4 z-50 ${
              showBubble ? "scale-100" : "scale-0"
            }`}>
            <div className="chat-bubble w-96 bg-transparent">
              <div className="text-gray-800">
                <div className="space-y-4">
                  <div
                    onClick={() =>
                      window.open(
                        "https://api.whatsapp.com/send/?phone=6281347923588&text=Halo+Eliana%2C+Saya+melihat+dari+website+untuk+mobil+&type=phone_number&app_absent=0",
                        "_blank"
                      )
                    }
                    className="flex justify-end items-center gap-2 hover:scale-95 duration-300">
                    <p className="whitespace-nowrap gap-4 bg-gray-400 px-2 rounded">
                      Eliana
                    </p>
                    <i className="fa-brands fa-whatsapp text-green-500 text-4xl"></i>
                  </div>
                  <div
                    onClick={() =>
                      window.open(
                        "https://api.whatsapp.com/send/?phone=6281344386688&text=Halo+Lestari%2C+Saya+melihat+dari+website+untuk+mobil+&type=phone_number&app_absent=0",
                        "_blank"
                      )
                    }
                    className="flex justify-end items-center gap-2 hover:scale-95 duration-300">
                    <p className="whitespace-nowrap gap-4 bg-gray-400 px-2 rounded">
                      Lestari
                    </p>
                    <i className="fa-brands fa-whatsapp text-green-500 text-4xl"></i>
                  </div>
                  <div
                    onClick={() =>
                      window.open(
                        "https://api.whatsapp.com/send/?phone=6281344393388&text=Halo+Zulfa%2C+Saya+melihat+dari+website+untuk+mobil+&type=phone_number&app_absent=0",
                        "_blank"
                      )
                    }
                    className="flex justify-end items-center gap-2 hover:scale-95 duration-300">
                    <p className="whitespace-nowrap gap-4 bg-gray-400 px-2 rounded">
                      Zulfa
                    </p>
                    <i className="fa-brands fa-whatsapp text-green-500 text-4xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src={require("../../Images/Icon/contact.png")}
            className={`h-40 w-full duration-300 active:scale-95 ${showBubble && 'skeleton *:bg-black/5 bg-opacity-20'}`}
            width={100}
            alt=""
          />
        </div>
      </label>
    </>
  );
};
