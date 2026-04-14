<?php
namespace App\Imports;

use App\Models\Product\Product;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToCollection;


class ProductBarMenuImport implements ToCollection
{
    public function collection(Collection $rows): void
    {
        $rows->shift();
        foreach($rows as $row) {
            if($row[2]){
                Product::create([
                    'name' => $row[2],
                    'description' => $row[3]
                ])->variants()->create([
                    'price' => preg_replace('/[^\d.]/', '', $row[1]),
                ]);
            }
        }
    }
}
