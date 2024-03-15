import React, { useEffect } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { Footer } from "../Components/Footer";
import { useStateContext } from "../Providers/StateProvider";
export const FAQ = () => {
  const { state } = useStateContext();
  const { getCompanyProfile } = state;
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(getCompanyProfile && getCompanyProfile.faq);
  }, []);
  return (
    <>
      <HighLightHeader />
      <div className="md:container mb-44 bg-base-200/40 rounded-xl -mt-20 p-4 md:p-20 sm:mx-2 md:mx-auto shadow">
        <div role="tablist" className="tabs tabs-lifted slide-in fade-in-left">
          {getCompanyProfile &&
            getCompanyProfile.faq.map((item, key) => (
              <>
                <input
                  checked
                  type="radio"
                  name="my_tabs_2"
                  id="tab1"
                  role="tab"
                  className="tab"
                  aria-controls="tabpanel1"
                  aria-label={item.name}
                  onChange={(e) => e.preventDefault()}
                />
                <div
                  id="tabpanel1"
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                  {item.questions &&
                    item.questions.map((list, keyList) => (
                      <div
                        key={keyList}
                        className="collapse bg-base-200 bg-opacity-20">
                        <input type="checkbox" defaultChecked />
                        <div className="collapse-title text-md font-medium">
                          {list.question}
                        </div>
                        <div className="collapse-content">
                          <p>{list.answer}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
