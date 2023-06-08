<?php
/** @var BitBalance\Api\Handler $Api */

//----для примера----
//вернет ответ на GET запрос
$Api->handlerGet("/api/test/", [
    'callback'         => [ "\BitBalance\Api\Handler", "test" ],
    'needAuth'         => false,//по умолчанию true
    'exceptionMessage' => 'Не получилось отправить запрос',//в случае ошибки в методе будет такой ответ всегда
]);

$Api->handlerPost("/api/user/register/", [
    'callback' => [ "\BitBalance\Api\Handler", "register" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось зарегистрироваться',
]);

$Api->handlerPost("/api/user/auth/", [
    'callback' => [ "\BitBalance\Api\Handler", "auth" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось авторизоваться',
]);

$Api->handlerPost("/api/user/update/", [
    'callback' => [ "\BitBalance\Api\Handler", "updateUser" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось обновить данные',
]);

$Api->handlerGet("/api/user/logout/", [
    'callback' => [ "\BitBalance\Api\Handler", "logout" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось отправить запрос',
]);

$Api->handlerGet("/api/user/get/", [
    'callback' => [ "\BitBalance\Api\Handler", "getUser" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось отправить запрос',
]);

$Api->handlerGet("/api/user/check_auth/", [
    'callback'         => [ "\BitBalance\Api\Handler", "checkAuth" ],
    'needAuth'         => false,//по умолчанию true
    'exceptionMessage' => 'Не получилось авторизоваться',//в случае ошибки в методе будет такой ответ всегда
]);

$Api->handlerPost("/api/product/add/", [
    'callback' => [ "\BitBalance\Api\Handler", "addProduct" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось добавить продукт',
]);

$Api->handlerGet("/api/product/get/", [
    'callback' => [ "\BitBalance\Api\Handler", "getProduct" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось получить продукт',
]);

$Api->handlerPost("/api/water/add/", [
    'callback' => [ "\BitBalance\Api\Handler", "addWater" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось добавить воду',
]);

$Api->handlerGet("/api/water/get/", [
    'callback' => [ "\BitBalance\Api\Handler", "getWater" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось получить воду',
]);

$Api->handlerPost("/api/burncalorie/add/", [
    'callback' => [ "\BitBalance\Api\Handler", "addBurnedCalorie" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось добавить',
]);

$Api->handlerGet("/api/burncalorie/get/", [
    'callback' => [ "\BitBalance\Api\Handler", "getBurnedCalorie" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось получить',
]);

$Api->handlerGet("/api/stat/today/get/", [
    'callback' => [ "\BitBalance\Api\Handler", "getTodayStat" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось получить',
]);

$Api->handlerPost("/api/stat/period/get/", [
    'callback' => [ "\BitBalance\Api\Handler", "getPeriodStat" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось получить',
]);

