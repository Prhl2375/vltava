<?php

use App\Enums\ProductCategoryType;
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
        Schema::table('product_categories', function (Blueprint $table) {
            $table->enum('type', array_column(ProductCategoryType::cases(), 'value'))
                ->default(ProductCategoryType::Menu->value)->index();

            $table->index(['enabled', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_categories', function (Blueprint $table) {
            $table->dropColumn('type');
            $table->dropIndex(['enabled', 'type']);
        });
    }
};
