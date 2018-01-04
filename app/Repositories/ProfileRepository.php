<?php

namespace App\Repositories;

use App\User;
use App\Repositories\Repository;

class ProfileRepository extends Repository
{

	public const IMG_PATH_NAME="profilePicture/";

    public function getModel()
    {
        return new User();
    }

    public function updateProfile( User $user, array $data ){
		if(isset($data["name"])){
			$user->name = $data["name"];
			$user->save();
		}
		return true;
    }

    public function updatePictureProfile( User $user, $file ){
		

		if ( $file ){

			$fileName = $user->id . rand(). "." . $file->getClientOriginalExtension();

			$input['path'] = ProfileRepository::IMG_PATH_NAME . $user->id . "/";
			$input['name'] = $fileName;
			$input['original_name'] = $file->getClientOriginalName();

			$file->move(ProfileRepository::IMG_PATH_NAME . $user->id, $fileName);
			
			if ( sizeof( $user->pictures ) > 0 ){

				unlink($user->pictures[0]->fileName( ProfileRepository::IMG_PATH_NAME . $user->id . "/" ) );
				$user->pictures()->delete();
				
			}

			$user->pictures()->create($input);

		}    	

		return $user;
    }

}