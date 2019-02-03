<?php

namespace Pendura\Product\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Pendura\Product\Models\Product;
use Pendura\Product\Repositories\ProductRepository;
use Yajra\Datatables\Datatables;

/**
 * Class ProductController
 * @package Pendura\Product\Controllers
 */
class ProductController extends Controller
{
    //

    /**
     * @var ProductRepository
     */
    private $productRepository;

    /**
     * ProductController constructor.
     * @param ProductRepository $repoProd
     */
    public function __construct(ProductRepository $repoProd ){
    	$this->productRepository = $repoProd;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function index(Request $request){

    	$user= auth()->guard('api')->user();
    	$products = $user->products;

    	foreach ($products as $product) {
    		$product["picture"] = $product->pictureProduct();
    	}

    	return response($products->toArray());

    	
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function show(Request $request, $id){

    	$product = Product::findOrFail($id);
        $product["picture"] = $product->pictureProduct();
    	//$product["picture"] = $product->pictureProduct();

    	return response($product);
    	
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function store(Request $request ){
        
        $input = $request->all();
    	$product = $this->productRepository->create($input);

    	return response($product);

    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function destroy(Request $request, $id){

        $user = auth()->guard('api')->user();

    	$product =  $user->products()->find($id);
    	$product->delete();

    	return response(["id"=>$id, "deleted" =>true ]);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function update(Request $request, $id ){

        $user = auth()->guard('api')->user();

    	$input = $request->all();
    	$product = $user->products()->findOrFail($id);

    	$product = $this->productRepository->update( $product, $input );

    	return response($product);

    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function uploadPictureProduct(Request $request, $id){


       	$product = Product::find($id);
		$product = $this->productRepository->updatePictureProduct( $product, $request->file("picture") );

		return response(["name"=> $product->name, "price" => $product->price, "picture"=> $product->pictureProduct() ]);

    }

    /**
     * @return mixed
     * @throws \Exception
     */
    public function anyData(){

        $user = auth()->guard('api')->user();

    	return Datatables::of($user->products())->addColumn( 'link', function(Product $prod){
            return '<button class="btn btn-danger delete-id" data-id="'. $prod->id .'">Delete</button> <button class="btn btn-primary update-id" data-id="'. $prod->id .'">Alterar</button>';
        })->rawColumns(['link'])->toJson();

	}

}
