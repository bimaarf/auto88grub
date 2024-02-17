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
        Schema::create('car_locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->double('latitude');
            $table->double('longitude');
            $table->boolean('is_unlimited')->default(false);
            $table->integer('limitation');
            $table->boolean('is_visible')->default(true);
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
        Schema::dropIfExists('car_locations');
    }
};
