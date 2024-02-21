import React from "react";

export const Footer = () => {
  return (
    <div>
      <div className="bg-black/80 md:px-20 md:py-10 pt-4 rounded-t-badge">
        <div className="md:flex justify-between items-start md:gap-10 mx-3">
          <div className="text-white pt-2">
            <h1 className="font-medium">Alamat</h1>
            <p className="mt-4 ml-2">
              Auto Mobil88 (Depan Raja Uduk / Bank Danamon Serdam / 350m dari
              simpang Polda) Jl. Sei Raya Dalam No.A2, Sungai Raya, Kec. Sungai
              Raya, Kabupaten Kubu Raya, Kalimantan Barat 78234
            </p>
            <h1 className="mt-4 font-medium">Kontak</h1>
            <div className="mt-4 ml-2 flex items-center gap-2">
              <i className="fa fa-phone"></i>
              <p>081226017788</p>
            </div>
            <h1 className="mt-4 font-medium">Website</h1>
            <div className="mt-4 ml-2 flex items-center gap-2">
              <i className="fa fa-globe"></i>
              <a href="https://auto88group.com/" target="__blank">
                https://auto88group.com/
              </a>
            </div>
            <h1 className="mt-4 font-medium">Instagram</h1>
            <div className="mt-4 ml-2 flex items-center gap-2">
              <i className="fa-brands fa-instagram"></i>
              <a
                href="https://www.instagram.com/auto88group.official"
                target="__blank">
                @auto88group.official
              </a>
            </div>
            <h1 className="mt-4 font-medium">Facebook</h1>
            <div className="mt-4 ml-2 flex items-center gap-2">
              <i className="fa-brands fa-facebook"></i>
              <a
                href="https://www.facebook.com/auto88group.id"
                target="__blank">
                auto88group
              </a>
            </div>
            <h1 className="mt-4 font-medium">Tiktok</h1>
            <div className="mt-4 ml-2 flex items-center gap-2">
              <i className="fa-brands fa-tiktok"></i>
              <a
                href="https://www.facebook.com/auto88group.id"
                target="__blank">
                @auto88group.official
              </a>
            </div>
            <h1 className="mt-4 font-medium">Twitter</h1>
            <div className="mt-4 ml-2 flex items-center gap-2">
              <i className="fa-brands fa-twitter"></i>
              <a href="https://twitter.com/auto88group" target="__blank">
                @auto88group
              </a>
            </div>
          </div>
          <iframe
            className="w-full mt-10 md:mt-0 h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31918.530705747184!2d109.3129089120015!3d-0.05711189630879183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d5b55c8a317d9%3A0x242874b558373c1f!2sAuto%20Mobil88%20(Depan%20Raja%20Uduk%20%2F%20Bank%20Danamon%20Serdam%20%2F%20350m%20dari%20simpang%20Polda)!5e0!3m2!1sen!2sid!4v1707962147844!5m2!1sen!2sid"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="rounded bg-opacity-20 skeleton mt-4 p-4 text-white">
          <p className="text-center">© Copyright 2022 CV AUTOPLAZA 88</p>
        </div>
      </div>
    </div>
  );
};
