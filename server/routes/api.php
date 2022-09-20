<?php

use App\Http\Controllers\AppointmentCotroller;
use App\Http\Controllers\SpecialityController;
use App\Http\Controllers\UserController;
use App\Http\Resources\AppointmentCollection;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\UserResource;
use App\Models\Appointment;
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

        // check if user is doctor return all appmintments for doctor speciality
        if (Auth::user()->role == 'doctor') {
            // return Appointment collection where date in current day and speciality_id is equal to the speciality_id from the authed user
            return new AppointmentCollection(Appointment::where("speciality_id", Auth::user()->speciality_id)->whereDate("date", date("Y-m-d"))->get());
        } else {
            // return all appointments for user
            return new AppointmentCollection(auth()->user()->appointments);
        }
    });

    // users Endpoints
    Route::resource('users', UserController::class)->only(["store", "destroy"])->middleware('role:super_admin');
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
