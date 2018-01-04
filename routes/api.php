<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});




Route::post('/login', 'LoginNewController@login');
Route::post('/login/refresh', 'LoginNewController@refresh');

Route::middleware('auth:api')->post('/login/isAlive', 'LoginNewController@isAlive');
Route::middleware('auth:api')->post('/profile/profile', 'ProfileController@profile');
Route::middleware('auth:api')->post('/profile/updatePictureProfile', 'ProfileController@updatePictureProfile');
Route::middleware('auth:api')->post('/profile/updateProfile', 'ProfileController@updateProfile');


Route::middleware('auth:api')->group( function() {

	Route::apiResource('product', 'ProductController');
	Route::post('/product/uploadPicture', 'ProductController@uploadPictureProduct');


});

// Route::middleware('auth:api')->post('/product', 'ProfileController@updateProfile');
// Route::middleware('auth:api')->post('/product/updateProfile', 'ProfileController@updateProfile');
// Route::middleware('auth:api')->post('/product/updateProfile', 'ProfileController@updateProfile');
// Route::middleware('auth:api')->post('/product/updateProfile', 'ProfileController@updateProfile');


Route::post('/registeruser', 'RegisterNewController@create');
Route::post('/register/hasAlreadyUser', 'RegisterNewController@hasAlreadyUser');

