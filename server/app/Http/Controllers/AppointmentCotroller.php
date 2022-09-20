<?php

namespace App\Http\Controllers;

use App\Http\Resources\AppointmentCollection;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentCotroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return Appointment collection where speciality_id is equal to the speciality_id from the request query
        if (request()->has("speciality_id")) {
            return new AppointmentCollection(Appointment::where("speciality_id", request()->query("speciality_id"))->get());
        }
        // return Appointment collection    
        return new AppointmentCollection(Appointment::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                "name" => "required|string",
                "description" => "required|string",
                "date" => "required|string",
                "speciality_id" => "required|integer",
                "client_id" => "required|integer",
            ]);
            // throw an error if the appointment date is in the past
            if (strtotime($request->date) < strtotime(date("Y-m-d H:i:s"))) {
                throw new \Exception("Appointment date must be in the future");
            }
            // throw an error if the appointment date is not between 12pm and 9pm at any day
            if (date("H", strtotime($request->date)) < 12 || date("H", strtotime($request->date)) > 21) {
                throw new \Exception("Appointment date must be between 12pm and 9pm");
            }
            // create the appointment

            $appointment = new Appointment([
                "name" => $request->name,
                "description" => $request->description,
                "date" => $request->date,
                "speciality_id" => $request->speciality_id,
                "client_id" => $request->client_id,
            ]);
            $appointment->save();
            return new AppointmentResource($appointment);
        } catch (\Throwable $th) {
            return response()->json([
                "message" => $th->getMessage(),
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function show(Appointment $appointment, Request $request)
    {
        // check if the user is the owner of the appointment
        if ($request->user()->id == $appointment->client_id) {
            return new AppointmentResource($appointment);
        }
        return response()->json([
            'message' => 'You are not allowed to view this appointment.'
        ], 403);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Appointment $appointment)
    {
        $appointment->update($request->all());
        return $appointment;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appointment $appointment)
    {
        //
        $appointment->delete();
        return response()->json([
            'message' => 'Appointment deleted successfully'
        ]);
    }
}
