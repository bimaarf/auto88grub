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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_vacancy_id');
            $table->foreign('job_vacancy_id')->references('id')->on('job_vacancies');
            $table->string('name');
            $table->string('phone_number');
            $table->string('email');
            $table->string('domicile');
            $table->string('education');
            $table->string('major');
            $table->boolean('fresh_graduate')->default(false);
            $table->string('file')->nullable();
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
        Schema::dropIfExists('job_applications');
    }
};
