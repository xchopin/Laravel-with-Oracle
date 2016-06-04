<?php


namespace app\Controleur;


use app\Modele\Categorie;
use app\Modele\Item;
use app\Modele\Produit;
use app\Modele\Rayon;
use app\Modele\SousRayon;

class BaseController {

    protected $app;
    protected $data;
    protected $assets;



    public function __construct($app,$assets){

        $this->app=$app;
        $this->assets=$assets;
        $this->data=array();


        $tabSession= array_merge(array(), $_SESSION);
        $this->data['session'] = $tabSession;


        //------------------Navigation----------------------------------//



        $tabNavigation = array();


        //rootURI

        $tabNavigation['root']=$assets."/";

        $tabNavigation['assets']=$assets."/assets/";

        $tabNavigation['images']=$assets."/assets/IMAGES/";

        $tabNavigation['js']=$assets."/assets/js/";



        //home url

        $tabNavigation['home']="/";



        $this->data['navigation']=$tabNavigation;

        /* - - - - - - BASE DE DONNÉES - - - - - - - */

        $var=Categorie::all();
        $this->data['menu_categories']=$var->toArray();

        $var=Rayon::all();
        $this->data['menu_rayons']=$var->toArray();

        $var=SousRayon::all();
        $this->data['menu_sous_rayons']=$var->toArray();



        $this->data["nbArticle"] = 0;
        $this->data["totalPanier"] = 0;

        if ( isset($_SESSION["no_carte"]) ) {

            $no_carte = $_SESSION["no_carte"];

            $items = Item::where("no_carte", "=", intval($no_carte))->get();
            $prix = 0;
            $nb = 0;
            if ($items != NULL){

                foreach ($items as $item){
                    $produit =  Produit::find($item->reference);
                    $prix+= $produit->prix_unit_ht * $item->quantite;
                    $nb += $item->quantite;
                }
            }

            $this->data["nbArticle"] = $nb;
            $this->data["totalPanier"] = $prix;
        }




    }



    public function getInfoNavBar(){
        return $this->data;
    }




    public function redirect($page = NULL){
        $this->app->redirect($this->data['navigation']['root'].$page);
    }





}