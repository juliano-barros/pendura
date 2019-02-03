<?php

namespace Pendura\Sale\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Sale_product
 * @package Pendura\Sale\Models
 */
class Sale_product extends Model
{
    //
    /**
     * Fields that can be mass assigned.
     *
     * @var array
     */
    protected $fillable = ['price'];

    /**
     * Sale_product belongs to Sale.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pendura()
    {
        // belongsTo(RelatedModel, foreignKey = sale_id, keyOnRelatedModel = id)
        return $this->belongsTo(Sale::class);
    }

}
