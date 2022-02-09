<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

use Faker\Factory as Faker;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $admin = User::create([
            'name' => 'Uphill',
            'email' => 'admin@uphill.com',
            'password' =>'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ]);

        User::factory(5)->create();

        $images = Storage::disk('public')->files();

        $url = env('APP_URL');

        for($i = 1; $i < count($images); $i++){
            Vehicle::create([
                'name' => $faker->name(),
                'year' => $faker->year($max = 'now'),
                'model' => $faker->ean13(),
                'photo' => $url . '/storage/' . $images[$i],
                'avg' => $faker->numberBetween($min = 5, $max = 25),
                'make' => $faker->company()
            ]);
        }
                
    }
}
