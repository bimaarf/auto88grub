import React, { useEffect } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { useStateContext } from "../Providers/StateProvider";
import { Footer } from "../Components/Footer";

export const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { state } = useStateContext();
  const { getCompanyProfile } = state;
  return (
    <>
      <HighLightHeader />
      <div className="md:container mb-44 bg-white rounded-xl -mt-20 p-10 md:p-20 sm:mx-2 md:mx-auto shadow">
        {getCompanyProfile &&
          getCompanyProfile.term.map((item, key) => (
            <>
              <h1 className="text-xl md:text-5xl w-full border-b mb-6 pb-4 border-dashed font-semibold text-red-800 slide-in fade-in-left">
                {item.title}
              </h1>
              <div
                className={`md:flex ${
                  key % 2 === 1 && "flex-row-reverse"
                } justify-start mb-10 gap-10`}>
                <div
                  className="md:w-1/2 prose"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
                <div className="md:w-1/2">
                  <img
                    draggable={false}
                    loading="lazy"
                    src={`${process.env.REACT_APP_API}storage/${item.image}`}
                    alt=""
                  />
                </div>
              </div>
            </>
          ))}
      </div>
      <Footer />
    </>
  );
};
