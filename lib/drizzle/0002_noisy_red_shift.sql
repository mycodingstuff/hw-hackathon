ALTER TABLE "health_data" ADD COLUMN "breakFastSchedule" varchar(255);--> statement-breakpoint
ALTER TABLE "health_data" ADD COLUMN "lunchSchedule" varchar(255);--> statement-breakpoint
ALTER TABLE "health_data" ADD COLUMN "dinnerSchedule" varchar(255);--> statement-breakpoint
ALTER TABLE "health_data" DROP COLUMN IF EXISTS "stress_level";--> statement-breakpoint
ALTER TABLE "health_data" DROP COLUMN IF EXISTS "meal_schedule";--> statement-breakpoint
ALTER TABLE "health_data" DROP COLUMN IF EXISTS "portion_control";--> statement-breakpoint
ALTER TABLE "health_data" DROP COLUMN IF EXISTS "body_composition_goal";--> statement-breakpoint
ALTER TABLE "health_data" DROP COLUMN IF EXISTS "energy_level";--> statement-breakpoint
ALTER TABLE "health_data" DROP COLUMN IF EXISTS "appetite";