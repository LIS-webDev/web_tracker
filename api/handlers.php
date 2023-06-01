<?php
/** @var BitBalance\Api\Handler $Api */
//----для примера----
//вернет ответ на GET запрос
$Api->handlerGet("/api/test/", [
    'callback'         => [ "\BitBalance\Api\Handler", "test" ],
    'needAuth'         => false,//по умолчанию true
    'exceptionMessage' => 'Не получилось отправить запрос',//в случае ошибки в методе будет такой ответ всегда
]);

$Api->handlerGet("/api/user/register/", [
    'callback' => [ "\BitBalance\Api\Handler", "register" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось зарегистрироваться',
]);

$Api->handlerPost("/api/user/auth/", [
    'callback' => [ "\BitBalance\Api\Handler", "auth" ],
    'needAuth' => false,
    'exceptionMessage' => 'Не получилось авторизоваться',
]);

