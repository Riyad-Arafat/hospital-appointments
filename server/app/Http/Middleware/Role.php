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


        if ($request->user()->role === "super_admin") {
            return $next($request);
        } elseif ($request->user()->role === $role) {
            return $next($request);
        } elseif ($request->user()->role === "client" && $role === "client_only") {
            return $next($request);
        } elseif ($request->user()->role === "doctor" && $role === "client") {
            return $next($request);
        } else {
            return response()->json([
                'message' => 'You are not authorized to access this route'
            ], 401);
        }
    }
}
