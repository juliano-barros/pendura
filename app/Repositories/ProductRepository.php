<?php

namespace App\Repositories;

use App\Product;
use App\User;
use App\Repositories\Repository;

class ProductRepository extends Repository
{

	public const IMG_PATH_NAME="productPicture/";

	private $user;

    public function getModel(){

        return new Product();
    }

    public function create(array $data)
    {
    	$this->user = auth()->guard('api')->user();
        $product = $this->getModel();
        $product->fill($data);
        $product->user = $this->user;
        $product->save();
        return $product;
    }   

     public function update(Product $product, array $data)
    {
        $product->fill($data);
        $product->save();
        return $product;
    } 

    public function updatePictureProduct( Product $product, $file ){
		

		if ( $file ){

			$fileName = $product->id . rand(). "." . $file->getClientOriginalExtension();

			$input['path'] = ProductRepository::IMG_PATH_NAME . $product->id . "/";
			$input['name'] = $fileName;
			$input['original_name'] = $file->getClientOriginalName();

			$file->move(ProductRepository::IMG_PATH_NAME . $product->id, $fileName);
			
			if ( sizeof( $product->pictures ) > 0 ){

				unlink($product->pictures[0]->fileName( ProductRepository::IMG_PATH_NAME . $product->id . "/" ) );
				$product->pictures()->delete();
				
			}

			$product->pictures()->create($input);

		}    	

		return true;
    }
}
