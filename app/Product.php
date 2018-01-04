<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Picture;
use App\User;

class Product extends Model
{
    //
    /**
     * Fields that can be mass assigned.
     *
     * @var array
     */
    protected $fillable = ['name', 'price'];

    /**
     * Product morphs many picture.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function pictures(){

    	// morphMany(MorphedModel, morphableName, type = able_type, relatedKeyName = able_id, localKey = id)
    	return $this->morphMany(Picture::class, 'picturable');

    }

    /**
     * Product belongs to User.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {

        // belongsTo(RelatedModel, foreignKey = user_id, keyOnRelatedModel = id)
        return $this->belongsTo(User::class);

    }

    public function pictureProduct(){

        if ( sizeof($this->pictures) > 0 )
            return $this->pictures[0]->fileBase64( ProductRepository::IMG_PATH_NAME . $this->id . "/" );

        return "";

    }
}
