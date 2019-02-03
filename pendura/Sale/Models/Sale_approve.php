<?php

namespace Pendura\Sale\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Sale_approve
 * @package Pendura\Sale\Models
 */
class Sale_approve extends Model
{

    /**
     * Sale_approve belongs to Sale.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pendura()
    {
        // belongsTo(RelatedModel, foreignKey = sale_id, keyOnRelatedModel = id)
        return $this->belongsTo(Sale::class);
    }
}
