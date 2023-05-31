<?php

namespace BitBalance;
use Bitrix\Main\Page\Asset;


class VueFiles
{
    public const DIST_DIR = '/local/vue';

    public static function addVueFiles()
    {
        try
        {
            $Assets = Asset::getInstance();
            foreach (VueFiles::getCssFiles() as $path)
            {
                $Assets->addCss($path);
            }

            foreach (VueFiles::getJsFiles() as $path)
            {
                print_r($path);
                $Assets->addJs($path);
            }
        }
        catch (\Throwable $e)
        {

        }
    }

    public static function getCssFiles(): array
    {
        $files = [];
        $dirPath = self::getActualDirPath();
        $appCssFiles = glob($dirPath . '/css/app.*css');
        $vendorCssFiles = glob($dirPath . '/css/chunk-vendors.*css');
        if ( $appCssFiles )
        {
            $files[] = $appCssFiles[0];
        }
        if ( $vendorCssFiles )
        {
            $files[] = $vendorCssFiles[0];
        }
        foreach ($files as &$path)
        {
            $path = str_replace($_SERVER['DOCUMENT_ROOT'], '', $path);
        }

        return $files;
    }

    /**
     * @return string
     */
    private static function getActualDirPath(): string
    {
        $dirPath = self::getDistDir() . '/dist';
        if ( $_SESSION['DEV_MODE'] )
        {
            $dirPath = self::getDistDir() . '/dist-dev';
        }

        return $dirPath;
    }

    public static function getDistDir(): string
    {
        return $_SERVER['DOCUMENT_ROOT'] . self::DIST_DIR;
    }

    public static function getJsFiles(): array
    {
        $files = [];
        $dirPath = self::getActualDirPath();
        $appCssFiles = glob($dirPath . '/js/app.*js');
        $vendorCssFiles = glob($dirPath . '/js/chunk-vendors.*js');
        if ( $appCssFiles )
        {
            $files[] = $appCssFiles[0];
        }
        if ( $vendorCssFiles )
        {
            $files[] = $vendorCssFiles[0];
        }
        foreach ($files as &$path)
        {
            $path = str_replace($_SERVER['DOCUMENT_ROOT'], '', $path);
        }

        return $files;
    }

}
