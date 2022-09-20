<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        "client_id",
        "speciality_id",
        "date",
        "time",
        "name",
        "description",
    ];

    // Belongs to a client
    public function client()
    {
        return $this->belongsTo(User::class, "client_id");
    }
    // Belongs to a speciality
    public function speciality()
    {
        return $this->belongsTo(Speciality::class, "speciality_id");
    }
}
