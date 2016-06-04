<?php

namespace app\Modele;
use Illuminate\Database\Eloquent\Model as Model;

class Planning extends Model {

    protected $table = 'planning';
    public $incrementing = false;
    protected $primaryKey= 'date_heure';
    public $timestamps = false;

}
