import { Message } from 'ai';
import { InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  integer,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core';

export const user = pgTable('User', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable('Chat', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  createdAt: timestamp('createdAt').notNull(),
  messages: json('messages').notNull(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id),
});

export type Chat = Omit<InferSelectModel<typeof chat>, 'messages'> & {
  messages: Array<Message>;
};

export const healthData = pgTable('health_data', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id),
  age: integer('age'),
  gender: varchar('gender', { length: 10 }),
  weightKg: decimal('weight_kg'),
  heightCm: decimal('height_cm'),
  bmi: decimal('bmi'),
  waistCircumference: decimal('waist_circumference'),
  hipCircumference: decimal('hip_circumference'),
  chronicConditions: varchar('chronic_conditions', { length: 255 }), // Comma-separated list
  allergies: varchar('allergies', { length: 255 }), // Comma-separated list
  medications: varchar('medications', { length: 255 }), // Comma-separated list
  supplements: varchar('supplements', { length: 255 }), // Comma-separated list
  physicalActivityLevel: varchar('physical_activity_level', { length: 50 }),
  exerciseFrequencyPerWeek: integer('exercise_frequency_per_week'),
  sleepHours: decimal('sleep_hours'),
  stressLevel: varchar('stress_level', { length: 50 }),
  mealSchedule: varchar('meal_schedule', { length: 255 }), // Comma-separated list
  mealsPerDay: integer('meals_per_day'),
  frequentFoods: varchar('frequent_foods', { length: 255 }), // Comma-separated list
  alcoholFrequency: varchar('alcohol_frequency', { length: 50 }),
  foodPreferences: varchar('food_preferences', { length: 255 }), // Comma-separated list
  portionControl: boolean('portion_control'),
  weightGoal: varchar('weight_goal', { length: 50 }),
  bodyCompositionGoal: varchar('body_composition_goal', { length: 50 }),
  specificHealthGoals: varchar('specific_health_goals', { length: 255 }), // Comma-separated list
  waterIntakeLiters: decimal('water_intake_liters'),
  otherBeverages: varchar('other_beverages', { length: 255 }), // Comma-separated list
  digestiveIssues: varchar('digestive_issues', { length: 255 }), // Comma-separated list
  energyLevel: varchar('energy_level', { length: 50 }),
  appetite: varchar('appetite', { length: 50 }),
});

export type HealthData = InferSelectModel<typeof healthData>;
