<?php

namespace Pendura\Base\Models;

use Illuminate\Database\Eloquent\Model;
use Pendura\User\Models\User;


/**
 * Class AccessToken
 * @package Pendura\Base\Models
 */
class AccessToken extends Model
{
    //
    /**
     * @var string
     */
    protected $table = 'oauth_access_tokens';

    /**
     * AccessToken belongs to User.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        // belongsTo(RelatedModel, foreignKey = user_id, keyOnRelatedModel = id)
        return $this->belongsTo(User::class);
    }

}
