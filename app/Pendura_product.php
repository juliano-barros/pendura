<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Pendura;

class Pendura_product extends Model
{
    //
    /**
     * Fields that can be mass assigned.
     *
     * @var array
     */
    protected $fillable = ['price'];

    /**
     * Pendura_product belongs to Pendura.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pendura()
    {
    	// belongsTo(RelatedModel, foreignKey = pendura_id, keyOnRelatedModel = id)
    	return $this->belongsTo(Pendura::class);
    }

}
