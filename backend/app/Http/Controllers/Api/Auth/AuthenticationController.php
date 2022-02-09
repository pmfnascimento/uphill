<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|max:255',
            'password' => 'required'
        ]);

        $login = $request->only('email', 'password');

        if(!Auth::attempt($login)){
            return response(['error' => 'Invalid Login Credencials'], 401);
        }

        $user = User::find(Auth::user()->id);
        $token = $user->createToken($user->name);

        return response([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at,
            'expires_at' => $token->token->expires_at,
            'token' => $token->accessToken,            
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->token->each(function ($token, $key) {
            $token->delete();
        });
        return response()->json(['message' => 'Logout with success!'], 200);
    }

}
