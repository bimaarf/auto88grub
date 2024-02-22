import React from "react";

export const TestimonyList = ({ getTestimony }) => {
  return (
    <div className="bg-white w-full border  border-gray-100 bg-opacity-10 backdrop-blur-sm p-4 pb-32">
      {getTestimony.data.map((item, key) => (
        <div key={key}>
          <div className="collapse select-none whitespace-nowrap outline-none overflow-x-auto collapse-arrow bg-white hover:bg-gray-50 duration-300 border  mt-4">
            <input type="checkbox" name="my-accordion-2" id="my-wallet" />
            <div className="collapse-title text-xl font-medium">
              <div className="lg:flex space-y-4 lg:space-y-0 justify-start xl:max-w-screen-lg items-center">
                <div className="flex gap-2 lg:w-1/3 justify-start items-center">
                  <img
                    className="rounded-full"
                    src={`${process.env.REACT_APP_API_IMG}storage/${item.image}`}
                    width={60}
                    alt=""
                  />

                  <div>
                    <p className="text-lg font-semibold text-cyan-800 uppercase">
                      {item.name}
                    </p>
                    <p className="text-sm font-normal text-gray-700 lowercase">
                      {item.testimoni_at}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 lg:w-1/3  text-md font-semibold justify-start items-center ">
                  <span className="badge badge-sm text-gray-700 bg-black/10 p-2">
                    {item.brand_name}
                  </span>
                </div>
                <div className="flex justify-end items-center">
                  <button className="font-semibold flex items-center gap-1 bg-cyan-900 duration-300 text-white capitalize px-6 py-2 text-xs rounded-md">
                    <i className="fa-solid fa-handshake"></i>
                    <span>Testimonial</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="collapse-content">
              <div className="flex justify-between items-center space-y-2 mt-4 border-t pt-4">
                <div className="flex justify-center items-center">
                  <div className="prose prose-slate text-sm text-center">
                    <p className="whitespace-pre-wrap italic font-thin">
                      "{item.description}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="menu bg-white mt-4 border menu-horizontal rounded-box flex md:w-1/3 items-start justify-start">
            <li className="w-1/2">
              <div className="flex justify-start items-center gap-1">
                <i className="fa-solid fa-user"></i>
                <p className="whitespace-nowrap">{item.name}</p>
                <span className="badge badge-sm fas fa-check"></span>
              </div>
            </li>
            <li
              className="w-1/2"
              onClick={() => window.open(item.link, "_blank")}>
              <div className="text-red-500 flex justify-start items-center gap-1">
                <i className="fa-brands fa-youtube"></i>
                <span className="badge badge-sm bg-black/10 p-2">Youtube</span>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};
