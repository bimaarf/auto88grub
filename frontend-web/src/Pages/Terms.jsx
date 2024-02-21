import React, { useEffect } from "react";
import { HighLightHeader } from "./Context/__HighLightHeader";

export const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HighLightHeader />
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
