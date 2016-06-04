<?php


namespace arf;

require('vendor/autoload.php');
use Illuminate\Database\Capsule\Manager as Capsule;
use Yajra\Oci8\Connectors\OracleConnector;
use Yajra\Oci8\Oci8Connection;


class ConnectionFactory {
    public static function connexionOracle(){

        $capsule = new Capsule;
        $manager = $capsule->getDatabaseManager();
        $manager->extend('oracle', function($config)
        {
            $connector = new OracleConnector();
            $connection = $connector->connect($config);
            $db = new Oci8Connection($connection, $config["database"], $config["prefix"]);

            // Paramètre la session Oracle
            $sessionVars = [
                'NLS_TIME_FORMAT'         => 'HH24:MI:SS',
                'NLS_DATE_FORMAT'         => 'YYYY-MM-DD HH24:MI:SS',
                'NLS_TIMESTAMP_FORMAT'    => 'YYYY-MM-DD HH24:MI:SS',
                'NLS_TIMESTAMP_TZ_FORMAT' => 'YYYY-MM-DD HH24:MI:SS TZH:TZM',
                'NLS_NUMERIC_CHARACTERS'  => '.,',
            ];


            if (isset($config['schema']))
            {
                $sessionVars['CURRENT_SCHEMA'] = $config['schema'];
            }

            $db->setSessionVars($sessionVars);

            return $db;
        });

        $capsule->addConnection(array(
            'driver'   => 'oracle',
            'host'     => 'localhost',
            'database' => 'XE',
            'username' => 'SYSTEM',
            'password' => 'root',
            'prefix'   => '',
            'port'  => 1521
        ));

        $capsule->bootEloquent();


    }
}


?>
