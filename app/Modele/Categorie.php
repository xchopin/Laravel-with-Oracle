<?php

namespace app\Modele;
use Illuminate\Database\Eloquent\Model as Model;

class Categorie extends Model {

    protected $table = 'categorie';
    public $incrementing = false; //Car la clé primaire n'est pas un id !
    protected $primaryKey = 'nom_categorie';
    public $timestamps = false;

}
