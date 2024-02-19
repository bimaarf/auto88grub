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
        Schema::create('shop_category_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_category_id')->constrained()->onDelete('cascade');
            $table->foreignId('shop_product_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['shop_category_id', 'shop_product_id']);
            // $table->primary(['shop_category_id', 'shop_product_id'])->unique();
            // $table->foreignId('shop_category_id')->unique()->nullable();
            // $table->foreignId('shop_product_id')->unique()->nullable();
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shop_category_product');
    }
};
