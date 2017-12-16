<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Picture;

class Product extends Model
{
    //

    /**
     * Product morphs many picture.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function pictures()
    {
    	// morphMany(MorphedModel, morphableName, type = able_type, relatedKeyName = able_id, localKey = id)
    	return $this->morphMany(Picture::class, 'picturable');
    }
}
