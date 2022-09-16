<?php

use App\Http\Controllers\AppointmentCotroller;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

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
        return auth()->user();
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

    // logout the user
    Route::post('logout', UserController::class . '@logout');
});


// login not required
Route::group(['middleware' => ['guest:sanctum']], function () {
    // Register a new user
    Route::resource('register', UserController::class)->only(["store"]);
    // get all clients
    Route::post('login', UserController::class . '@login');
});
