<?php

use App\Http\Controllers\AppointmentCotroller;
use App\Http\Controllers\SpecialityController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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



// login required
Route::group(['middleware' => ['auth:sanctum']], function () {

    // get authed user  
    Route::get('/me', function () {
        $user = User::find(Auth::id());
        return new UserResource($user);
    });

    // authed user routes
    Route::get('/me/appointments', function () {
        return  auth()->user()->appointments;
    });

    // users Endpoints
    Route::resource('users', UserController::class)->only(["store", "destory"])->middleware('role:super_admin');
    Route::resource('users', UserController::class)->only(["update"])->middleware('role:client');
    Route::resource('users', UserController::class)->only(["index", "show"]);


    // appointments Endpoints
    Route::resource('appointments', AppointmentCotroller::class)->only(["store", "update", "destroy"])->middleware('role:client_only');
    Route::resource('appointments', AppointmentCotroller::class)->only(["index", "show"]);

    // specialities Endpoints
    Route::apiResource('specialities', SpecialityController::class)->middleware('role:super_admin');
    Route::resource('specialities', SpecialityController::class)->only(["index", "show"]);

    // logout the user
    Route::post('logout', UserController::class . '@logout');
});


// login not required
Route::group(['middleware' => ['guest:sanctum']], function () {
    // Register a new user
    Route::post('register', UserController::class . '@register');
    // get all clients
    Route::post('login', UserController::class . '@login');
});
