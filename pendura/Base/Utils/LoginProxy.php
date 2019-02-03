<?php

namespace Pendura\Base\Utils;

use Illuminate\Foundation\Application;
use App\Exceptions\InvalidCredentialsException;
use Pendura\User\Repositories\UserRepository;


/**
 * Class LoginProxy
 * @package Pendura\Base\Utils
 */
class LoginProxy
{
    /**
     *
     */
    const REFRESH_TOKEN = 'refreshToken';

    /**
     * @var mixed
     */
    private $apiConsumer;

    /**
     * @var mixed
     */
    private $auth;

    /**
     * @var mixed
     */
    private $cookie;

    /**
     * @var mixed
     */
    private $db;

    /**
     * @var mixed
     */
    private $request;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * LoginProxy constructor.
     * @param Application $app
     * @param UserRepository $userRepository
     */
    public function __construct(Application $app, UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;

        $this->apiConsumer = $app->make('apiconsumer');
        $this->auth = $app->make('auth');
        $this->cookie = $app->make('cookie');
        $this->db = $app->make('db');
        $this->request = $app->make('request');
    }

    /**
     * Attempt to create an access token using user credentials
     *
     * @param $email
     * @param $password
     * @return array
     */
    public function attemptLogin($email, $password)
    {
        $user = $this->userRepository->getWhere('email', $email)->first();

        if (!is_null($user)) {
            return $this->proxy('password', [
                'username' => $email,
                'password' => $password
            ]);
        }

        throw new InvalidCredentialsException();
    }

    /**
     * Attempt to refresh the access token used a refresh token that
     * has been saved in a cookie
     */
    public function attemptRefresh($refresh_token)
    {
        $refreshToken = $refresh_token;
        return $this->proxy('refresh_token', [
            'refresh_token' => $refreshToken
        ]);
    }

    /**
     * Proxy a request to the OAuth server.
     *
     * @param $grantType
     * @param array $data
     * @return array
     */
    public function proxy($grantType, array $data = [])
    {
        $data = array_merge($data, [
            'client_id' => env('PASSWORD_CLIENT_ID'),
            'client_secret' => env('PASSWORD_CLIENT_SECRET'),
            'grant_type' => $grantType
        ]);

        $response = $this->apiConsumer->post('/oauth/token', $data);

        if (!$response->isSuccessful()) {
            throw new InvalidCredentialsException();
        }

        $data = json_decode($response->getContent());
        // Create a refresh token cookie
        $this->cookie->queue(
            self::REFRESH_TOKEN,
            $data->refresh_token,
            864000, // 10 days
            null,
            null,
            false,
            true // HttpOnly
        );

        return [
            'access_token' => $data->access_token,
            'expires_in' => $data->expires_in
        ];
    }

    /**
     * Logs out the user. We revoke access token and refresh token.
     * Also instruct the client to forget the refresh cookie.
     */
    public function logout($refresh_token)
    {
        $accessToken = $this->auth->user()->token();

        $refreshToken = $this->db
            ->table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();

        $this->cookie->queue($this->cookie->forget(self::REFRESH_TOKEN));
    }
}