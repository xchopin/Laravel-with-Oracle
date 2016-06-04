<?php

namespace app\Modele;
use Illuminate\Database\Eloquent\Model as Model;

class Item extends Model {

    protected $table = 'item';
    public $incrementing = false; //Car la clé primaire n'est pas un id !
    public $timestamps = false;



}
