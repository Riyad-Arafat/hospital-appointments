<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
use App\Models\Speciality;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $role = $request->query('role');
        $speciality_id = $request->query('speciality_id');
        if ($role && $speciality_id) {
            return new UserCollection(User::where('role', $role)->where('speciality_id', $speciality_id)->get());
        } else if ($role) {
            return new UserCollection(User::where('role', $role)->get());
        } else if ($speciality_id) {
            return new UserCollection(User::where('speciality_id', $speciality_id)->get());
        } else {
            return new UserCollection(User::all());
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string',
                'role' => 'required|string',
                "speciality_id" => "required|integer",
                'arraival_time' => 'required|integer',
            ]);
            $time = date("Y-m-d H:i:s", $request->arraival_time);
            $user = new User([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'speciality_id' => $request->speciality_id,
                'arraival_time' => $time,
                "role" => $request->role,
            ]);
            $user->save();
            return response()->json([
                'message' => 'Successfully created user!'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
        return  new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        // check if the user is an super admin or the user is updating his profile
        try {
            $user = User::find($id);

            if ($request->user()->id == $id || $request->user()->role == 'super_admin') {

                $request->validate([
                    'first_name' => 'required|string',
                    'last_name' => 'required|string',
                    'email' => 'required|string||email',
                    'arraival_time' => 'integer',
                    'role' => 'string',
                    'speciality_id' => 'integer',
                ]);

                $user->update($request->only(['first_name', 'last_name', 'email']));
                $time = date("Y-m-d H:i:s", $request->arraival_time);
                $user->arraival_time = $time;
                $user->save();


                /// check if the user is a (super admin)
                if ($request->user()->role == 'super_admin') {
                    // check if the role exists and is (doctor)
                    if ($request->role && $request->role == "doctor") {
                        // check if the speciality exists and is valid
                        $speciality = Speciality::find($request->speciality_id);
                        if (!$speciality) {
                            return response()->json([
                                'message' => 'speciality_id is not valid'
                            ], 404);
                        }
                        $user->update([
                            'role' => $request->role,
                            'speciality_id' => $request->speciality_id,
                        ]);
                    }
                }
                return response()->json([
                    'message' => 'Successfully updated user!',
                    'user' => new UserResource($user)
                ], 200);
            } else {
                return response()->json([
                    'message' => 'You are not authorized to update this user.'
                ], 403);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully.'
        ], 200);
    }


    // register a new user
    public function register(Request $request)
    {
        try {
            $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string',
            ]);

            $user = new User([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                "role" => "client"
            ]);
            $user->save();
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }


    // login user
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
            // get the user from the database
            $user = User::where('email', $request->email)->first();
            // check if the user exists and the password is correct
            $is_password_correct = Hash::check($request->password, $user->password);
            // if the user is not found
            if (!$user || !$is_password_correct) {
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401);
            }
            // generate a new token for the user and expire it after 24 hours
            $token = $user->generateToken();
            Auth::login($user);
            $request->user = $user;
            return response()->json([
                'token' => $token,
                'type' => 'Bearer',
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
    }

    // logout user
    public function logout(Request $request)
    {

        try {
            //code...
            $request->user()->revokeToken();

            Auth::user(null);
            return response()->json([
                'message' => 'Successfully logged out'
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => $th->getMessage()
            ], 400);
        }
    }
}
