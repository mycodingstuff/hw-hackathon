CREATE TABLE IF NOT EXISTS "health_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"age" integer,
	"gender" varchar(10),
	"weight_kg" numeric,
	"height_cm" numeric,
	"bmi" numeric,
	"waist_circumference" numeric,
	"hip_circumference" numeric,
	"chronic_conditions" varchar(255),
	"allergies" varchar(255),
	"medications" varchar(255),
	"supplements" varchar(255),
	"physical_activity_level" varchar(50),
	"exercise_frequency_per_week" integer,
	"sleep_hours" numeric,
	"stress_level" varchar(50),
	"meal_schedule" varchar(255),
	"meals_per_day" integer,
	"frequent_foods" varchar(255),
	"alcohol_frequency" varchar(50),
	"food_preferences" varchar(255),
	"portion_control" boolean,
	"weight_goal" varchar(50),
	"body_composition_goal" varchar(50),
	"specific_health_goals" varchar(255),
	"water_intake_liters" numeric,
	"other_beverages" varchar(255),
	"digestive_issues" varchar(255),
	"energy_level" varchar(50),
	"appetite" varchar(50)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "health_data" ADD CONSTRAINT "health_data_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
