<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Speciality extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        'name',
        'description',
    ];



    // has many Users
    public function doctors()
    {
        return $this->hasMany(User::class);
    }
}
