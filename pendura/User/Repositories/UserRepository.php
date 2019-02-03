<?php

namespace Pendura\User\Repositories;

use Pendura\Base\Repositories\Repository;
use Pendura\User\Models\User;

/**
 * Class UserRepository
 * @package Pendura\User\Repositories
 */
class UserRepository extends Repository
{
    /**
     * @return User
     */
    public function getModel()
    {
        return new User();
    }

    /**
     * @param array $data
     * @return User
     */
    public function create(array $data)
    {
        $user = $this->getModel();
        $data['password'] = bcrypt($data['password']);
        $user->fill($data);
        $user->save();
        return $user;
    }

    /**
     * @param User $user
     * @param array $data
     * @return User
     */
    public function update(User $user, array $data)
    {
        $user->fill($data);
        $user->save();
        return $user;
    }

    /**
     * @param User $user
     * @param array $addRoles
     * @param array $removeRoles
     * @throws \Exception
     */
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
        } catch (\Exception $e) {
            $this->database->rollBack();
            throw $e;
        }
        $this->database->commit();
    }
}