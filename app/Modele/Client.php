<?php

namespace app\Modele;
use Illuminate\Database\Eloquent\Model as Model;

class Client extends Model {

    protected $table = 'client';
    protected $primaryKey= 'no_carte';
    public $timestamps = false;

}
