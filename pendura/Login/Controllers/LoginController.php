<?php

namespace Pendura\Login\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Pendura\Base\Utils\LoginProxy;
use Pendura\Login\Requests\LoginRequest;


/**
 * Class LoginController
 * @package Pendura\Login\Controllers
 */
class LoginController extends Controller
{
    /**
     * @var LoginProxy
     */
    private $loginProxy;

    /**
     * LoginController constructor.
     * @param LoginProxy $loginProxy
     */
    public function __construct(LoginProxy $loginProxy)
    {
        $this->loginProxy = $loginProxy;
    }

    /**
     * @param LoginRequest $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');
        

        return response($this->loginProxy->attemptLogin($email, $password));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function refresh(Request $request)
    {
        return response($this->loginProxy->attemptRefresh());
    }

    /**
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function logout()
    {
        $this->loginProxy->logout();

        return response(null, 204);
    }

    /**
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function isAlive(){
        return response( json_encode(array('result' => true)), 200 );
    }

}
