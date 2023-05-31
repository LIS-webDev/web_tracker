<?php


namespace BitBalance;

class Tools
{
    public static function log($data, string $name = 'log', string $subDir = '',$withBacktrace = false): void
    {
        //для отслеживания очередности на хите
        static $logAmountOnHit = 1;
        if (!$name)
        {
            $name = 'log';
        }
        $log = "#start#---- " . date("d.m.Y H:i:s")." --- ".$_SERVER['UNIQUE_ID']." [$logAmountOnHit] ----\n";

        $logAmountOnHit++;
        $log .= print_r($data, 1);
        $log .= "#end#\n";
        $log .= "------------------------------------\n";

        $dir = $_SERVER[ 'DOCUMENT_ROOT' ] . '/local/logs/';
        if ($subDir)
        {
            $dir .= "$subDir/";
            if (!file_exists($dir))
            {
                mkdir($dir, BX_DIR_PERMISSIONS, true);
            }
        }
        $fileName = $name . ".log";
        $filePath = $dir . $fileName;
        if (file_exists($filePath))
        {
            if (filesize($filePath) > 1024 * 1024 * 2)
            {
                rename($filePath, $dir . $name . '_archive.log');
            }
        }
        file_put_contents($filePath, $log, FILE_APPEND);
    }

}