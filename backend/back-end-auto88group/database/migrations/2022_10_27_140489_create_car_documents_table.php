<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car_documents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('car_id');
            $table->foreign('car_id')->references('id')->on('cars');
            $table->string('image')->nullable();
            $table->enum('category', ['bpkb', 'stnk', 'notice_pajak', 'sh', 'gesekan', 'kwitansi', 'faktur', 'sertifikat_nik', 'ktp_pembeli', 'kir', 'kartu_uji_timbang', 'surat_buka_blokir_samsat', 'surat_buka_blokir_leasing'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('car_documents');
    }
};
