import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import bannerImg from "../Images/Banner/red_wavy_with_halftone_background.jpg";
import { fetchBlogPreview } from "./Service/__FetchBlogPreview";
import { Footer } from "../Components/Footer";

export const CareerPreview = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const fadeInOnScroll = (ref) => {
    const element = ref.current;
    if (element) {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight) {
        element.classList.add("fade-in-visible");
      } else {
        element.classList.remove("fade-in-visible");
      }
    }
  };
  const [getPost, setPost] = useState("");

  const __GET_BLOG = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const slug = searchParams.get("slug");

    if (slug) {
      setPost(await fetchBlogPreview(slug));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    __GET_BLOG();
  }, []);
  return (
    <>
      <div
        className="w-full -z-10 px-20 relative top-0 overflow-hidden "
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "bottom right",
          backgroundSize: "cover",
          height: "60vh",
          marginBottom: "-17vh",
          // filter: "blur(2px)", // Apply blur effect to the image
        }}>
        <div className="absolute inset-0 mt-10 flex justify-center">
          <div className="md:p-20 p-8 md:rounded-xl">
            <div className="text-black/80 flex justify-center items-center">
              <div
                className="md:space-y-4 text-3xl sm:text-4xl md:text-5xl font-bold text-center"
                style={{ fontFamily: "'Marko One', sans-serif" }}>
                {getPost.title ? (
                  <h1>{getPost.title}</h1>
                ) : (
                  <div className="container w-screen mx-auto space-y-3">
                    <div className="flex justify-center">
                      <p className="h-6 w-10/12 skeleton bg-opacity-50"></p>
                    </div>
                    <div className="flex justify-center">
                      <p className="h-6 w-96 skeleton bg-opacity-50"></p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="md:mt-10 mt-4 sm:text-xs md:text-lg font-medium text-black/80 text-center">
              Pencarian unit mobil dan transaksional akan kami arahkan ke mobbi.
              Kenalan dulu yuk!
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white pb-32 md:container sm:mx-2 md:mx-auto shadow mb-10">
        <div className="w-11/12 mx-auto mt-10 z-30 relative p-20">
          {getPost && (
            <div className="prose whitespace-pre-line">{getPost.content}</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
