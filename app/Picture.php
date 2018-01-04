<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Picture extends Model{

    /**
     * Fields that can be mass assigned.
     *
     * @var array
     */
    protected $fillable = ['path', 'original_name', 'name'];

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

	public function fileName( String $path ){
		return $path . $this->name;
	}

	public function fileBase64( String $path ){

		$path = $this->fileName( $path );
		$type = pathinfo($path, PATHINFO_EXTENSION);
		$data = file_get_contents($path);
		$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);		
		return $base64;
		
	}

}
