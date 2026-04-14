<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(
                $user
            )
                ->cookie(
                    'access_token',
                    $token,
                    60 * 24 * 7,
                    '/',
                    null,
                    true,
                    true,
                    false,
                    "Strict"
                );
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }
}
