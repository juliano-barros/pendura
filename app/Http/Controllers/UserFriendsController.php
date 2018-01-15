<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\UserFriendsRepository;
use App\User;
use Yajra\Datatables\Datatables;

class UserFriendsController extends Controller
{
    
    private $userFriendRepository;

    public function __construct( UserFriendsRepository $repoUserFriends ){
        $this->userFriendRepository = $repoUserFriends;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $idUserFriend){
        
        //
        $this->userFriendRepository->create($idUserFriend);

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function anyData(){

        $user = auth()->guard('api')->user();

        $users = User::where('users.id', '<>', $user->id)->where(function($query){
            $query->where('user_friends.accepted', '==', '0')->orWhereNull('user_friends.accepted');
        })
                       ->leftJoin('user_friends', 'users.id', '=', 'user_friends.user_id_friend')
                       ->select('users.*', 'user_friends.accepted', 'user_friends.id as idUserFriend' );

        return Datatables::of($users)->addColumn( 'link', function($user){
            if ( $user->idUserFriend ){
                if ( ! $user->accepted ){
                    return '<button class="btn btn-success" data-id="'. $user->id .'">Pendente</button>';
                }else{
                    return '<button class="btn btn-success" data-id="'. $user->id .'">Já amigo</button>';
                }
            }else{
                return '<button class="btn btn-success" data-id="'. $user->id .'">Adicionar usuário</button>';
            }
        })->rawColumns(['link'])->toJson();

    }
}
