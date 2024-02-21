import React, { useEffect } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";

export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HighLightHeader />

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
