<?php

namespace app\Modele;
use Illuminate\Database\Eloquent\Model as Model;

class Panier extends Model {

    protected $table = 'panier';
    protected $primaryKey= 'no_carte';
    public $timestamps = false;




}
