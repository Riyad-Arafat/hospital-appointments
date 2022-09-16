<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, String $role)
    {

        if ($role === "super_admin" && $request->user()->role === "super_admin") {
            return $next($request);
        }

        if ($role == "doctor") {
            if ($request->user()->role == "doctor") {
                return $next($request);
            }
            return response()->json([
                'message' => 'Unauthorized.'
            ], 401);
        }

        if ($role == "client_only") {
            if ($request->user()->role == "client") {
                return $next($request);
            }
            return response()->json([
                'message' => 'Unauthorized.'
            ], 401);
        }

        if ($role == "client") {
            if ($request->user()->role == "client" || $request->user()->role == "doctor") {
                return $next($request);
            }
            return response()->json([
                'message' => 'Unauthorized.'
            ], 401);
        }
    }
}
