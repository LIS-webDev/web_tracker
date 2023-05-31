<?php if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
    die();
global $APPLICATION;
use Bitrix\Main\Page\Asset;
use BitBalance\VueFiles;
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$APPLICATION->ShowTitle();?></title>
    <?php $APPLICATION->ShowHead();?>
    <?php
    Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/styles/fonts.css");
    Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/styles/null.css");
    Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/styles/style.css");
    Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/p-script.js");
    Asset::getInstance()->addJs("/local/vue/dist-dev/js/app.js");
    Asset::getInstance()->addJs("/local/vue/dist-dev/js/chunk-vendors.js");
    ?>
</head>
<?php $APPLICATION->ShowPanel();?>
<body>
<?php if ($USER->isAdmin()):?>
<div id="app" class="app">
    <aside class="aside">
        <div class="aside__content-wrapper">
            <div class="aside__content">
                <div class="aside__logo">
                    <router-link to="/"><img src="<?=SITE_TEMPLATE_PATH?>/img/logo.svg" alt="Bite Balance"></router-link>
                </div>
                <aside-menu></aside-menu>
            </div>
        </div>
        <div class="aside__control">
            <div class="aside__burger" onclick="toggleAsideMenu()"><span></span></div>
        </div>
    </aside>
    <main class="main">
        <div class="main__content">
<?php endif;?>
