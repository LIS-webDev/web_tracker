<?php
error_reporting(0);
require $_SERVER[ 'DOCUMENT_ROOT' ] . '/local/php_interface/autoloader.php';
/**BitBalance API
 * \BitBalance\Api\Handler::clearAllCache(); - удаление кеша по ттл
 */
ignore_user_abort(1);
set_time_limit(60);

//SM_SAFE_MODE - на подумать
const PUBLIC_AJAX_MODE = true;
const STOP_STATISTICS = true;
const NO_AGENT_STATISTIC = true;
const NO_AGENT_CHECK = true;
$response = [
    'time'    => microtime(1),
    'data'    => [],//данные ответа
    'message' => null,
    'success' => false,
    'code'    => null,//код ошибки.

];
$Api = new \BitBalance\Api\Handler();
try
{
    /** Все методы пишите в этом файле*/
    require __DIR__ . '/handlers.php';

    $response[ 'data' ] = $Api->execute();
    $response[ 'success' ] = true;
    $response[ 'message' ] = $Api::getMessage();

} catch (\Throwable $e)
{
    //todo логирование ошибок
    $response = [
        'time'    => $response[ 'time' ],
        'message' => empty($Api->exceptionMessage) ? $e->getMessage() : $Api->exceptionMessage,
        //особое сообщение, заданное в параметрах "exceptionMessage" или текст ошибки
        'code'    => (int)$e->getCode(),
    ];
}

header('Content-Type: application/json');
$response[ 'time' ] = microtime(1) - $response[ 'time' ];

echo \BitBalance\Api\Handler::jsonEncode($response);

//для корректных кук
if (defined('B_PROLOG_INCLUDED'))
{
    require($_SERVER[ "DOCUMENT_ROOT" ] . BX_ROOT . "/modules/main/include/epilog_after.php");
}
