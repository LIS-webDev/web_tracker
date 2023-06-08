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
use Bitrix\Main\Type\DateTime;
use Bitrix\Main\Type\Date;
use DateTimeZone;

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
        $highloadTableUserSettingsId = 2;
        $hlbl = new Highload($highloadTableUserId);
        $hlblUserSettings = new Highload($highloadTableUserSettingsId);

        $ID = 0;
        $login = "";

        $hashedPass = password_hash($body['pass'], PASSWORD_BCRYPT );

        $data = [
            "UF_LOGIN" => $body['login'],
            "UF_PASSWORD" => $hashedPass,
            "UF_EMAIL" => $body['email']
        ];

        $userSettings = $body['userSettings'];

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

            $userSettings['UF_FOREIGN_KEY_USER'] = $addedElemId;
            $hlblUserSettings->Add($userSettings);
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

    public static function updateUser($urlParams = [], $body = []): array
    {
        global $USER;

        $highloadTableUserId = 1;
        $highloadTableUserSettingsId = 2;
        $highloadTableActivityId = 3;

        $hlblUser = new Highload($highloadTableUserId);
        $hlblUserSettings = new Highload($highloadTableUserSettingsId);
        $hlblActivity = new Highload($highloadTableActivityId);

        $data = [
            'select' => ['ID'],
            'filter' => [
                'UF_KOEF' => $body['user_settings']['UF_FOREIGN_KEY_PHYSICAL_TYPE']
            ]
        ];

        $resultActivityObj = $hlblActivity->getList($data);
        $resultActivity = $resultActivityObj->fetch();

        $userSettingsFields = $body['user_settings'];
        $userSettingsFields['UF_FOREIGN_KEY_PHYSICAL_TYPE'] = $resultActivity['ID'];

        $status = false;
        $userFields = ['UF_LOGIN' => $body['user']['LOGIN']];
        if (!empty($body['user']['PASSWORD'])) {
            $hashedPass = password_hash($body['user']['PASSWORD'], PASSWORD_BCRYPT );
            $userFields['UF_PASSWORD'] = $hashedPass;
        }
        if (!empty($body['user']['EMAIL'])) {
            $userFields['UF_EMAIL'] = $body['user']['EMAIL'];
        }

        $userQuery = new Query($hlblUser->getEntity());
        $userQuery->setSelect(["ID", 'UF_LOGIN'])
                ->setFilter(['UF_LOGIN' => $userFields['UF_LOGIN']]);
        $resultUserQuery = $userQuery->exec();
        $arUser = $resultUserQuery->fetch();

        $userSettingsQuery = new Query($hlblUserSettings->getEntity());
        $userSettingsQuery->setSelect(['ID'])
                        ->setFilter(['UF_FOREIGN_KEY_USER' => $arUser['ID']]);
        $resultUserSettingsQuery = $userSettingsQuery->exec();
        $arUserSettings = $resultUserSettingsQuery->fetch();

        $USER->Update($USER->GetID(), $userFields, false);
        if (!$USER->LAST_ERROR) {
            $status = true;
            $updatedUserElemId = $hlblUser->update($arUser['ID'], $userFields);
            $updatedUserSettingsElemId = $hlblUserSettings->update($arUserSettings['ID'], $userSettingsFields);
        }
//        \BitBalance\Tools::log($USER->LAST_ERROR);

        return ['status' => $status, 'updatedUserElemId' => $updatedUserElemId ?? 0, 'updatedUserSettingsElemId' => $updatedUserSettingsElemId ?? 0, "error" => $USER->LAST_ERROR];
    }

    public static function getUser($urlParams = []): array
    {
        global $USER;
        $highloadTableUserId = 1;
        $highloadTableUserSettingsId = 2;
        $highloadTablePhysical = 3;

        $hlblUser = new Highload($highloadTableUserId);
        $hlblUserSettings = new Highload($highloadTableUserSettingsId);
        $hlblPhysical = new Highload($highloadTablePhysical);


        $data = [
            'select' => ['*'],
            'filter' => [
                'UF_LOGIN' => $USER->GetLogin()
            ]
        ];

        $resultUserObj = $hlblUser->getList($data);
        $resultUser = $resultUserObj->fetch();

        $dataUserSettings = [
            'select' => ['*', 'PhysicalType.*'],
            "order" => array("ID" => "ASC"),
            'filter' => [
                'UF_FOREIGN_KEY_USER' => $resultUser['ID'],
            ],
            'runtime' => [
                new \Bitrix\Main\Entity\ReferenceField('PhysicalType',$hlblPhysical->getEntityDataClass(),
                    ['=this.UF_FOREIGN_KEY_PHYSICAL_TYPE' => 'ref.ID'] )
            ]
        ];

        $resultUserSettingsObj = $hlblUserSettings->getList($dataUserSettings);
        $result = $resultUserSettingsObj->fetch();
        return ["user" => $resultUser, "user_settings" => $result];
    }

    public static function addProduct($urlParams = [],$body = []): array
    {
        global $USER;
        $userID = \BitBalance\Api\Handler::getUserID();
        $hlblProductId = 4;
        $hlblMealId = 5;
        $hlblProduct = new Highload($hlblProductId);
        $hlblMeal = new Highload($hlblMealId);


        $productFields = [
            "UF_NAME" => $body['product']['name'],
            "UF_PROTEIN" => $body['product']['protein'],
            "UF_FAT" => $body['product']['fat'],
            "UF_CARBS" => $body['product']['carb'],
            "UF_CALORIES" => $body['product']['calorie'],
            "UF_AMOUNT" => $body['product']['count'],
        ];

        $elemProductId = $hlblProduct->Add($productFields);
        $elemMealId = false;
        if ($elemProductId) {
            $mealFields = [
                "UF_FOREIGN_KEY_USER" => $userID,
                "UF_FOREIGN_KEY_FOOD" => $elemProductId,
                "UF_MEAL_TYPE" => $body['product']['meal']
            ];

            $elemMealId = $hlblMeal->Add($mealFields);
        }
        return ['added_product_id' => $elemProductId, 'meal_id' => $elemMealId];
    }

    public static function addWater($urlParams = [],$body = []): array
    {
        global $USER;
        $userID = \BitBalance\Api\Handler::getUserID();

        $hlblWaterId = 6;
        $hlblWater = new Highload($hlblWaterId);

        $waterFields = [
            "UF_AMOUNT" => $body['water']['count'],
            "UF_FOREIGN_KEY_USER" => $userID
        ];

        $res_id = $hlblWater->Add($waterFields);

        return ["water_elem_id" => $res_id];
    }

    public static function addBurnedCalorie($urlParams = [],$body = []): array
    {
        global $USER;
        $userID = \BitBalance\Api\Handler::getUserID();
        $hlblCalorieId = 7;
        $hlblCalorie = new Highload($hlblCalorieId);

        $calorieFields = [
            "UF_AMOUNT" => $body['count'],
            "UF_FOREIGN_KEY_USER" => $userID
        ];

        $res_id = $hlblCalorie->Add($calorieFields);

        return ["burned_elem_id" => $res_id];
    }

    public static function getWater($urlParams = []): array
    {
        global $USER;
        $userID = \BitBalance\Api\Handler::getUserID();
        $hlblWaterId = 6;
        $hlblWater = new Highload($hlblWaterId);

        $timeZone = new \DateTimeZone('Europe/Moscow');
        $datetime = new \DateTime('now', $timeZone);
        $date = \Bitrix\Main\Type\Date::createFromPhp($datetime);

        $data = [
            'select' => ['SUM_WATER'],
            'filter' => [
                'UF_FOREIGN_KEY_USER' => $userID,
                "UF_DATE" => $date
            ],
            'runtime' => [
                new \Bitrix\Main\Entity\ExpressionField('SUM_WATER',
                    'SUM(%s)', array('UF_AMOUNT')
                )
            ]
        ];

        $resultUserObj = $hlblWater->getList($data);
        $result = $resultUserObj->fetch();
        return $result;
    }

    public static function getUserID(): int
    {
        global  $USER;
        $highloadTableUserId = 1;
        $hlblUser = new Highload($highloadTableUserId);

        $data = [
            'select' => ['*'],
            'filter' => [
                'UF_LOGIN' => $USER->GetLogin()
            ]
        ];

        $resultUserObj = $hlblUser->getList($data);
        $resultUser = $resultUserObj->fetch();
        return $resultUser['ID'];
    }

    public static function getTodayStat($urlParams = []): array
    {
        $userID = \BitBalance\Api\Handler::getUserID();
        $highloadTableMealId = 5;
        $highloadTableFoodlId = 4;
        $highloadTableActivityId = 7;
        $hlblMeal = new Highload($highloadTableMealId);
        $hlblFood = new Highload($highloadTableFoodlId);
        $highloadTableActivity = new Highload($highloadTableActivityId);

        $timeZone = new \DateTimeZone('Europe/Moscow');
        $datetime = new \DateTime('now', $timeZone);
        $date = \Bitrix\Main\Type\Date::createFromPhp($datetime);

        $data = [
            'select' => ['UF_FOREIGN_KEY_FOOD'],
            "order" => array("ID" => "ASC"),
            'filter' => [
                'UF_FOREIGN_KEY_USER' => $userID,
                "UF_DATE" => $date
            ]
        ];
        $arFood = [];
        $resultMealObj = $hlblMeal->getList($data);
        while($resultMeal = $resultMealObj->fetch()) {
            foreach ($resultMeal['UF_FOREIGN_KEY_FOOD'] as $food) {
                $arFood[] = $food;
            }
        }

        $dataFood = [
            'select' => ['SUM_CALORIE', 'SUM_PROTEIN', 'SUM_FAT', 'SUM_CARB'],
            'filter' => [
                'ID' => $arFood
            ],
            'runtime' => [
                new \Bitrix\Main\Entity\ExpressionField('SUM_CALORIE',
                    'SUM(%s)', array('UF_CALORIES')
                ),
                new \Bitrix\Main\Entity\ExpressionField('SUM_PROTEIN',
                    'SUM(%s)', array('UF_PROTEIN')
                ),
                new \Bitrix\Main\Entity\ExpressionField('SUM_FAT',
                    'SUM(%s)', array('UF_FAT')
                ),
                new \Bitrix\Main\Entity\ExpressionField('SUM_CARB',
                    'SUM(%s)', array('UF_CARBS')
                ),
            ]
        ];
        $resultFoodObj = $hlblFood->getList($dataFood);
        $result = $resultFoodObj->fetch();

        $dataActivity = [
            'select' => ['SUM_BURN_CALORIE'],
            'filter' => [
                'UF_FOREIGN_KEY_USER' => $userID,
                "UF_DATE" => $date
            ],
            'runtime' => [
                new \Bitrix\Main\Entity\ExpressionField('SUM_BURN_CALORIE',
                    'SUM(%s)', array('UF_AMOUNT')
                ),

            ]
        ];

        $resultActivityObj = $highloadTableActivity->getList($dataActivity);
        $burnedCalorie = $resultActivityObj->fetch();

        $result['SUM_BURN_CALORIE'] = $burnedCalorie['SUM_BURN_CALORIE'];
        \BitBalance\Tools::log($result);

        return $result;
    }

    public static function getPeriodStat($urlParams = [], $body=[]): array
    {
        $userID = \BitBalance\Api\Handler::getUserID();
        $highloadTableMealId = 5;
        $highloadTableFoodlId = 4;
        $hlblMeal = new Highload($highloadTableMealId);
        $hlblFood = new Highload($highloadTableFoodlId);


        $timeZone = new \DateTimeZone('Europe/Moscow');
        $datetimeStart = new \DateTime($body['start'], $timeZone);
        $datetimeEnd = new \DateTime($body['end'], $timeZone);
        $datetime = new \DateTime('now', $timeZone);
        $date = \Bitrix\Main\Type\Date::createFromPhp($datetime);

        $dateStart = \Bitrix\Main\Type\Date::createFromPhp($datetimeStart);
        $dateStart->add('1 day');
        $dateEnd = \Bitrix\Main\Type\Date::createFromPhp($datetimeEnd);
        $dateEnd->add('1 day');

        $timestamp = round(($dateEnd->getTimestamp() - $dateStart->getTimestamp()) / 60 / 60 / 24);
        $periodData = [];

        for ($i = 0; $i < $timestamp; $i++) {
            $data = [
                'select' => ['UF_FOREIGN_KEY_FOOD'],
                "order" => array("ID" => "ASC"),
                'filter' => [
                    'UF_FOREIGN_KEY_USER' => $userID,
                    "UF_DATE" => $dateStart,
                ]
            ];

            $arFood = [];
            $resultMealObj = $hlblMeal->getList($data);
            while($resultMeal = $resultMealObj->fetch()) {
                foreach ($resultMeal['UF_FOREIGN_KEY_FOOD'] as $food) {
                    $arFood[] = $food;
                }
            }

            $dataFood = [
                'select' => ['SUM_CALORIE'],
                'filter' => [
                    'ID' => $arFood
                ],
                'runtime' => [
                    new \Bitrix\Main\Entity\ExpressionField('SUM_CALORIE',
                        'SUM(%s)', array('UF_CALORIES')
                    ),

                ]
            ];
            $resultFoodObj = $hlblFood->getList($dataFood);
            $result = $resultFoodObj->fetch();
            $periodData[$dateStart->toString()] = $result['SUM_CALORIE'];
            $dateStart->add('1 day');
        }

        \BitBalance\Tools::log($periodData);

        return $periodData;
    }
}