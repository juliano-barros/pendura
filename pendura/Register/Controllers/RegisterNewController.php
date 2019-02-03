<?php

namespace Pendura\Register\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreateRequest;
use Pendura\User\Models\User;
use Pendura\User\Repositories\UserRepository;

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

    public function hasAlreadyUser(Request $request){
    	$user = User::where('email', $request->get('email'));

    	return response(['count'=> $user->count()]);
    }

}
