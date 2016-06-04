<?php

namespace app\Modele;
use Illuminate\Database\Eloquent\Model as Model;

class Produit extends Model {

    protected $table = 'produit';
    public $incrementing = false;
    protected $primaryKey = 'reference';
    public $timestamps = false;


}
