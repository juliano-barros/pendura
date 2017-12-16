<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    //

	/**
	 * Picture morphs to models in picturable_type.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\MorphTo
	 */
	public function picturable(){
		// morphTo($name = picturable, $type = picturable_type, $id = picturable_id)
		// requires picturable_type and picturable_id fields on $this->table
		return $this->morphTo();
	}

}
