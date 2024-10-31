import { count, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { healthDataType } from '@/zod/schemas/health_data.zod.schema';

import { healthData, HealthData } from './schema';

let client = postgres(`${process.env.POSTGRES_URL!}`);
let db = drizzle(client);

export async function saveHealthData(data: HealthData) {
  try {
        
    const existingData = await db
      .select({
        count: count(),
      })
      .from(healthData)
      .where(eq(healthData.userId, data.userId));

    if (existingData.length > 0 && existingData[0].count > 0) {
      return await db
        .update(healthData)
        .set(data)
        .where(eq(healthData.userId, data.userId));
    }

    return await db.insert(healthData).values(data);
  } catch (error) {
    console.error('Failed to save health data in database', error);
    throw error;
  }
}

export async function getHealthData(
  userId: string
): Promise<healthDataType | undefined> {
  try {
    const data = await db
      .select({
        age: healthData.age,
        gender: healthData.gender,
        weightKg: healthData.weightKg,
        heightCm: healthData.heightCm,
        bmi: healthData.bmi,
        waistCircumference: healthData.waistCircumference,
        hipCircumference: healthData.hipCircumference,
        chronicConditions: healthData.chronicConditions,
        allergies: healthData.allergies,
        medications: healthData.medications,
        supplements: healthData.supplements,
        physicalActivityLevel: healthData.physicalActivityLevel,
        exerciseFrequencyPerWeek: healthData.exerciseFrequencyPerWeek,
        sleepHours: healthData.sleepHours,
        breakFastSchedule: healthData.breakFastSchedule,
        lunchSchedule: healthData.lunchSchedule,
        dinnerSchedule: healthData.dinnerSchedule,
        mealsPerDay: healthData.mealsPerDay,
        frequentFoods: healthData.frequentFoods,
        alcoholFrequency: healthData.alcoholFrequency,
        foodPreferences: healthData.foodPreferences,
        weightGoal: healthData.weightGoal,
        specificHealthGoals: healthData.specificHealthGoals,
        waterIntakeLiters: healthData.waterIntakeLiters,
        otherBeverages: healthData.otherBeverages,
        digestiveIssues: healthData.digestiveIssues,
      })
      .from(healthData)
      .where(eq(healthData.userId, userId));

    return data.length > 0 ? (data[0] as unknown as healthDataType) : undefined;
  } catch (error) {
    console.error('Failed to get health data from database', error);
    throw error;
  }
}
