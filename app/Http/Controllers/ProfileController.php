<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\user;
use App\AccessToken;

class ProfileController extends Controller
{
    //

    public function profile( Request $request ){

    	return response(auth()->guard('api')->user());

    }
}
