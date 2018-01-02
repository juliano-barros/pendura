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


    public function updateProfile( User $user, array $data, $file ){
		
		$user->fill($data);

		if ( $file ){

			$fileName = $user->id . rand(). "." . $file->getClientOriginalExtension();

			$input['path'] = ProfileRepository::IMG_PATH_NAME;
			$input['name'] = $fileName;
			$input['original_name'] = $file->getClientOriginalName();

			$file->move("profilePicture", $fileName);
			
			if ( sizeof( $user->pictures ) > 0 ){

				unlink($user->pictures[0]->fileName( ProfileRepository::IMG_PATH_NAME ) );
				$user->pictures()->delete();
				
			}

			$user->pictures()->create($input);

		}    	
    }

}