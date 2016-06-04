<?php
/**
 * Created by PhpStorm.
 * User: Xavier
 * Date: 07/05/2016
 * Time: 17:55
 */

/** ---------------   PARAMETRES   ---------------------- */

require 'vendor/autoload.php';
use app\Modele\Produit;
use \Slim\Slim;
use Slim\Views\Twig;
use \arf\ConnectionFactory as DB;
use \app\Controleur\NavController;
use \app\Controleur\ClientController;

//. Slim
$app = new Slim( array(
        'view' => new Twig(),
        'templates.path' => 'app/vue')
);


// .Twig
$view = $app->view();
$view->parserOptions = array(
    'debug' => true,
);

$view->parserDirectory=dirname(__FILE__) . 'vendor/';

// .Base de données
DB::connexionOracle();

session_start();
/** ---------------   ROUTAGES  ---------------------- */


    // 1) Routes Clientes

         $app->get('/', function () use ($app) {
             $control=new NavController($app,".");
             $app->render('home.html.twig',$control->accueil());
         });

        $app->get('/rayon/:nom', function ($nom) use ($app) {
            $control=new NavController($app,"..");
            $app->render('categorie.html.twig',$control->sousRayon($nom));
        });

        $app->get('/article/:reference', function ($reference) use ($app) {
            $control=new NavController($app,"..");
            $app->render('article.html.twig',$control->article($reference));
        });


         $app->get('/login', function () use ($app) {
             $control=new NavController($app,".");
             $app->render('login.html.twig',$control->getInfoNavBar());
         });

        $app->get('/new', function () use ($app) {
            $control=new NavController($app,".");
            $app->render('nouveaucompte.html.twig',$control->getInfoNavBar());
        });


        $app->post('/create', function () use ($app) {
            $control = new ClientController($app,".");
            $control->creerClient($_POST);
        });


        $app->post('/connexion', function () use ($app) {
            $control = new ClientController($app,".");
            $control->seConnecter($_POST);
        });


        $app->get('/logout', function () use ($app) {
            $control = new ClientController($app,".");
            $control->seDeconnecter();
        });


        $app->get('/me', function () use ($app) {
            $control = new ClientController($app,".");
            $app->render('moncompte.html.twig',$control->getInfoClient());
        });


        $app->post('/add', function () use ($app) {
            $control = new ClientController($app,".");
            $control->ajouterAuPanier($_POST);
        });

        $app->post('/search', function () use ($app) {
            $control = new NavController($app,".");
            $control->rechercher($_POST);
        });


        /**  PANIER  */

        $app->get('/panier', function () use ($app) {
            $control = new ClientController($app,".");
            $app->render('panier.html.twig', $control->getInfoPanier());
        });


        $app->post('/panier', function () use ($app) {
            $control = new ClientController($app,".");
            $app->render('panier.html.twig', $control->utiliserPromotion($_POST));
        });

        $app->post('/delete', function () use ($app) {
            $control = new ClientController($app,".");
            $control->effacerPanier($_POST);
        });

        /** Validation Panier */

        $app->post('/validation', function () use ($app) {
            $control = new ClientController($app,".");
            $app->render('validationpanier.html.twig',$control->validerPanier($_POST));
        });

        $app->post('/payer', function () use ($app) {
            $control = new ClientController($app,".");
            $control->payerPanier($_POST);
        });




    // 3) Routes Exceptions
   $app->notFound(function () use ($app) {  include_once('./assets/error/404.php'); });
/** ---------------   RUN   ---------------------- */

$app->run();


?>

