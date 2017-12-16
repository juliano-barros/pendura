<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Pendura;

class Pendura_payment extends Model
{
    //

    public function pendura(){
    	return $this->belongsTo(Pendura::class);
    }
}
