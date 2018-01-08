<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\ProductRepository;
use App\User;
use App\Product;
use Yajra\Datatables\Datatables;

class ProductController extends Controller
{
    //

    private $productRepository;

    public function __construct( ProductRepository $repoProd ){
    	$this->productRepository = $repoProd;
    }

    public function index(Request $request){

    	$user= auth()->guard('api')->user();
    	$products = $user->products;

    	foreach ($products as $product) {
    		$product["picture"] = $product->pictureProduct();
    	}

    	return response($products->toArray());

    	
    }

    public function show(Request $request, $id){

    	$product = Product::find($id);

    	$product["picture"] = $product->pictureProduct();

    	return response($product);
    	
    }

    public function store( Request $request ){

    	$product = $this->productRepository->create($request->all());

    	return response($product);

    }

    public function destroy(Request $request, $id){

    	$product = Product::find($id);
    	$product->delete();

    	return response(["id"=>$id, "deleted" =>true ]);
    }

    public function update( Request $request, $id ){

    	$input = $request->all();
    	$product = Product::find($id);
    	$product = $this->productRepository->update( $product, $input );

    	return response($product);

    }

    public function uploadPictureProduct(Request $request, $id){

    	$product = Product::find($id);

		$product = $this->profileRepository->updatePictureProfile( $product, $request->file("picture") );

		return response(["name"=> $product->name, "price" => $product->price, "picture"=> $product->pictureProduct() ]);

    }

    public function anyData(){

        $user = auth()->guard('api')->user();

    	return Datatables::of($user->products())->make(true);

	}

}
