import React from "react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";

export const Visit = () => {
  return (
    <>
      <div
        className="w-full -z-10 px-20 relative top-0"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundSize: "cover", // Ensure the background image covers the entire container
          height: "40vh",
          // filter: "blur(2px)", // Apply blur effect to the image
        }}>
        <div className="absolute inset-0 bg-gradient-to-b flex justify-center from-transparent to-black">
          <div className="md:p-20 p-8 md:rounded-xl">
            <div className="text-white flex justify-center items-center align-middle">
              <div
                className="md:space-y-4 font-bold text-center align-middle flex  bg-black px-10 py-4 bg-opacity-20"
                style={{ fontFamily: "'Marko One', sans-serif" }}>
                <div className="space-y-4">
                  <h1 className="text-white text-3xl capitalize">
                    Kunjungi Kami
                  </h1>
                  <h1 className="text-xl md:text-5xl">AUTO88GROUP</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-44 bg-white rounded-xl -mt-20 p-10 md:p-20 mx-auto">
        <h1 className="text-xl md:text-5xl w-full border-b mb-6 pb-4 border-dashed font-semibold text-gray-800">
          Lokasi Auto Show 88
        </h1>
        <div className="flex items-start gap-16 p-4">
          <div className="sm:w-full md:w-2/3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7979.635141548384!2d109.308991!3d-0.035121!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d59199c805a8f%3A0xd5fa7e325da71634!2sAuto%20Show%2088%20(Samping%20Gg.%20Sepakat%205%20%2F%20Depan%20Gedung%20Olahraga%20Bulutangkis%20%2F%201Km%20dari%20simpang%20lampu%20merah%20Soetomo)!5e0!3m2!1sen!2sid!4v1707967361277!5m2!1sen!2sid"
              allowfullscreen=""
              loading="lazy"
              className="w-full h-96"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          {/* column 2 */}
          <div className="sm:w-full md:w-1/3">
            <p className="font-semibold text-sky-700">Auto Show 88</p>
            <p className="mt-4 pb-6 border-b border-dashed">
              Jl. Dr. Wahidin. S No.A88, Sungai Jawi, Kec. Pontianak Kota, Kota
              Pontianak, Kalimantan Barat 78115 (Samping Gg. Sepakat 5 / Depan
              Gedung Olahraga Bulutangkis / 1Km dari simpang lampu merah
              Soetomo)
            </p>
          </div>
        </div>
        <h1 className="text-xl md:text-5xl w-full border-b mb-6 pb-4 border-dashed font-semibold text-gray-800">
          Lokasi Auto Mobil88
        </h1>
        <div className="flex items-start gap-16 p-4">
          <div className="sm:w-full md:w-1/3">
            <p className="font-semibold text-sky-700">Auto Mobil88</p>
            <p className="mt-4 pb-6 border-b border-dashed">
              Jl. Sei Raya Dalam No.A2, Sungai Raya, Kec. Sungai Raya, Kabupaten
              Kubu Raya, Kalimantan Barat 78234 (Depan Raja Uduk / Bank Danamon
              Serdam / 350m dari simpang Polda)
            </p>
          </div>
          <div className="sm:w-full md:w-2/3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15959.26046354579!2d109.359828!3d-0.072617!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d5b55c8a317d9%3A0x242874b558373c1f!2sAuto%20Mobil88%20(Depan%20Raja%20Uduk%20%2F%20Bank%20Danamon%20Serdam%20%2F%20350m%20dari%20simpang%20Polda)!5e0!3m2!1sen!2sid!4v1707967707354!5m2!1sen!2sid"
              width="600"
              height="450"
              className="w-full h-96"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          {/* column 2 */}
        </div>
        <h1 className="text-xl md:text-5xl w-full border-b mb-6 pb-4 border-dashed font-semibold text-gray-800">
          Lokasi Autoplaza 88
        </h1>
        <div className="flex items-start gap-16 p-4">
          <div className="sm:w-full md:w-2/3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7979.633220272885!2d109.314276!3d-0.05305!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d596cb67affd1%3A0x5e02ddf330622cb!2sAutoplaza%2088%20(Depan%20Jl.%20Morodadi%20%2F%20Samping%20Gg.%20Ekadaya%20%2F%20800mtr%20dari%20simpang%20Kota%20Baru)!5e0!3m2!1sen!2sid!4v1707967737151!5m2!1sen!2sid"
              width="600"
              height="450"
              className="w-full h-96"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          {/* column 2 */}
          <div className="sm:w-full md:w-1/3">
            <p className="font-semibold text-sky-700">Autoplaza 88</p>
            <p className="mt-4 pb-6 border-b border-dashed">
              Jl. Prof. M.Yamin No.A88, Kota Baru, Kec. Pontianak Sel., Kota
              Pontianak, Kalimantan Barat 78113 (Depan Jl. Morodadi / Samping
              Gg. Ekadaya / 800mtr dari simpang Kota Baru)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
