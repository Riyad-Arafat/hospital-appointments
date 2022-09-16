<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            return route('home');
        }
    }


    // /**
    //  * Handle an incoming request.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
    //  * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
    //  */



    // public function handle(Request $request, Closure $next)
    // {
    //     // get the token from the request header (Authorization) and remove the "Bearer " part from it
    //     $token = str_replace('Bearer ', '', $request->header('Authorization'));
    //     $user_id = base64_encode($token);
    //     $user = User::find($user_id);

    //     if ($user === null) {
    //         return response()->json([
    //             'message' => 'Unauthenticated.'
    //         ], 401);
    //     }

    //     $request->user = $user;
    //     Auth::login($user);
    //     return $next($request);
    // }
}
