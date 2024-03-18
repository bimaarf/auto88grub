import React from "react";

export const Footer = () => {
  return (
    <div>
      <div className="bg-black/90 md:px-20 md:py-10 pt-4 p-10 rounded-t-3xl">
        {/* <div className="md:flex justify-between items-start md:gap-10 mx-3">
          <div className="text-pretty pt-2">
            <h1 className="font-medium">Alamat</h1>
            <p className="mt-4 ml-2 w-2/3">
              Auto Mobil88 (Depan Raja Uduk / Bank Danamon Serdam / 350m dari
              simpang Polda) Jl. Sei Raya Dalam No.A2, Sungai Raya, Kec. Sungai
              Raya, Kabupaten Kubu Raya, Kalimantan Barat 78234
            </p>
          </div>
        </div> */}
        <div className="md:flex justify-center items-center text-white gap-10">
          <div>
            <h1 className="mt-4 font-medium">Instagram</h1>
            <div className="mt-4 flex items-center gap-2">
              <i className="fa-brands fa-instagram"></i>
              <a
                href="https://www.instagram.com/auto88group.official"
                target="__blank">
                @auto88group.official
              </a>
            </div>
          </div>
          <div>
            <h1 className="mt-4 font-medium">Facebook</h1>
            <div className="mt-4 flex items-center gap-2">
              <i className="fa-brands fa-facebook"></i>
              <a
                href="https://www.facebook.com/auto88group.id"
                target="__blank">
                auto88group
              </a>
            </div>
          </div>
          <div>
            <h1 className="mt-4 font-medium">Threads</h1>
            <div className="mt-4 flex items-center gap-2">
              <i className="fa-brands fa-threads"></i>
              <a
                href="https://www.threads.net/@auto88group.official"
                target="__blank">
                auto88group.official
              </a>
            </div>
          </div>
          <div>
            <h1 className="mt-4 font-medium">Youtube</h1>
            <div className="mt-4 flex items-center gap-2">
              <i className="fa-brands fa-youtube"></i>
              <a href="https://www.youtube.com/c/auto88group" target="__blank">
                auto88group
              </a>
            </div>
          </div>
          <div>
            <h1 className="mt-4 font-medium">Tiktok</h1>
            <div className="mt-4 flex items-center gap-2">
              <i className="fa-brands fa-tiktok"></i>
              <a
                href="https://www.facebook.com/auto88group.id"
                target="__blank">
                @auto88group.official
              </a>
            </div>
          </div>
          <div>
            <h1 className="mt-4 font-medium">Twitter</h1>
            <div className="mt-4 flex items-center gap-2">
              <i className="fa-brands fa-twitter"></i>
              <a href="https://twitter.com/auto88group" target="__blank">
                @auto88group
              </a>
            </div>
          </div>
        </div>
        <div className="rounded bg-opacity-20 skeleton mt-4 p-4 text-white">
          <p className="text-center">© Copyright 2022 CV AUTOPLAZA 88</p>
        </div>
      </div>
    </div>
  );
};
