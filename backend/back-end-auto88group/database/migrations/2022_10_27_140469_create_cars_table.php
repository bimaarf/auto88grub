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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('police_number');
            $table->string('chassis_number')->nullable();
            $table->string('machine_number')->nullable();
            $table->string('slug')->nullable();
            $table->unsignedBigInteger('car_brand_id');
            $table->foreign('car_brand_id')->references('id')->on('car_brands');
            $table->unsignedBigInteger('car_model_id');
            $table->foreign('car_model_id') ->references('id')->on('car_models');
            $table->unsignedBigInteger('car_type_id');
            $table->foreign('car_type_id')->references('id')->on('car_types');
            $table->unsignedBigInteger('car_kind_id');
            $table->foreign('car_kind_id')->references('id')->on('car_kinds');
            $table->unsignedBigInteger('car_cylinder_id');
            $table->foreign('car_cylinder_id')->references('id')->on('car_cylinders');
            $table->unsignedBigInteger('car_transmission_id');
            $table->foreign('car_transmission_id')->references('id')->on('car_transmissions');
            $table->unsignedBigInteger('car_series_id');
            $table->foreign('car_series_id')->references('id')->on('car_series');
            $table->unsignedBigInteger('car_gear_id');
            $table->foreign('car_gear_id')->references('id')->on('car_gears');
            $table->unsignedBigInteger('car_fuel_id');
            $table->foreign('car_fuel_id')->references('id')->on('car_fuels');
            $table->unsignedBigInteger('car_color_id');
            $table->foreign('car_color_id')->references('id')->on('car_colors');
            $table->unsignedBigInteger('car_row_id');
            $table->foreign('car_row_id')->references('id')->on('car_rows');
            $table->unsignedBigInteger('car_year_id');
            $table->foreign('car_year_id')->references('id')->on('car_years');
            $table->enum('category', ['passenger', 'commercial'])->nullable();
            $table->text('link_youtube')->nullable();
            $table->bigInteger('cash_mutation')->default(0);
            $table->bigInteger('credit_mutation')->default(0);
            $table->bigInteger('cash_non_mutation')->default(0);
            $table->bigInteger('credit_non_mutation')->default(0);
            $table->bigInteger('price')->default(0);
            $table->unsignedBigInteger('box_location_id')->nullable();
            $table->foreign('box_location_id')->references('id')->on('box_locations');
            $table->unsignedBigInteger('car_location_id')->nullable();
            $table->foreign('car_location_id')->references('id')->on('car_locations');
            $table->enum('borrowed_by', ['someone', 'customer'])->nullable();
            $table->enum('photo_status', ['duplicate', 'official'])->nullable();
            $table->boolean('is_visible')->default(true);
            $table->boolean('is_approved')->default(false);
            $table->boolean('is_hold')->default(false);
            $table->boolean('is_sold')->default(false);
            $table->boolean('is_document_complete')->default(false);
            $table->boolean('is_ready')->default(false);
            $table->longText('description')->nullable();
            $table->longText('note')->nullable();
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
        Schema::dropIfExists('cars');
    }
};
