<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\HandlesCookies;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;

class OAuthController extends Controller
{
    use HandlesCookies;

    private array $allowedProviders = ['google', 'facebook', 'discord'];

    public function redirect($provider)
    {
        $this->ensureProviderAllowed($provider);
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function callback($provider)
    {
        $this->ensureProviderAllowed($provider);

        try {

            $socialUser = Socialite::driver($provider)->stateless()->user();
        } catch (\Exception $e) {
            return $e->getMessage();
            return redirect(env('APP_URL_FRONT_END'));
        }

        $user = User::where('email', $socialUser->getEmail())->first();

        if ($user) {
            // Update existing user
            $user->update([
                'full_name'      => $socialUser->getName(),
                "{$provider}_id" => $socialUser->getId(),
                'avatar'         => 'https://res.cloudinary.com/dbu1zfbhv/image/upload/v1755729796/avatars/ccrlg1hkjtc6dyeervsv.jpg',
            ]);
        } else {
            $data = [
                'full_name'      => $socialUser->getName() ?? $socialUser->getNickname(),
                'username'       => $socialUser->getEmail() ?: 'user_' . time(),
                'email'          => $socialUser->getEmail() ?? "",
                'password'       => $socialUser->getId() . rand(2000, time()),
                "{$provider}_id" => $socialUser->getId() ?? "",
                'avatar'         => 'https://res.cloudinary.com/dbu1zfbhv/image/upload/v1755729796/avatars/ccrlg1hkjtc6dyeervsv.jpg',
            ];
            if ($provider === 'google') {
                $data['email_verified_at'] = now();
            }
            // Create new user
            $user = User::create($data);
        }
        $accessToken = JWTAuth::fromUser($user);
        if ($user->google2fa_secret) {
            $token = base64_encode(JWTAuth::fromUser($user) . env('T1_SECRET', ""));
            return redirect(env('APP_URL_FRONT_END') . "/auth/login-social?token=" . $token);
        } else {
            $refreshToken = JWTAuth::customClaims(['jwt_refresh' => true])->fromUser($user);
            return redirect(env('APP_URL_FRONT_END') . "/auth/login-social")
                ->withCookie($this->buildCookie('jwt_token', $accessToken, 120))
                ->withCookie($this->buildCookie('jwt_refresh', $refreshToken, 60 * 24 * 7));
        }
    }

    private function ensureProviderAllowed($provider)
    {
        if (!in_array($provider, $this->allowedProviders)) {
            abort(404);
        }
    }
}
