<?php

namespace App\Repositories;

use App\User_friends;
use App\Repositories\Repository;

class UserFriendsRepository extends Repository{

	private $user;

	 public function getModel(){

        return new User_friends();
    }


	public function create($idUserFriend){

		// $this->user = auth()->guard('api')->user();

		// $userFriend = $this->user->friends()->where('user_id_friend', $idUserFriend);

		// if ( $userFriend->id  === 0 ){
		// 	$this->saveUserFriend($this->user->id, $idUserFriend, false );
		// }
		return true;
		
	}

	private function saveUserFriend($idUser, $idUserFriend, $accepted){

		$userFriend = $this->getModel();
		$userFriend->user_id = $idUser;
		$userFriend->user_id_friend = $idUserFriend;
		$userFriend->accepted = $accepted;
		$userFriend->save();

	}

	public function accepted($idUserFriend){

		$this->user = auth()->guard('api')->user();

		$userFriend = User_friends::all()->where('user_id', $idUserFriend)->where('user_id_friend', $this->user->id);

		$userFriend->accepted = true;
		$userFriend->save();

		// Creating register correpondent to another that adds me
		$this->saveUserFriend($this->user->id, $idUserFriend, true );

	}
}