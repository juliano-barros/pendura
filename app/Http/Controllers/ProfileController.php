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

     	$data["picture"] = $user->pictureProfile();

    	return response($data);

    }

    public function updateProfile( Request $request ){
		
		$user  = auth()->guard('api')->user();
		$input = $request->all();
		// Can not update e-mail 
		unset($input['email']);


		$this->profileRepository->updateProfile( $user, $input );

		$user = User::find($user->getKey());

		return response(["name"=> $user->name, "email" => $user->email, "picture"=> $user->pictureProfile() ]);

    }

    public function updatePictureProfile( Request $request ){

		$user  = auth()->guard('api')->user();

		$this->profileRepository->updatePictureProfile( $user, $request->file("picture") );

		$user = User::find($user->getKey());

		return response(["name"=> $user->name, "email" => $user->email, "picture"=> $user->pictureProfile() ]);
    }
}
