<?php

namespace App\Http\Controllers\Api;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;

class VehiclesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Vehicle::all(),200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
      
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
 
        Vehicle::create([
            'name' => $request->name,
            'year' => $request->year,
            'make' => $request->make,
            'model' => $request->model,
            'avg' => $request->avg,
            'photo' => $request->photo
        ]);
        return response()->json(['message' => 'Vehicle created with success'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Vehicle::find($id), 200);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        

        $this->validate($request, [
            'name' => 'required|max:255',
            'year' => 'required',
            'make' => 'required|max:255',
            'model' => 'required|numeric',
            'avg' => 'required|numeric',
            'photo' => 'required|max:255',
        ]);

        Vehicle::where('id', $id)->update([
            'name' => $request->name,
            'year' => $request->year,
            'make' => $request->make,
            'model' => $request->model,
            'avg' => $request->avg,
            'photo' => $request->photo
        ]);
        return response()->json(['message' => 'Vehicle updated with success'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Vehicle::find($id);
        $item->delete();
        return response()->json(['message' => 'Vehicle deleted with success'],200);
    }
}
