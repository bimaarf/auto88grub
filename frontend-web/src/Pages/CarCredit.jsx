import React, { useEffect } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { useStateContext } from "../Providers/StateProvider";
import { Footer } from "../Components/Footer";
import { SkeletonConsultation } from "./Components/__SkeletonConsultation";

export const CarCredit = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { state } = useStateContext();
  const { getCompanyProfile } = state;
  return (
    <>
      <HighLightHeader />

      <div className="md:container mb-44 bg-base-200/40 rounded-xl -mt-20 p-10 md:p-20 sm:mx-2 md:mx-auto shadow">
        <h1 className="w-full border-b mb-6 pb-2 border-dashed font-semibold text-red-800">
          Kredit Mobil
        </h1>
        <div className="grid sm:grid-cols-1 gap-4 space-y-40 md:space-y-0 md:grid-cols-4">
          {getCompanyProfile ? (
            getCompanyProfile.creditCar.map((item, key) => (
              <div key={key}>
                <div className="flex justify-center slide-in fade-in-left">
                  <img
                    draggable={false}
                    loading="eager"
                    src={`${process.env.REACT_APP_API}storage/${item.image}`}
                    alt=""
                  />
                </div>
                <div className="text-center mt-4 slide-in fade-in-left">
                  <p>{item.title}</p>
                  <article className="prose prose-slate">
                    <p className="whitespace-pre-wrap italic  font-thin">
                      {item.body}
                    </p>
                  </article>
                </div>
              </div>
            ))
          ) : (
            <SkeletonConsultation />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
