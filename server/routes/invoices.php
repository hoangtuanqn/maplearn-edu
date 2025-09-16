<?php

use App\Http\Controllers\InvoiceController;
use Illuminate\Support\Facades\Route;

Route::apiResource('invoices', InvoiceController::class)->middleware('auth.jwt');
Route::middleware('auth.jwt')->group(function () {
    Route::prefix('invoices')->group(function () {
        Route::post('/{invoice}/cancel', [InvoiceController::class, 'cancel']);
    });
});
// Cancel Invoice
