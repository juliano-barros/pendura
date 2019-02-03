<?php

namespace Pendura\User\Repositories;

use Pendura\Base\Repositories\Repository;
use Pendura\User\Models\User;
use Pendura\User\Models\User_friends;

/**
 * Class UserFriendsRepository
 * @package Pendura\User\Repositories
 */
class UserFriendsRepository extends Repository
{

    /**
     * @var User
     */
    private $user;

    /**
     * @return User_friends
     */
    public function getModel()
    {

        return new User_friends();
    }


    /**
     * @param $idUserFriend
     * @return bool
     */
    public function create($idUserFriend)
    {

        // $this->user = auth()->guard('api')->user();

        // $userFriend = $this->user->friends()->where('user_id_friend', $idUserFriend);

        // if ( $userFriend->id  === 0 ){
        // 	$this->saveUserFriend($this->user->id, $idUserFriend, false );
        // }
        return true;

    }

    /**
     * @param $idUser
     * @param $idUserFriend
     * @param $accepted
     */
    private function saveUserFriend($idUser, $idUserFriend, $accepted)
    {

        /** @var User_friends $userFriend */
        $userFriend = $this->getModel();
        $userFriend->user_id = $idUser;
        $userFriend->user_id_friend = $idUserFriend;
        $userFriend->accepted = $accepted;
        $userFriend->save();

    }

    /**
     * @param $idUserFriend
     */
    public function accepted($idUserFriend)
    {

        $this->user = auth()->guard('api')->user();

        /** @var User_friends $userFriend */
        $userFriend = User_friends::all()->where('user_id', $idUserFriend)->where('user_id_friend', $this->user->id);

        $userFriend->accepted = true;
        $userFriend->save();

        // Creating register correspondent to another that adds me
        $this->saveUserFriend($this->user->id, $idUserFriend, true);

    }
}