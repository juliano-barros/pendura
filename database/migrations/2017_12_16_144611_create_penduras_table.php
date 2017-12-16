<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePendurasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penduras', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id_saler');
            $table->integer('user_id_costumer');
            $table->decimal('price');
            $table->date('pendura_date');
            $table->boolean('added_saler');
            $table->boolean('added_costumer');
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
        Schema::dropIfExists('penduras');
    }
}
