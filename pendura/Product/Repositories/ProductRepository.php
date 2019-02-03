<?php

namespace Pendura\Product\Repositories;

use Pendura\Base\Repositories\Repository;
use Pendura\Product\Models\Product;

/**
 * Class ProductRepository
 * @package App\Repositories
 */
class ProductRepository extends Repository
{

    /**
     *
     */
    public const IMG_PATH_NAME = "productPicture/";

    /**
     * @var
     */
    private $user;

    /**
     * @return Product
     */
    public function getModel()
    {

        return new Product();
    }

    /**
     * @param array $data
     * @return Product
     */
    public function create(array $data)
    {
        $this->user = auth()->guard('api')->user();

        $product = $this->getModel();
        $product->fill($data);
        $product->user_id = $this->user->id;
        $product->save();

        return $product;
    }

    /**
     * @param Product $product
     * @param array $data
     * @return Product
     */
    public function update(Product $product, array $data)
    {
        $product->fill($data);
        $product->save();
        return $product;
    }

    /**
     * @param Product $product
     * @param $file
     * @return Product
     */
    public function updatePictureProduct(Product $product, $file)
    {

        if ($file) {

            $fileName = $product->id . rand() . "." . $file->getClientOriginalExtension();

            $input['path'] = ProductRepository::IMG_PATH_NAME . $product->id . "/";
            $input['name'] = $fileName;
            $input['original_name'] = $file->getClientOriginalName();

            $file->move(ProductRepository::IMG_PATH_NAME . $product->id, $fileName);

            if (sizeof($product->pictures) > 0) {

                unlink($product->pictures[0]->fileName(ProductRepository::IMG_PATH_NAME . $product->id . "/"));
                $product->pictures()->delete();

            }

            $product->pictures()->create($input);

        }

        return $product;
    }
}
