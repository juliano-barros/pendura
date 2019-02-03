<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pendura\User\Models\User;
use Pendura\User\Repositories\ProfileRepository;

/**
 * Class ProfileController
 * @package App\Http\Controllers
 */
class ProfileController extends Controller
{
    /**
     * @var ProfileRepository
     */
    private $profileRepository;

    /**
     * ProfileController constructor.
     * @param ProfileRepository $profile
     */
    public function __construct(ProfileRepository $profile ){

    	$this->profileRepository = $profile;

    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function profile(Request $request ){
    	$user = auth()->guard('api')->user();
    	$data = $user;

     	$data["picture"] = $user->pictureProfile();

    	return response($data);

    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function updateProfile(Request $request ){
		
		$user  = auth()->guard('api')->user();
		$input = $request->all();
		// Can not update e-mail 
		unset($input['email']);


		$this->profileRepository->updateProfile( $user, $input );

		$user = User::find($user->getKey());

		return response(["name"=> $user->name, "email" => $user->email, "picture"=> $user->pictureProfile() ]);

    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function updatePictureProfile(Request $request ){

		$user  = auth()->guard('api')->user();

		$this->profileRepository->updatePictureProfile( $user, $request->file("picture") );

		$user = User::find($user->getKey());

		return response(["name"=> $user->name, "email" => $user->email, "picture"=> $user->pictureProfile() ]);
    }
}
