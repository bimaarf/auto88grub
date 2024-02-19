import React, { useEffect } from "react";
import bannerImg from "../Images/Banner/flag-red-white-indonesia_1912698.png";

export const Terms = () => {
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
                className="md:space-y-4 font-bold text-center align-middle flex  bg-black px-10 py-4 bg-opacity-20"
                style={{ fontFamily: "'Marko One', sans-serif" }}>
                <div className="space-y-4">
                  <h1 className="text-white text-3xl capitalize">
                    SYARAT & KETENTUAN
                  </h1>
                  <h1 className="text-xl md:text-5xl">AUTO88GROUP</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:container mb-44 bg-white rounded-xl -mt-20 p-10 md:p-20 sm:mx-2 md:mx-auto">
        <h1 className="text-xl md:text-5xl w-full border-b mb-6 pb-4 border-dashed font-semibold text-red-800">
          Syarat & Ketentuan Berlaku
        </h1>
        <ol className="list-decimal space-y-2">
          <li>Untuk pembelian CASH cukup membawa data identitas (KTP/SIM)</li>
          <li>
            <p>Untuk pembelian KREDIT syarat yang dibutuhkan adalah:</p>
            Fotokopi KTP Suami/Istri Fotokopi Kartu Keluarga Fotokopi NPWP
            Fotokopi Rekening Listrik/PBB/PDAM Fotokopi Rekening Tabungan (3
            Bulan Terakhir) Slip Gaji/Surat Keterangan Penghasilan
          </li>
          <li>
            Bawa Pulang Mobil Impianmu (Mobil dapat diambil sendiri ataupun
            diantar kerumah Anda)
          </li>
        </ol>
        <p className="text-gray-600 text-xs">
          *Bagi calon debitur yang belum memiliki rumah pribadi (Sewa/Kontrak)
          maka WAJIB melampirkan surat keterangan domisili dari Lurah/Camat dan
          Penjamin (Keluarga) yang tidak serumah/beda KK, Kemudian data tersebut
          akan masuk dalam proses pengajuan kredit di leasing/finance
        </p>
      </div>
    </>
  );
};
