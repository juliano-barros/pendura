<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Pendura;

class Pendura_product extends Model
{
    //
    public function pendura(){
    	return $this->belongsTo(Pendura:class);
    }
}
