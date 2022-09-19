<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "id",
        'first_name',
        'last_name',
        'email',
        'password',
        'speciality_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        "remember_token",
    ];


    // has many Appointments
    public function appointments()
    {
        $client = $this->hasMany(Appointment::class, "client_id");
        $doctor = $this->hasMany(Appointment::class, "doctor_id");
        return $client->union($doctor);
    }

    // Belongs to Speciality
    public function speciality()
    {
        return $this->belongsTo(Speciality::class);
    }

    public function generateToken()
    {
        try {
            // generate a new token for the user and expire it after 24 hours

            $next_week = now()->addWeek();
            $this->remember_token = $this->createToken('api_token', expiresAt: $next_week)->plainTextToken;
            $this->save();
            return $this->remember_token;
        } catch (\Exception $e) {
            error_log($e);
            return response()->json([
                'message' => 'Error while generating token',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // remove the token from the database
    public function revokeToken()
    {
        try {
            $this->tokens()->delete();
        } catch (\Exception $e) {
            error_log($e);
            return response()->json([
                'message' => 'Error while revoking token',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
