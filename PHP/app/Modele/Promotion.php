<?php

namespace app\Modele;
use Illuminate\Database\Eloquent\Model as Model;

class Promotion extends Model {

    protected $table = 'promotion';
    public $incrementing = false;
    protected $primaryKey = 'code_promo';
    public $timestamps = false;

}
