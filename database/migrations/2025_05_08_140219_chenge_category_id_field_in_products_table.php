<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('category_id');
            $table->foreignId('category_id')
                ->nullable()
                ->references('id')
                ->on('product_categories')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('category_id');
            $table->foreignId('category_id')->nullable()->constrained(table: 'product_categories');

            $table->index('category_id');
        });
    }
};
