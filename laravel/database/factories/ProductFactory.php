<?php

namespace Database\Factories;

use App\Models\Product\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Domains\Product\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'slug' => fake()->unique()->slug(3),
            'price' => fake()->numberBetween(100, 10000),
            'stock' => fake()->numberBetween(0, 100),
            'description' => fake()->paragraphs(3, true),
            'enabled' => fake()->boolean(80), // 80% chance of being true
            'created_at' => fake()->dateTimeBetween('-1 year'),
            'updated_at' => function (array $attributes) {
                return fake()->dateTimeBetween($attributes['created_at']);
            },
        ];
    }
}
