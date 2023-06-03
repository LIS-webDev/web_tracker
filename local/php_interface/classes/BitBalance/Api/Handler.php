<?php

namespace BitBalance\Api;

use Bitrix\Main\Entity\ExpressionField;
use Bitrix\Main\Loader;
use Bitrix\Highloadblock as HL;
use Bitrix\Main\Entity\Query;
use CEvent;
use CUser;
use CIBlockElement;
use BitBalance\Highload;


class Handler
{
    private static $message = null;//сообщение ответа в апи

    private $dynamicParams = [];

    private $callback = null;

    private $needAuth;
    /**
     * @var string
     */
    public $exceptionMessage;

    /**
     * @var \BitBalance\Api\Cache
     */
    private $Cache;
    /**
     * @var array|mixed
     */
    private array $handlerParams = [];

    public function __construct()
    {

    }

    public function handlerGet(string $endPoint, array $params = [])
    {
        $params[ 'method' ] = 'GET';
        \BitBalance\Api\Handler::registerHandler($endPoint, $params);
    }

    public function handlerPost(string $endPoint, array $params = [])
    {
        $params[ 'method' ] = 'POST';
        \BitBalance\Api\Handler::registerHandler($endPoint, $params);
    }

    //проверяем наш ли это случай
    private function registerHandler($path, $params = [])
    {
        try
        {
            $method = $params[ 'method' ] ?: 'GET';
            $params[ 'needAuth' ] = $params[ 'needAuth' ] ?? true;

            if ($_SERVER[ 'REQUEST_METHOD' ] !== $method)
            {
                return;
            }

            static $handlerFound;

            if ($handlerFound)
            {
                return;
            }
            $regular = preg_replace_callback([ "@{([^/]+)}@" ], "\BitBalance\Api\Handler::pregCallback", $path);
            $regexp = "@^$regular$@ui";

            $handlerFound = preg_match($regexp, $_SERVER[ 'SCRIPT_URL' ] ?? $_SERVER[ 'REDIRECT_URL' ], $matches);
            if ($handlerFound)
            {
                $this->handlerParams = $params;

                $this->callback = $params[ 'callback' ];
                $this->needAuth = (bool)$params[ 'needAuth' ];

                $this->exceptionMessage = (string)$params[ 'exceptionMessage' ];

                foreach ($matches as $key => $val)
                {
                    if (!is_numeric($key))
                    {
                        $this->dynamicParams[ $key ] = $val;
                    }
                }

                //кеш только если это гет запрос, не требующий авторизацию
                if($params[ 'cache' ] && !$this->needAuth && $_SERVER[ 'REQUEST_METHOD' ] === 'GET')
                {
                    $this->Cache = new \BitBalance\Api\Cache();
                    $this->Cache->setEndPoint($path);
                    $this->Cache->setDynamicParams([$_GET,$this->dynamicParams??[]]);
                    $this->Cache->setTtl($params[ 'cache' ]['ttl']);
                    $this->Cache->setKey($params[ 'cache' ]['key']);
                }
            }

        } catch (\Throwable $e)
        {
            \BitBalance\Tools::log([
                'server'=>$_SERVER,
                'e'=>$e->getMessage()
            ],__FUNCTION__,'errors');
        }
    }

    public static function pregCallback(array $matches): string
    {
        $paramName = $matches[ 1 ];
        return "(?P<$paramName>[^/]+)";
    }

    public function execute()
    {
        try
        {
            if (isset($this->Cache))
            {
                if ($cachedData = $this->Cache->getData())
                {
                    return $cachedData;
                }
            }
        }
        catch (\Throwable $e)
        {

        }

        //для мусорных хитов, где не требуется действие с пользователем
        if($this->handlerParams['readonly-session'])
        {
            define('BX_SECURITY_SESSION_VIRTUAL', true);
        }

        //убрать подключение ядра
        if(!$this->handlerParams['noCore'])
        {
            $beforeTimer = microtime(1);
            require($_SERVER[ "DOCUMENT_ROOT" ] . "/bitrix/modules/main/include/prolog_before.php");
            header("Server-Timing: prolog;dur=".round((microtime(1)-$beforeTimer)*1000,2));

            if(!empty($this->handlerParams['groups']) && !\CSite::InGroup($this->handlerParams['groups']))
            {
                throw new \Exception('Доступ к эндпоинту ограничен');
            }

            if (!empty($this->needAuth) && !$GLOBALS[ 'USER' ]->IsAuthorized())
            {
                throw new \Exception('Ошибка доступа');
            }
        }

        if (!$this->callback || !is_callable($this->callback))
        {
            http_response_code(404);
            die();
        }

        ob_get_clean();

        if ($_SERVER[ 'REQUEST_METHOD' ] === 'GET')
        {
            $result = ($this->callback)($this->dynamicParams, $_GET);

            if(isset($this->Cache))
            {
                $this->Cache->setResult($result);
            }

        }
        elseif ($_SERVER[ 'REQUEST_METHOD' ] === 'POST')
        {
            $postData = $_POST;
            if (!$postData)
            {
                $content = file_get_contents('php://input');
                //на случай если запрос в формате json
                if ($content && $decodedJson = json_decode($content, 1))
                {
                    $postData = $decodedJson;
                }
            }
            $result = ($this->callback)($this->dynamicParams, $postData);

        }
        else
        {
            http_response_code(405);
            die();
        }
        return $result;
    }

    public static function jsonEncode($res)
    {
        if (is_array($res))
        {
            array_walk_recursive($res, function (&$el, $key) {
                if (!empty($el) && ($el instanceof \Bitrix\Main\Type\DateTime || $el instanceof \DateTime || $el instanceof \Bitrix\Main\Type\Date))
                {
                    $el = $el->format('c');
                }
            });
        }
        //JSON_FORCE_OBJECT для предсказуемости результата
        return json_encode($res, JSON_UNESCAPED_UNICODE);
    }

    public static function getMessage(): ?string
    {
        return self::$message;
    }

    //установить сообщение ответа. если требуется
    public static function setMessage(string $message): void
    {
        self::$message = $message;
    }

    //------------------------------------------------------------------------
    public static function test($urlParams = []): array
    {
        return $_SERVER;
    }
    public static function longTestMethod():array
    {
        sleep(5);
        return [
            'date'=>date('c'),
            'test'=>range('a','z')[rand(0,25)] . range('a','z')[rand(0,25)] . range('a','z')[rand(0,25)]
        ];
    }

    //метод для тестирования кеша
    public static function randomData() {
        $result = [];
        foreach (range(0, 500) as $I)
        {
            $result[]=[
                'num'=>$I,
                'rand'=>md5(microtime(1)),

            ];
        }
        return $result;
    }

    public static function register($urlParams = [], $body = []): array
    {
        global $USER;
        $highloadTableUserId = 1;
        $hlbl = new Highload($highloadTableUserId);
        $ID = 0;
        $login = "";

        $hashedPass = password_hash($body['pass'], PASSWORD_BCRYPT );

        $data = [
            "UF_LOGIN" => $body['login'],
            "UF_PASSWORD" => $hashedPass,
        ];

        $user = new CUser;
        $userFields = [
            "LOGIN" => $body['login'],
            "EMAIL" => $body['email'],
            "PASSWORD" => $body['pass'],
            "CONFIRM_PASSWORD" => $body['pass'],
            "ACTIVE" => "Y",
            "GROUP_ID" => [5]
        ];
        $ID = $user->Add($userFields);
        if ($ID) {
            $addedElemId = $hlbl->add($data);
            $_SESSION['USER_LOGIN'] = $body['login'];
            $_SESSION['USER_ID'] = $ID;
            $login = $body['login'];
            $USER->Authorize($ID);
        }

        return ['TABLE_ELEM_ID' => $addedElemId ?? false, "user_id" => $ID, 'login' => $login, "ERROR" => $user->LAST_ERROR];
    }

    public static function auth($urlParams = [], $body = []): array
    {
        global $USER;
        $USER = new CUser;
        $login = "";
        $userId = 0;
        $isLogin = $USER->Login($body['login'], $body['pass']);
        if ($isLogin) {
            $_SESSION['USER_LOGIN'] = $body['login'];
            $_SESSION['USER_ID'] = $USER->GetID();
            $login = $body['login'];
            $userId = $USER->GetID();
        }
        
        return ["auth" =>$isLogin, "login" => $login, "user_id" => $userId];
    }

    public static function checkAuth($urlParams = []): array
    {
        global $USER;
        $isAuth = $USER->IsAuthorized();
        $userId = 0;
        $userLogin = "";
        if ($isAuth) {
            $userId = $USER->GetID();
            $userLogin = $USER->GetLogin();
        }
        return [
            "isAuth" => $isAuth,
            "login" => $userLogin,
            "user_id" => $userId
        ];
    }

    public static function logout($urlParams = []): bool
    {
        global $USER;
        $USER->Logout();
        if (!empty($_SESSION['USER_LOGIN']) && !empty($_SESSION['USER_ID'])) {
            unset($_SESSION['USER_LOGIN']);
            unset($_SESSION['USER_ID']);
        }
        return true;
    }

}