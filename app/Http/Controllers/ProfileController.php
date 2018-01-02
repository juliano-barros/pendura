<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\user;
use App\AccessToken;
use App\Repositories\ProfileRepository;

class ProfileController extends Controller
{
    //



    private $profileRepository;

    public function __construct( ProfileRepository $profile ){

    	$this->profileRepository = $profile;

    }

    public function profile( Request $request ){

    	$user = auth()->guard('api')->user();
    	$data = $user;

		if ( sizeof($user->pictures) > 0 )
	    	$data["picture"] = $user->pictures[0]->fileBase64( ProfileRepository::IMG_PATH_NAME );

    	return response($data);

    }

    public function savePhotoCrop( Request $request ){

		$user  = auth()->guard('api')->user();

		$input = $request->all();

		// Can not update e-mail 
		unset($input['email']);

		$this->profileRepository->updateProfile( $user, $input, $request->file("picture") );

		$picture = '';

		$user = User::find($user->getKey());

		if ( sizeof($user->pictures) > 0 )
			$picture = $user->pictures[0]->fileBase64( ProfileRepository::IMG_PATH_NAME );

		return response(["name"=> $user->name, "email" => $user->email, "picture"=> $picture ]);
    }
}
