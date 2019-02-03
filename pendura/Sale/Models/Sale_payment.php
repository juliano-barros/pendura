<?php

namespace Pendura\Sale\Models;

use Illuminate\Database\Eloquent\Model;


/**
 * Class Sale_payment
 * @package Pendura\Sale\Models
 */
class Sale_payment extends Model
{
    //

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pendura()
    {
        return $this->belongsTo(Sale::class);
    }
}
