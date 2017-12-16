<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Pendura;

class Pendura_approve extends Model
{
    //

    /**
     * Pendura_approve belongs to Pendura.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pendura()
    {
    	// belongsTo(RelatedModel, foreignKey = pendura_id, keyOnRelatedModel = id)
    	return $this->belongsTo(Pendura::class);
    }
}
