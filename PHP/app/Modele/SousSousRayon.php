<?php

namespace app\Modele;
use Illuminate\Database\Eloquent\Model as Model;

class SousSousRayon extends Model {

    protected $table = 'sous_sous_rayon';
    public $incrementing = false; //Car la clé primaire n'est pas un id !
    protected $primaryKey= 'nom_ssr';
    public $timestamps = false;

}
