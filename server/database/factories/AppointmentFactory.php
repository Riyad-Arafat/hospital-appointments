<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            //
            "name" => fake()->sentence(),
            "description" => fake()->paragraph(),
            "date" => fake()->dateTime("now"),
            "client_id" => 1,
            "doctor_id" => 2,
        ];
    }
}
