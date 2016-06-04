<?php



namespace app\Controleur;



use app\modele\Categorie;
use app\modele\Client;
use app\modele\Item;
use app\Modele\ObjetPromo;
use app\modele\P_individuelle;
use app\modele\P_lot;
use app\modele\Panier;
use app\modele\Planning;
use app\modele\Produit;
use app\modele\Promotion;
use app\modele\Rayon;
use app\modele\SousRayon;
use app\modele\Sous_sous_rayon;
use app\Modele\SousSousRayon;
use app\Modele\SRP;
use app\Modele\SSRP;


/*
    NavController
    The controller to display data
*/

class NavController extends BaseController {

    /* Navcontroller constructor */
    public function __construct($app,$assets){
        parent::__construct($app,$assets);

    }

    public function accueil(){
        $promos = ObjetPromo::all();
        $tab = array();
        foreach ($promos as $promo){
            $p = Produit::where("reference","=",$promo->reference)->first();

            if ($p != NULL){
                array_push($tab,$p);
            }

        }
        $this->data["promotions"] = $tab;


        return $this->data;
    }

    public function sousRayon($nom){

        /* - - - - - - BASE DE DONNÉES - - - - - - - */

        $sousrayon= SousRayon::where("TRIM(nom_sr)","=",$nom)->first();

        if ($sousrayon == null){
            $this->redirect("404");
        }

        $this->data['sous_rayon'] = $sousrayon->toArray();
        $rayon =  Rayon::where("nom_rayon","=",$sousrayon->nom_rayon)->first();

        $this->data['nom_categorie'] = Categorie::where("nom_categorie","=",$rayon->nom_categorie)
                                       ->first()->nom_categorie;


        $produits  = SRP::where('TRIM(nom_sr)','=',$nom)->get();
        $tabProduits = array();
        $i = 0;



        foreach ($produits as $p) {
            $reference = $p->reference;
            $produit  = Produit::where('reference','=',$reference)->first();
            $tabProduits[$i]=$produit->toArray();
            $i++;
        }

        $this->data['tabProduits']=$tabProduits;


        // Sous sous rayon

        $var = SousSousRayon::where("nom_sr","=",$sousrayon->nom_sr)->get();
        $this->data['ss_rayon'] = $var;

        return $this->data;

    }

    public function rechercher($tab){
        if (isset($tab)){
            $produit = Produit::where("TRIM(reference)","=",$tab["reference"])->first();

            if ($produit != null){
                $this->redirect("article/".$tab["reference"]);
            }

        }
        $this->redirect();
    }

    public function article($reference){
        /* - - - - - - BASE DE DONNÉES - - - - - - - */

        $var = Produit::where('TRIM(reference)','=',$reference)->first();
        if ($var == null){ header('Location: ' . $this->data['navigation']['root'] . '404'); exit(); }

        $this->data['produit']=$var->toArray();

        if ($var->quantite_stock > 0){
            $this->data['produit_disponible']=1; // true;
        }


        $ssRayon = SSRP::where("TRIM(reference)",'=',$reference)->first();
        // le produit n'a peut etre pas de sous sous rayon ?
        if ($ssRayon != NULL){
            $ssRayon = SSRP::where("TRIM(reference)",'=',$reference)->first();
            $ssRayon = SousSousRayon::where("TRIM(nom_ssr)",'=',$ssRayon["nom_ssr"])->first();
            $this->data['ssRayon']=$ssRayon;
        }

        $sRayon = SRP::where("TRIM(reference)",'=',$reference)->first();
        $var = SousRayon::where("nom_sr",'=',$sRayon["nom_sr"])->first();
        $this->data['sRayon']=$var;

        $rayon = Rayon::where("nom_rayon",'=',$var["nom_rayon"])->first();
        $this->data['rayonProduit']=$rayon;


        $categorie = Categorie::where("nom_categorie",'=',$rayon["nom_categorie"])->first();
        $this->data['categorieProduit']=$categorie;




        return $this->data;
    }

}