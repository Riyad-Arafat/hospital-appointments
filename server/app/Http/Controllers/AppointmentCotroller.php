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
        // throw an error if the appointment is not between 12pm and 9pm
        if ($request->start_date->format('H') < 12 || $request->start_date->format('H') > 21) {
            throw new \Exception("Appointments can only be made between 12pm and 9pm");
        }
        // throe an error if the appointment doctor_id is the same as the client_id
        if ($request->doctor_id == $request->client_id) {
            throw new \Exception("You can't make an appointment with yourself");
        }

        // create the appointment
        $appointment = Appointment::create($request->all());
        return $appointment;
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
        if ($request->user()->id == $appointment->user_id || $request->user()->id == $appointment->doctor_id) {

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
