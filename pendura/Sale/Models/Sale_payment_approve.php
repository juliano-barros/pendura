<?php

namespace Pendura\Sale\Models;

use Illuminate\Database\Eloquent\Model;


/**
 * Class Sale_payment_approve
 * @package Pendura\Sale\Models
 */
class Sale_payment_approve extends Model
{
    //

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pendura_payment()
    {
        return $this->belongsTo(Sale_payment::class);
    }
}
