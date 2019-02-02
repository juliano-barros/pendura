<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Pendura_payment;

class Pendura_payment_approve extends Model
{
    //

    public function pendura_payment(){
    	return $this->belongsTo(Pendura_payment::class);
    }
}
