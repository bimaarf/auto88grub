import React from "react";

export const TestimonyListSkeleton = () => {
  return (
    <div className="bg-white w-full border  border-gray-100 bg-opacity-10 backdrop-blur-sm p-4 pb-32">
      <div>
        <div className="collapse fade-in-left select-none whitespace-nowrap outline-none overflow-x-auto collapse-arrow bg-white hover:bg-gray-50 duration-300 border  mt-4">
          <input type="checkbox" name="my-accordion-2" id="my-wallet" />
          <div className="collapse-title text-xl font-medium">
            <div className="lg:flex space-y-4 lg:space-y-0 justify-start xl:max-w-screen-lg items-center">
              <p className="skeleton w-16 h-16 rounded-full bg-opacity-50"></p>
              <div className="flex gap-2 lg:w-1/3 justify-start items-center">
                <div>
                  <p className="skeleton w-40 h-4 bg-opacity-50"></p>
                  <p className="skeleton mt-3 w-1/2 h-4 bg-opacity-50"></p>
                </div>
              </div>
              <div className="flex gap-2 lg:w-1/3  text-md font-semibold justify-start items-center ">
                <p className="skeleton mt-3 w-1/2 h-4 bg-opacity-50"></p>
                <p className="skeleton mt-3 w-1/2 h-4 bg-opacity-50"></p>
              </div>
            </div>
          </div>
          <div className="collapse-content">
            <div className="flex justify-between items-center space-y-2 mt-4 border-t pt-4">
              <div className="flex justify-center items-center">
                <div className="prose prose-slate text-sm text-center">
                  <p className="skeleton mt-2 w-96 h-4 bg-opacity-50"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="menu bg-white mt-4 border menu-horizontal rounded-box flex w-1/3 items-start justify-start">
          <li className="w-1/2">
            <div className="flex justify-start items-center gap-1">
              <p className="skeleton mt-2 w-1/12 h-4 bg-opacity-50"></p>
              <p className="skeleton mt-2 w-1/3 h-4 bg-opacity-50"></p>
              <p className="skeleton mt-2 w-1/12 h-4 bg-opacity-50"></p>
            </div>
          </li>
          <li className="w-1/2">
            <div className="flex justify-start items-center gap-1">
              <p className="skeleton mt-2 w-1/12 h-4 bg-opacity-50"></p>
              <p className="skeleton mt-2 w-1/3 h-4 bg-opacity-50"></p>
              <p className="skeleton mt-2 w-1/12 h-4 bg-opacity-50"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
