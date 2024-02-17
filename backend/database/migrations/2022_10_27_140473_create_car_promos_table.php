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
        Schema::create('car_promos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('car_id');
            $table->foreign('car_id')->references('id')->on('cars');
            $table->integer('price')->nullable(); // harga mobil
            $table->integer('discount')->nullable(); // discount
            $table->integer('down_payment')->nullable(); // uang muka
            $table->integer('total_down_payment')->nullable(); // tdp
            $table->integer('payment_to_dealer')->nullable(); // pencairan
            $table->integer('on_the_road')->nullable(); // on the road
            $table->integer('monthly_installment')->nullable(); // angsuran per bulan
            $table->integer('installment_period')->nullable(); // tenor
            $table->decimal('deviasi', 5, 2)->nullable(); // deviasi 10.64%
            $table->decimal('rate', 5, 2)->nullable(); // rate 10.64%
            $table->integer('mrp')->nullable(); // mrp
            $table->unsignedBigInteger('leasing_id'); // leasing
            $table->foreign('leasing_id')->references('id')->on('other_leasings'); // leasing
            $table->enum('insurance', ['TLO', 'ALL RISK', 'COMBI 1', 'COMBI 2', 'COMBI 3', 'COMBI 4', 'COMBI 5'])->nullable(); // insurance
            $table->enum('guarantee', ['1 YEAR', '2 YEAR', '3 YEAR', '4 YEAR', '5 YEAR', '6 YEAR'])->nullable(); // guarantee
            $table->enum('administration', ['ADDM', 'ADDB'])->nullable();
            $table->string('image')->nullable(); // gambar brosur
            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_visible')->default(false);
            $table->boolean('is_done')->default(false);
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
        Schema::dropIfExists('car_promos');
    }
};
