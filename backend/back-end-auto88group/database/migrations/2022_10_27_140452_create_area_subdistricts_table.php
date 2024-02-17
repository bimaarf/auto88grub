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
        Schema::create('area_subdistricts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('area_province_id');
            $table->foreign('area_province_id')->references('id')->on('area_provinces');
            $table->unsignedBigInteger('area_city_id');
            $table->foreign('area_city_id')->references('id')->on('area_cities');
            $table->unsignedBigInteger('area_district_id');
            $table->foreign('area_district_id')->references('id')->on('area_districts');
            $table->string('name');
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
        Schema::dropIfExists('area_subdistricts');
    }
};
