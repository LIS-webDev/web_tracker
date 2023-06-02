<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Bite Balance");
?>
    <?php if ($_SESSION['USER_LOGIN']):?>
        <h1>HELLO <?=$_SESSION['USER_LOGIN']?></h1>
    <?php else:?>

    <?php endif;?>
    <router-view></router-view>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>