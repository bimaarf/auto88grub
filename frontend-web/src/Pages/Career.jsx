import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { useStateContext } from "../Providers/StateProvider";
import { HighLightHeader } from "./Context/__HighLightHeader";

export const Career = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { state } = useStateContext();
  const { getCompanyProfile } = state;
  const navRedirect = useNavigate();

  return (
    <>
      <HighLightHeader />

      <div className="md:container mb-44 bg-base-200/40 rounded-xl -mt-20 p-4 md:p-20 sm:mx-2 md:mx-auto shadow">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_1"
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
            className="tab-content bg-base-100 border-b border-base-300 space-y-2 rounded-box p-6">
            {getCompanyProfile &&
              getCompanyProfile.vacancies.map((item, key) => (
                <div
                  key={key}
                  className="collapse bg-base-200/40 bg-opacity-20">
                  <input defaultChecked type="checkbox" />
                  <div className="collapse-title text-md font-medium">
                    <p className=" border-b border-base-300 pb-2">
                      {item.name}
                    </p>
                  </div>
                  <div className="collapse-content">
                    <div className="md:flex space-y-4 md:space-y-0 justify-start items-center gap-10">
                      <div className="flex w-1/4 justify-start text-sky-700 text-sm whitespace-nowrap items-center gap-4">
                        <i className="fas w-1/12 fa-shopping-bag"></i>
                        <p className="w-3/4">{item.department}</p>
                      </div>
                      <div className="flex w-1/4 justify-start text-sky-700 text-sm whitespace-nowrap items-center gap-4">
                        <i className="fas w-1/12 fa-signal "></i>
                        <p className="w-3/4">{item.experience}</p>
                      </div>
                      <div className="flex w-1/4 justify-start text-sky-700 text-sm whitespace-nowrap items-center gap-4">
                        <i className="fas w-1/12 fa-map-marker-alt"></i>
                        <p className="w-3/4">{item.placement}</p>
                      </div>
                      <div
                        onClick={() =>
                          navRedirect("/karir/preview?uid=" + item.id, {
                            params: {
                              id: item.id,
                              name: item.name,
                            },
                          })
                        }
                        className="flex glass bg-base-200 w-fit float-right text-pretty active:scale-95 duration-300 px-4 py-2 rounded cursor-pointer justify-start text-sm whitespace-nowrap items-center gap-4">
                        <i className="fas w-1/12 fa-paper-plane"></i>
                        <p className="w-3/4">Apply</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
