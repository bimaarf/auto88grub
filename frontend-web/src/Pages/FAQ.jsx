import React, { useEffect, useState } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";
import { Footer } from "../Components/Footer";
import { useStateContext } from "../Providers/StateProvider";

export const FAQ = () => {
  const { state } = useStateContext();
  const { getCompanyProfile } = state;
  const [faqItems, setFaqItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(getCompanyProfile && getCompanyProfile.faq);
    // Set initial state for faqItems
    if (getCompanyProfile && getCompanyProfile.faq) {
      setFaqItems(
        getCompanyProfile.faq.map((item) => ({
          ...item,
          questions: item.questions.map((question) => ({
            ...question,
            expanded: false, // Initially set all questions as collapsed
          })),
        }))
      );
    }
  }, [getCompanyProfile]);

  const handleToggleCollapse = (faqIndex, questionIndex) => {
    setFaqItems((prevFaqItems) =>
      prevFaqItems.map((faqItem, index) => {
        if (index === faqIndex) {
          return {
            ...faqItem,
            questions: faqItem.questions.map((question, qIndex) => {
              if (qIndex === questionIndex) {
                return {
                  ...question,
                  expanded: !question.expanded, // Toggle the expanded state
                };
              }
              return question;
            }),
          };
        }
        return faqItem;
      })
    );
  };

  return (
    <>
      <HighLightHeader />
      <div className="md:container mb-44 bg-base-200/40 rounded-xl -mt-20 p-4 md:p-20 sm:mx-2 md:mx-auto shadow">
        <div role="tablist" className="tabs tabs-lifted slide-in fade-in-left">
          {faqItems.map((item, faqIndex) => (
            <React.Fragment key={faqIndex}>
              <input
                defaultChecked
                type="radio"
                name="my_tabs_2"
                id={`tab${faqIndex + 1}`}
                role="tab"
                className="tab"
                aria-controls={`tabpanel${faqIndex + 1}`}
                aria-label={item.name}
                onChange={(e) => e.preventDefault()}
              />
              <div
                id={`tabpanel${faqIndex + 1}`}
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                {item.questions.map((list, keyList) => (
                  <div
                    key={keyList}
                    className="collapse bg-base-200 bg-opacity-20">
                    <input type="checkbox" />
                    <div
                      className={`collapse-title flex justify-start items-center gap-1 text-md font-medium ${
                        list.expanded ? "rotate-45" : "rotate-0"
                      }`}
                      onClick={() => handleToggleCollapse(faqIndex, keyList)}>
                      <i className="fas fa-angle-right"></i>
                      <p>{list.question}</p>
                    </div>
                    <div className="collapse-content">
                      <p>{list.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
