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
            "title" => fake()->sentence(),
            "description" => fake()->paragraph(),
            "start_date" => fake()->dateTime("now"),
            "end_date" => fake()->dateTime("+30 minutes"),
            "client_id" => 1,
            "doctor_id" => 2,

        ];
    }
}
