<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return  [
            'id' => $this->id,
            'client' => $this->patient->first_name . ' ' . $this->patient->last_name,
            'doctor' => $this->doctor->first_name . ' ' . $this->doctor->last_name,
            'speciality' => $this->doctor->speciality->name,
            'date' => $this->date,
            'time' => $this->time,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
