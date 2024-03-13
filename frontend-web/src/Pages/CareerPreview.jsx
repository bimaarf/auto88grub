import React, { useEffect, useState } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { Footer } from "../Components/Footer";
import { useStateContext } from "../Providers/StateProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDetailVacancy } from "./Service/__FetchDetailVacancy";

export const CareerPreview = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const { state } = useStateContext();
  const { getCompanyProfile } = state;
  const navRedirect = useNavigate();
  const [getData, setData] = useState("");
  const __GET_DATA_ = async () => {
    try {
      const response = await fetchDetailVacancy(location.search.split("=")[1]);
      console.log(response);
    } catch (error) {}
  };
  useEffect(() => {
    __GET_DATA_();
  }, []);
  return (
    <>
      <HighLightHeader />
      <div className="md:container slide-in fade-in-left mb-44 bg-base-100 border border-base-300  rounded-xl -mt-20 p-10 md:p-20 sm:mx-2 md:mx-auto">
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
                          navRedirect("/karir/preview?uid=" + item.id)
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
