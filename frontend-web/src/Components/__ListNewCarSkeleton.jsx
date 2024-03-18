import React from "react";

export const ListNewCarSkeleton = () => {
  return (
    <>
      {(function (rows, i, len) {
        while (++i <= len) {
          rows.push(
            <div
              key={i}
              className="block active:scale-90 hover:scale-95 cursor-pointer duration-300 w-full max-w-[32rem] rounded-lg bg-base-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className=" overflow-hidden bg-cover bg-no-repeat">
                <div className=" overflow-hidden bg-cover flex bg-no-repeat justify-center items-center">
                  <img
                    className="skeleton animate-ping"
                    src="https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
                    alt=""
                  />
                  <i className="fas fa-spinner text-3xl align-middle self-center absolute text-gray-300 animate-spin"></i>
                </div>
              </div>
              <div className="p-6">
                <p className="skeleton h-3 w-full"></p>
                <p className="skeleton h-3 w-2/3 mt-2"></p>
                <div className="flex justify-end">
                  <p className="skeleton h-2 w-1/2 mt-2"></p>
                </div>
                <div className="flex justify-end">
                  <p className="skeleton h-2 w-1/2 mt-2"></p>
                </div>
                <div className="flex justify-between">
                  <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-gray-600">
                    <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                      <p className="skeleton h-2 w-4 mt-2"></p>
                      <p className="skeleton h-2 w-10 mt-2"></p>
                    </div>
                    <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                      <p className="skeleton h-2 w-4 mt-2"></p>
                      <p className="skeleton h-2 w-10 mt-2"></p>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4 justify-between items-center whitespace-nowrap gap-2 font-medium  text-gray-600">
                    <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                      <p className="skeleton h-2 w-4 mt-2"></p>
                      <p className="skeleton h-2 w-10 mt-2"></p>
                    </div>
                    <div className="flex justify-start text-xs col-span-2 items-center gap-2">
                      <p className="skeleton h-2 w-4 mt-2"></p>
                      <p className="skeleton h-2 w-10 mt-2"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return rows;
      })([], 0, 4)}
    </>
  );
};
