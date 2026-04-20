<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $fillable = [
        "name",
        "address",
        "phone",
        "email",
        "opens_at",
        "closes_at",
        "video_guide",
        "logo",
        "favicon"
    ];

    public static function getInstance(): static
    {
        return static::first();
    }

    protected static function booted(): void
    {
        static::creating(function () {
            if (static::exists()) {
                throw new \RuntimeException('Only one About record is allowed.');
            }
        });
    }
}
