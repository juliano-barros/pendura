<?php
namespace App\Repositories;

use App\User;
use App\Repositories\Repository;

class UserRepository extends Repository
{
    public function getModel()
    {
        return new User();
    }
    public function create(array $data)
    {
        $user = $this->getModel();
        $user->fill($data);
        $user->save();
        return $user;
    }
    public function update(User $user, array $data)
    {
        $user->fill($data);
        $user->save();
        return $user;
    }
    public function setRoles(User $user, array $addRoles, array $removeRoles = [])
    {
        $this->database->beginTransaction();
        try {
            if (count($removeRoles) > 0) {
                $query = $this->database->table($user->roles()->getTable());
                $query
                    ->where('user_id', $user->id)
                    ->whereIn('role_id', $removeRoles)
                    ->delete();
            }
            if (count($addRoles) > 0) {
                $query = $this->database->table($user->roles()->getTable());
                $query
                    ->insert(array_map(function ($roleId) use ($user) {
                        return [
                            'role_id' => $roleId,
                            'user_id' => $user->id
                        ];
                    }, $addRoles));
            }
        } catch (Exception $e) {
            $this->database->rollBack();
            throw $e;
        }
        $this->database->commit();
    }
}