<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/bitrix/modules/main/include/prolog_before.php");
use \BitBalance\Highload;
use Bitrix\Main\Entity\Query;

$hlbl = new Highload(2);
$userQuery = new Query($hlbl->getEntity());
$userQuery->setSelect(["*"]);
$resultUserQuery = $userQuery->exec();
$arUser = $resultUserQuery->fetch();
echo '<pre>';
print_r($arUser);
echo '</pre>';
