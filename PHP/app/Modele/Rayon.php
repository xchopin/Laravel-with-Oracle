<?php

namespace app\Modele;
use Illuminate\Database\Eloquent\Model as Model;

class Rayon extends Model {

    protected $table = 'rayon';
    public $incrementing = false; //Car la clé primaire n'est pas un id !
    protected $primaryKey= 'nom_rayon';
    public $timestamps = false;

}
