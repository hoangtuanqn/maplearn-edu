<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $limit = (int)($request->limit ?? 200);
        // dd($limit);
        $users = QueryBuilder::for(User::class)
            ->select(['id', 'full_name', 'avatar', 'role', 'gender'])
            ->allowedFilters([
                AllowedFilter::callback('role', function ($query, $value) {
                    if ($value !== 'teacher') {
                        abort(400, "You can only filter by role=teacher.");
                    } else {
                        $query->where('role', 'teacher');
                    }
                    // Nếu không phải 'teacher', thì không lọc gì cả
                }),
            ])

            ->get();

        return response()->json($users, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
