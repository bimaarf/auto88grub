import React, { useEffect } from "react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";

export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
                className="md:space-y-4 font-bold text-center align-middle flex w-96 justify-center bg-black px-10 py-4 bg-opacity-20"
                style={{ fontFamily: "'Marko One', sans-serif" }}>
                <div className="space-y-4">
                  <h1 className="text-white text-3xl capitalize">Tentang Kami</h1>
                  <h1 className="text-xl md:text-5xl">AUTO88GROUP</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:container mb-44 bg-white rounded-xl -mt-20 p-10 md:p-20 sm:mx-1 md:mx-auto">
        <div className="md:flex items-start gap-16 p-4">
          <div className="sm:w-full md:w-1/2">
            <img
              src="https://auto88group.com/image/about-us/20230704142843.jpg"
              alt=""
            />
            <p className="mt-10 pb-6 border-b border-dashed">
              Showroom kami menjamin stok mobil bekas yang terbanyak dan
              terlengkap di KalBar.
            </p>
            <p className="mt-10 pb-6 border-b border-dashed">
              Kami menjamin unit-unit yang kami jual bukan merupakan bekas
              rental taksi, bukan bekas banjir, dll.
            </p>
            <p className="mt-10 pb-6 border-b border-dashed">
              Kami memiliki tim yang profesional dan berpengalaman untuk
              melayani konsumen dengan baik.
            </p>
            <p className="mt-10 pb-6 border-b border-dashed">
              Semua ini demi kepuasan pelanggan yang telah membeli mobil
              berkualitas tinggi dengan kami serta tidak ragu untuk
              merekomendasikannya.
            </p>
            <p className="mt-10 pb-6 border-b border-dashed">
              Kami ada karena Anda semua dan kami akan terus melakukan perubahan
              yang lebih baik untuk Anda.
            </p>
          </div>
          {/* column 2 */}
          <div className="sm:w-full md:w-1/2">
            <p className="mt-10 pb-6 border-b border-dashed">
              Kami adalah perusahaan yang bergerak dibidang penjualan mobil
              bekas berkualitas tinggi dengan slogan kami yakni "We Bring a
              Quality" dan berani memberi garansi hingga 2 tahun.
            </p>
            <p className="mt-10 pb-6 border-b border-dashed">
              Kami telah menggeluti bidang penjualan mobil bekas hampir 10 tahun
              di kota Pontianak. Kami sendiri melayani penjualan mobil bekas
              berkualitas se-Kalimantan Barat maupun di Indonesia.
            </p>
            <p className="mt-10 pb-6 border-b border-dashed">
              Kami menjual mobil-mobil berkualitas terbaik seperti Toyota,
              Daihatsu, Honda, dll.
            </p>
            <p className="mt-10 pb-6 border-b border-dashed">
              Dengan memiliki banyak stok dan varian untuk mempermudah Anda
              memilih atau membeli mobil yang Anda inginkan.
            </p>
            <img
              src="https://auto88group.com/image/about-us/20230704142838.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
