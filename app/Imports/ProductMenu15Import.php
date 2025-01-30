<?php

namespace App\Imports;

use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToCollection;

class ProductMenu15Import implements ToCollection
{
    public function collection(Collection $rows): void
    {
        $rows->shift();
        foreach($rows as $row){
            if($row[4]){
                $price = preg_replace('/[^\d.]/', '', $row[4]);
            }else{
                $price = preg_replace('/[^\d.]/', '', $row[2]);
            }
            if($row[2]){
                Product::create([
                    'name' => $row[1],
                    'slug' => Str::slug($row[1]),
                    'price' => $price,
                ]);
            }
        }
    }
}
