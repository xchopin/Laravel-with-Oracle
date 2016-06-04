<?php
/**
 * Created by PhpStorm.
 * User: Xavier
 * Date: 10/05/2016
 * Time: 17:57
 */

namespace app\Controleur;

use app\Modele\Client;
use app\Modele\ObjetPromo;
use app\Modele\Panier;
use app\Modele\Item;
use app\Modele\PIndividuelle;
use app\Modele\Planning;
use app\Modele\PLot;
use app\Modele\Produit;
use app\Modele\Promotion;
use DateTime;

class ClientController extends BaseController {



    public function __construct($app,$assets){
        parent::__construct($app,$assets);
        date_default_timezone_set("Europe/Paris");

    }

    public function creerClient($tab){

        if ( isset($tab) ){

            $existeDeja = Client::find($tab["no_carte"]);

            if ($existeDeja == NULL) {
                $client = new Client();
                $client->e_mail    = $tab["email"];
                $client->no_carte  = $tab["no_carte"];
                $client->nom       = $tab["nom"];
                $client->prenom    = $tab["prenom"];
                $client->adresse   = $tab["adresse"];
                $client->telephone = $tab["telephone"];

                try {
                    $client->save();
                    $_SESSION["no_carte"] =  $client->no_carte;
                    $_SESSION["nom"] =  $client->prenom;
                    $this->gestionPanier();

                }catch(Exception $e){
                    echo 'Erreur : ',  $e->getMessage(), "\n";
                }
            }



        }

        $this->redirect();
    }

    public function seConnecter($tab){

        if ( isset($tab) ){

            $client = Client::find($tab["no_carte"]);

            if (!(empty($client))) {
                $_SESSION["prenom"] = $client->prenom;
                $_SESSION["no_carte"] = $client->no_carte;
                $this->gestionPanier();
                $this->redirect();
            }
        }

        $this->redirect("login");


    }

    public function seDeconnecter(){
        $_SESSION = array();
        session_destroy();
        $this->redirect();
    }

    public function getInfoClient() {
        if ( isset($_SESSION["no_carte"]) ){
            $id = $_SESSION["no_carte"];
            $var = Client::find(intval($id));
            $this->data["client"] = $var;

            $panier = Panier::find($_SESSION["no_carte"]);

            if ($panier->vide_vf == "F"){
                $this->data["commande"] = $panier;
            }


            return $this->data;
        }


        $this->redirect();
        return NULL;


    }

    public function gestionPanier(){
        if ( isset($_SESSION) ) {
            $id = $_SESSION["no_carte"];

            $panier = Panier::find($id);
            // Le panier n'existe pas
            if ($panier == NULL){
                date_default_timezone_set("Europe/Paris");
                $panier = new Panier();
                $panier->no_carte  = intval($_SESSION["no_carte"]);
                $panier->save();
            }

        }

        $this->redirect();


    }

    public function ajouterAuPanier($tab){

        if ( isset($_SESSION["no_carte"]) && isset($tab) ) {
            $no_carte = $_SESSION["no_carte"];

            $id = $tab["reference"];
            $quantite = $tab["quantite"];
            $item = Item::where("no_carte","=",intval($no_carte))
                        ->where("reference","=",$id)
                        ->first();


            $produit = Produit::where("reference","=",$id)->first();
            $quantiteVoulue =  $quantite;
            $quantiteDispo = $produit->quantite_stock;


            // Si le produit existe déjà dans le panier on incrémente la quantité
            if ($item != NULL){
                $quantiteVoulue =  $item->quantite + $quantite;

                if ($quantiteDispo >= $quantiteVoulue){
                    Item::where("no_carte","=",intval($no_carte))
                        ->where("reference","=",$id)
                        ->update(['quantite' => intval($quantiteVoulue)]);
                }

            }else{
                if ($quantiteDispo >= $quantiteVoulue){
                    $item = new Item();
                    $item->no_carte = intval($no_carte);
                    $item->reference = $id;
                    $item->quantite = intval($quantiteVoulue);
                    $item->save();
                }

            }
            $this->redirect("article/".$id);
        }

           $this->redirect();

        return NULL;
    }

    public function getInfoPanier(){

        if (isset($_SESSION["no_carte"])) {

            $no_carte = $_SESSION["no_carte"];

            $items = Item::where("no_carte", "=", intval($no_carte))->get();

            $this->data["contenuPanier"] = $items->toArray();

            $tab = array();
            foreach ($items as $item){
                $temp = array();
                $temp = Produit::where("reference",'=',$item->reference)->first();
                array_add($temp,"quantite",$item->quantite);
                array_push($tab,$temp);
            }

            $this->data["produits"] = $tab;

            return $this->data;

        }

        $this->redirect();
        return NULL;
    }

    public function utiliserPromotion($tab){

        $this->getInfoPanier();

        if (isset($tab["code"])){

            $code_promo= $tab["code"];

            $promo = Promotion::where("code_promo","=",$code_promo)->first();

            if ($promo != NULL){

                $sysdate = new DateTime();
                $sysdate = $sysdate->format('Y-m-d H:i:s');


                if ($promo->date_debut <= $sysdate &&  $sysdate <= $promo->date_fin ){


                    $totalPanier = $this->data["totalPanier"];
                    $ancienPrixPanier = $totalPanier;
                    foreach ($this->data["produits"] as $produit ){
                        $reference = $produit["reference"];

                      //Notre produit est il en promotion ?
                      $verif = ObjetPromo::where("reference","=",$reference)
                                          ->where("code_promo","=",$code_promo)
                                          ->first();

                      if ($verif != null) {
                         //Qu'elle type de promotion est-ce ?
                         $typePromo = PLot::where("code_promo", "=", $code_promo)->first();

                         if ($typePromo != NULL) {
                          $quantite = $produit["quantite"];

                          if ($quantite >= $typePromo->nb_achetes) {
                               $ancienPrix = $quantite * $produit->prix_unit_ht;

                              if ($quantite > $promo->max_par_client) {
                                  $nouveauPrix = ( $promo->max_par_client * ($typePromo->nb_gratuits * $produit->prix_unit_ht));
                                  $totalPanier = $totalPanier - $nouveauPrix;
                              } else {
                                  $nouveauPrix  = $typePromo->nb_gratuits * $produit->prix_unit_ht;
                                  $totalPanier = $totalPanier - $nouveauPrix;
                              }

                              $this->data["totalPanier"] = $totalPanier;
                              $this->data["promoEffectuee"] = 1;
                              $this->data["promoImmediat"] = 1;
                              $this->data["ancienTotalPanier"] = $ancienPrixPanier;

                              $temp = array();
                              $temp["ancienPrix"] = $ancienPrix;
                              $temp["nouveauPrix"] = $nouveauPrix;
                              $temp["reference"] = $reference;

                              $this->data["ancienPrix"] = $temp;


                              return $this->data;

                          }
                      }else{
                          // si c'est NULL c'est l'autre promotion !
                          $typePromo = PIndividuelle::where("code_promo", "=", $code_promo)->first();

                          $quantite = $produit["quantite"];
                          $ancienPrix = $quantite * $produit->prix_unit_ht;

                          $reducAbsolue = $typePromo->reduction_absolue;

                          if ($reducAbsolue != NULL){

                              if ($quantite > $promo->max_par_client) {
                                  $nouveauPrix = ( $promo->max_par_client * $reducAbsolue );
                              } else {
                                  $nouveauPrix = ( $quantite * $reducAbsolue );
                              }

                          }else{
                              $reducRelative = $typePromo->reduction_relative;

                              if ($quantite > $promo->max_par_client) {
                                  $nouveauPrix = ( $promo->max_par_client * ($reducRelative/10) );
                              } else {
                                  $nouveauPrix = ( $quantite * ($reducRelative/10) );
                              }

                          }

                          $immediat = $typePromo->immediate_vf;

                          if ($immediat == "V"){
                              $totalPanier = $totalPanier - $nouveauPrix;
                              $this->data["promoImmediat"] = 1;
                          }else{
                              $this->data["credit_carte"] = $nouveauPrix;
                              $this->data["promoImmediat"] = 0;
                          }


                          $this->data["totalPanier"] = $totalPanier;
                          $this->data["promoEffectuee"] = 1;
                          $this->data["ancienTotalPanier"] = $ancienPrixPanier;
                          $temp = array();
                          $temp["ancienPrix"] = $ancienPrix;
                          $temp["nouveauPrix"] = $nouveauPrix;
                          $temp["reference"] = $reference;
                          $this->data["ancienPrix"] = $temp;
                          return $this->data;

                      }

                    }

                  }
            }

            }



        }

        $this->redirect("panier");
        return NULL;

    }

    public function effacerPanier($tab=NULL){

        if (isset($_SESSION["no_carte"])) {

            if ($tab == NULL){
                // On efface tous les élements du panier
                $no_carte = intval($_SESSION["no_carte"]);
                Item::where("no_carte","=",$no_carte)->delete();
                $this->redirect();

            }else{
                $reference = $tab["reference"];
                $no_carte = intval($_SESSION["no_carte"]);
                Item::where("no_carte","=",$no_carte)
                    ->where("reference","=",$reference)
                    ->delete();
                $this->redirect("panier");
            }


        }

        $this->redirect();

    }

    public function validerPanier($tab){

        if (isset($tab)){

            $this->data["totalPanier"] = $tab["totalPanier"];
            $sysdate = new DateTime();
            $dates = Planning::where("date_heure",">=",$sysdate->format('Y-m-d H:i:s'))->get();

            $tableau = array();
            $temp = array();

            foreach ($dates as $date){
                $nbPanier = Panier::where("datevalidation","=",$date->date_heure)->count();

                if ($nbPanier <= $date->nombre_livraisons_max){
                    array_push($temp,$date->date_heure);
                }
            }

            $tableau["date"] = $temp;
            $this->data["planning"] = $tableau;

            return $this->data;
        }
        $this->redirect();
        return NULL;
    }


    public function payerPanier($tab){

        if ( isset($tab) ){


            $date = $tab["dateValidation"];
            $montant = $tab["prixPanier"];


            $dt = new DateTime();

            Panier::where("no_carte","=",$_SESSION["no_carte"])
                ->update(["montant" => intval($montant),"vide_vf" => "F",
                    "date_heure" => $date, "datevalidation" => $dt->format('Y-m-d H:i:s') ]);

        }

        //Décrémentons les items

        $items = Item::where("no_carte","=",$_SESSION["no_carte"])->get();


        foreach($items as $item){
            $produit = Produit::find($item->reference);
            $produit->quantite_stock = ($produit->quantite_stock - $item->quantite);

            $produit->update();
        }


        $this->redirect("me");
    }

}