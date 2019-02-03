<?php

namespace Pendura\User\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Pendura\Base\Models\AccessToken;
use Pendura\Base\Models\Picture;
use Pendura\Product\Models\Product;
use Pendura\User\Repositories\ProfileRepository;


/**
 * Class User
 * @package Pendura\User\Models
 */
class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * User morphs many picture.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function pictures()
    {

        // morphMany(MorphedModel, morphableName, type = able_type, relatedKeyName = able_id, localKey = id)
        return $this->morphMany(Picture::class, 'picturable');
    }

    /**
     * User has many AccessTokens.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function accessTokens()
    {

        // hasMany(RelatedModel, foreignKeyOnRelatedModel = user_id, localKey = id)
        return $this->hasMany(AccessToken::class);

    }

    /**
     * @return string
     */
    public function pictureProfile()
    {

        if (sizeof($this->pictures) > 0)
            return $this->pictures[0]->fileBase64(ProfileRepository::IMG_PATH_NAME . $this->id . "/");

        return "";

    }

    /**
     * User has many Products.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function products()
    {

        // hasMany(RelatedModel, foreignKeyOnRelatedModel = user_id, localKey = id)
        return $this->hasMany(Product::class);

    }

    /**
     * User has many Friends.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function friends()
    {
        // hasMany(RelatedModel, foreignKeyOnRelatedModel = user_id, localKey = id)
        return $this->hasMany(User_friends::class);
    }

}
