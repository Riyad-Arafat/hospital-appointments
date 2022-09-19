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
        "doctor_id",
        "date",
        "time",
        "name",
        "description",
    ];

    // Belongs to Doctor
    public function doctor()
    {
        return $this->belongsTo(User::class, "doctor_id");
    }

    // Belongs to client
    public function client()
    {
        return $this->belongsTo(User::class, "client_id");
    }
}
