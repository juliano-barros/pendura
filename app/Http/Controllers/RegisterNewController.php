<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateRequest;
use App\Repositories\UserRepository;
use App\User;

class RegisterNewController extends Controller
{
    //

    private $userRepository;

    public function __construct( UserRepository $userRepo ){

    	$this->userRepository = $userRepo;

    }

    public function create(CreateRequest $request){

    	$user = $this->userRepository->create( $request->all() );

    	return response(['name' => $user->name, 'email' => $user->email, 'validado' => true ]);
    }
}
