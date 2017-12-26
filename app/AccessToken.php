<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class AccessToken extends Model
{
    //
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
