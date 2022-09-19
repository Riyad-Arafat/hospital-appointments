<?php

namespace App\Http\Controllers;

use App\Http\Resources\SpecialityCollection;
use App\Http\Resources\SpecialityResource;
use App\Models\Speciality;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SpecialityController extends Controller
{
    //
    public function index(Request $request)
    {
        return new SpecialityCollection(Speciality::all());
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
                'name' => 'required|string',
                'description' => 'required|string',
            ]);
            $speciality = new Speciality([
                'name' => $request->name,
                'description' => $request->description,
            ]);
            $speciality->save();
            return response()->json([
                'message' => 'Speciality created successfully',
                'speciality' => new SpecialityResource($speciality)
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Speciality not created',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Speciality  $speciality
     * @return \Illuminate\Http\Response
     */
    public function show(Speciality $speciality)
    {
        return new SpecialityResource($speciality);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Speciality  $speciality
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'description' => 'required|string',
            ]);

            $speciality = Speciality::find($id);

            $speciality->update([
                'name' => $request->name,
                'description' => $request->description,
            ]);

            return response()->json([
                'message' => 'Speciality updated successfully',
                'speciality' => new SpecialityResource($speciality)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Speciality not updated',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Speciality  $speciality
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $speciality = Speciality::find($id);
            $speciality->delete();
            return response()->json([
                'message' => 'Speciality deleted successfully',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Speciality not deleted',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
