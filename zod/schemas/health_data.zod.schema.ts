import { z } from 'zod';

export const genders = z.enum(['male', 'female']);
export const physicalActivityLevel = z.enum(['low', 'moderate', 'high']);
export const stressLevel = z.enum(['low', 'moderate', 'high']);
export const alcoholFrequency = z.enum([
  'never',
  'rare',
  'moderate',
  'frequent',
]);
export const weightGoal = z.enum(['maintain', 'gain', 'lose']);
export const energyLevel = z.enum(['low', 'moderate', 'high']);

export const timeSchedule = z.enum([
  '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM',
  '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM',
  '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
]);


export const healthDataSchema = z.object({
  age: z.number().min(0),
  gender: genders,
  weightKg: z.number().min(0),
  heightCm: z.number().min(0),
  bmi: z.number().min(0).optional(),
  waistCircumference: z.number().min(0).optional(),
  hipCircumference: z.number().min(0).optional(),
  chronicConditions: z
    .string()
    .transform((t) => t.split(','))
    .optional(),
  allergies: z
    .string()
    .transform((t) => t.split(','))
    .optional(),
  medications: z
    .string()
    .transform((t) => t.split(','))
    .optional(),
  supplements: z
    .string()
    .transform((t) => t.split(','))
    .optional(),
  physicalActivityLevel,
  exerciseFrequencyPerWeek: z.string().optional(),
  sleepHours: z.number().min(0).max(24),

  breakFastSchedule: timeSchedule,
  lunchSchedule: timeSchedule,
  dinnerSchedule: timeSchedule,
  mealsPerDay: z.number().min(1).max(6),
  frequentFoods: z
    .string()
    .transform((t) => t.split(','))
    .optional(),
  alcoholFrequency,
  foodPreferences: z
    .string()
    .transform((t) => t.split(','))
    .optional(),  
  weightGoal,  
  specificHealthGoals: z
    .string()
    .transform((t) => t.split(','))
    .optional(),
  waterIntakeLiters: z.number().min(0),
  otherBeverages: z
    .string()
    .transform((t) => t.split(','))
    .optional(),
  digestiveIssues: z
    .string()
    .transform((t) => t.split(','))
    .optional()  
});

export type healthDataType = z.infer<typeof healthDataSchema>;