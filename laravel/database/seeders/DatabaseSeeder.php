<?php

namespace Database\Seeders;

use App\Models\Product\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (User::exists()) {
            return;
        }
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin'),
            'role' => 'admin'
        ]);
        DB::table('users')->insert([
            'name' => 'moderator',
            'email' => 'moderator@gmail.com',
            'password' => Hash::make('moderator'),
            'role' => 'moderator'
        ]);
    }
}
