import React, { useEffect } from "react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";
import { useLocation } from "react-router-dom";
import { TECarousel, TECarouselItem } from "tw-elements-react";

export const CarPreview = () => {
  const location = useLocation();
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

  useEffect(() => {

    window.scrollTo(0, 0);

    // Add more slides here if needed
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
            <div className="text-white flex justify-center items-center">
              <div
                className="md:space-y-4 sm:text-3xl md:text-6xl font-bold text-center"
                style={{ fontFamily: "'Marko One', sans-serif" }}>
                <h1>DAIHATSU ALL NEW AYLA (WHITE) TIPE X 1.0 M/T (2023)</h1>
              </div>
            </div>
            <p className="md:mt-10 mt-4 sm:text-xs md:text-lg font-medium text-white text-center">
              Pencarian unit mobil dan transaksional akan kami arahkan ke mobbi.
              Kenalan dulu yuk!
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white pb-32 md:container sm:mx-2 md:mx-auto">
        <div className="w-11/12  mx-auto mt-10 z-30 relative">
          <div className="flex justify-center">
            <div
              className="md:space-y-4 sm:text-xl whitespace-nowrap  text-gray-800 p-4  font-bold text-center"
              style={{ fontFamily: "'Marko One', sans-serif" }}>
              <div className="md:p-10 md:space-y-10 md:text-4xl lg:text-4xl element">
                <h1>Mobil Rekomendasi</h1>
              </div>
            </div>
          </div>
          <TECarousel showControls showIndicators ride="carousel">
            <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
              <TECarouselItem
                itemID={1}
                className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                  {(function (rows, i, len) {
                    while (++i <= len) {
                      rows.push(
                        <div
                          key={i}
                          className="block hover:scale-105 cursor-pointer duration-300 w-full max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                          <div className="relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                              src="https://www.auto88group.com/image/car/1769/120240215151846.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                      if (window.innerWidth <= 768) break;
                    }
                    return rows;
                  })([], 0, 3)}
                </div>
              </TECarouselItem>
              <TECarouselItem
                itemID={2}
                className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                  {(function (rows, i, len) {
                    while (++i <= len) {
                      rows.push(
                        <div
                          key={i}
                          className="block hover:scale-105 cursor-pointer duration-300 w-full max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                          <div className="relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                              src="https://www.auto88group.com/image/car/1769/320240215151846.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                      if (window.innerWidth <= 768) break;
                    }
                    return rows;
                  })([], 0, 3)}
                </div>
              </TECarouselItem>
            </div>
          </TECarousel>
          <div className="border-b py-4 mt-20 w-full flex justify-between">
            <p className="font-medium text-xl">Video</p>
            <p className="font-bold text-blue-600 text-xl">
              Klick untuk menonton
            </p>
          </div>
          <div className="border-b py-4 w-full flex justify-between">
            <p className="font-medium text-xl">Merk</p>
            <p className="font-bold text-xl">DAIHATSU </p>
          </div>
          <div className="border-b py-4 w-full flex justify-between">
            <p className="font-medium text-xl">Model</p>
            <p className="font-bold text-xl">ALL NEW AYLA </p>
          </div>
          <div className="border-b py-4 w-full flex justify-between">
            <p className="font-medium text-xl">Tipe</p>
            <p className="font-bold text-xl">X</p>
          </div>
          <div className="border-b py-4 w-full flex justify-between">
            <p className="font-medium text-xl">Jenis</p>
            <p className="font-bold text-xl">LCGC</p>
          </div>
          <div className="border-b py-4 w-full flex justify-between">
            <p className="font-medium text-xl">Silinder</p>
            <p className="font-bold text-xl">1.0</p>
          </div>
          <div className="border-b py-4 w-full flex justify-between">
            <p className="font-medium text-xl">Transmisi</p>
            <p className="font-bold text-xl">M/T</p>
          </div>
          <div className="border-b py-4 w-full flex justify-between">
            <p className="font-medium text-xl">Seri</p>
            <p className="font-bold text-xl">-</p>
          </div>
          <div className="border-b py-4 w-full flex justify-between">
            <p className="font-medium text-xl">Gardan</p>
            <p className="font-bold text-xl">4x2</p>
          </div>
          <div className="border-b py-4 w-full flex justify-between">
            <p className="font-medium text-xl">Bahan Bakar</p>
            <p className="font-bold text-xl">PREMIUM</p>
          </div>
          <div className="border-b py-4 w-full flex justify-between">
            <p className="font-medium text-xl">Warna</p>
            <p className="font-bold text-xl">WHITE</p>
          </div>
          <h1 className="sm:text-xl mt-10 md:text-4xl w-full border-b mb-6 pb-4 border-dashed font-medium text-gray-800">
            Deskripsi Kendaraan
          </h1>
          <p className="whitespace-pre-wrap" style={{ whiteSpace: "pre-wrap" }}>
            DAIHATSU ALL NEW AYLA (ICY WHITE) TYPE X 1.0 M/T (2023) *Deskripsi:
            - IDR 1X4.000.000,- (Harga kredit) - Jarak Tempuh Original 5.149 KM
            - Pajak Hidup - Mobil Sangat Terawat - Interior Rapi - Kabin Lega &
            Nyaman Cocok Untuk Keluargan Kecil - Lincah & Aerodinamis - Tarikan
            Mesin Halus - Setir Ringan & Responsif *Spesifikasi: - In-line 3
            Cylinder 12 Valve DOHC - Kapasitas BBM 36 L - Kapasitas mesin 998 cc
            - Jumlah Kursi 5 - Ground Clearance 160 mm - Electric Power Steering
            - Anti Lock Braking System - EBD (Electronic Brake Distribution) -
            Vehicle Stability Control System *Keunggulan Kami: - Sobat Bisa
            Mendapatkan GRATIS JASA SERVICE HINGGA 2 (DUA) TAHUN - Sobat Tidak
            Perlu Khawatir, Jaminan Surat-surat Aman - Sobat Bisa Mendapatkan
            Garansi Mesin & Transmisi Selama 1 Tahun (Rusak Diganti) - Mesin
            Bermasalah? Tenang, kami Menyediakan Garansi Mesin - Sobat bisa Free
            Test Drive Sepuasnya - 99% Pasti Lolos - Showroom Kami Tetap Buka di
            Hari Minggu / Libur AUTO88GROUP - "WE BRING A QUALITY"
            WHATSAPP/CALL: 0812-2601-7788 (FAST RESPONSE) atau KLIK LINK:
            https://wa.me/6281226017788?text=Halo... WEBSITE:
            www.auto88group.com GOOGLE/FB/YT/TWITTER(X): "Auto88group"
            TIKTOK/THREADS/IG: "auto88group.official" Alamat Showroom: - Jln
            Sei. Raya Dalam No. A2 Kuburaya (Patokan 350m dari simpang Polda
            sebelah kiri) - Jln Prof. M. Yamin No. A88 Kota Baru Pontianak
            (Patokan 1km dari bundaran kota baru, sebelah kiri) - Jln Dr.
            Wahidin No. A88 Pontianak (Sebelah kiri Patokan 1km dari simpang
            lampu merah Dr. Soetomo) * Selama Promo Masih Berlaku *
            Deskripsi/Spesifikasi yang tertera diatas tidak dapat dijadikan alat
            bukti apapun * Syarat ketentuan berlaku sesuai dengan Leasing Yang
            Ada MoU * Melayani kredit seluruh Indonesia (Syarat ketentuan
            berlaku) Harga tertera merupakan harga kredit
          </p>

          <div className="flex justify-center">
            <h1 className="sm:text-xl mt-10 md:text-4xl w-full border-b mb-6 pb-4 border-dashed font-medium text-gray-800">
              Mobil Yang Serupa
            </h1>
          </div>
          <TECarousel showControls showIndicators ride="carousel">
            <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
              <TECarouselItem
                itemID={1}
                className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                  {(function (rows, i, len) {
                    while (++i <= len) {
                      rows.push(
                        <div
                          key={i}
                          className="block hover:scale-105 cursor-pointer duration-300 w-full max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                          <div className="relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                              src="https://www.auto88group.com/image/car/1769/120240215151846.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                      if (window.innerWidth <= 768) break;
                    }
                    return rows;
                  })([], 0, 3)}
                </div>
              </TECarouselItem>
              <TECarouselItem
                itemID={2}
                className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                  {(function (rows, i, len) {
                    while (++i <= len) {
                      rows.push(
                        <div
                          key={i}
                          className="block hover:scale-105 cursor-pointer duration-300 w-full max-w-[32rem] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                          <div className="relative overflow-hidden bg-cover bg-no-repeat">
                            <img
                              src="https://www.auto88group.com/image/car/1769/320240215151846.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                      if (window.innerWidth <= 768) break;
                    }
                    return rows;
                  })([], 0, 3)}
                </div>
              </TECarouselItem>
            </div>
          </TECarousel>
        </div>
      </div>
    </>
  );
};
