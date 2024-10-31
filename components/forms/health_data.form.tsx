'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  healthDataSchema,
  genders,
  physicalActivityLevel,
  alcoholFrequency,
  weightGoal,
  timeSchedule,
  healthDataType,
} from '../../zod/schemas/health_data.zod.schema';
import { Button } from '../ui/button';
import ChipInput from '../ui/chip-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { NumericInput } from '../ui/numeric-input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type HealthDataFormProps = {
  profileFromDb?: healthDataType;
};

function HealthDataForm(props: HealthDataFormProps) {
  const form = useForm<healthDataType>({
    resolver: zodResolver(healthDataSchema),
    defaultValues: props.profileFromDb ?? {},
  });

  const onCustomSubmit = (data: healthDataType) => {
    const saveHealthData = fetch(`/api/profile`, {
      method: 'post',
      body: JSON.stringify(data),
    });

    toast.promise(saveHealthData, {
      loading: 'Working on it...',
      success: () => {
        return 'Got it, ready to go';
      },
      error: 'Something went wrong! Please try again',
    });
  };

  return (
    <Form {...form}>
      <form
        data-testid="client-form"
        onSubmit={form.handleSubmit(onCustomSubmit)}
      >
        <div className="space-y-4">
          <FormField
            name="age"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Age*</FormLabel>
                  <FormControl>
                    <NumericInput name={field.name} formHandler={form} />
                  </FormControl>
                  <FormMessage>
                    We need to know your age to provide you with the best
                  </FormMessage>
                </FormItem>
              );
            }}
          />
          <FormField
            name="gender"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Gender*</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={
                        field.value as unknown as string | undefined
                      }
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder={'Select your gender'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {genders.options.map((value) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="capitalize"
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    We need to know your gender to provide you with the best
                  </FormMessage>
                </FormItem>
              );
            }}
          />

          <FormField
            name="physicalActivityLevel"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Physical Activity Level*</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={
                        field.value as unknown as string | undefined
                      }
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue
                          placeholder={'Select your physical activity level'}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {physicalActivityLevel.options.map((value) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="capitalize"
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    We need to know your physical activity level to provide you
                    with the best
                  </FormMessage>
                </FormItem>
              );
            }}
          />

          <FormField
            name="alcoholFrequency"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Alcohol Frequency*</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={
                        field.value as unknown as string | undefined
                      }
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue
                          placeholder={'Select your alcohol frequency'}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {alcoholFrequency.options.map((value) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="capitalize"
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    We need to know your alcohol frequency to provide you with
                    the best
                  </FormMessage>
                </FormItem>
              );
            }}
          />

          <FormField
            name="weightGoal"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Weight goal*</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={
                        field.value as unknown as string | undefined
                      }
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder={'Select your weight goal'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {weightGoal.options.map((value) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="capitalize"
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    We need to know your weight goal to provide you with the
                    best
                  </FormMessage>
                </FormItem>
              );
            }}
          />

          <FormField
            name="breakFastSchedule"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Regular breakfast schedule</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={
                        field.value as unknown as string | undefined
                      }
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {timeSchedule.options.map((value) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="capitalize"
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    We need to know your weight goal to provide you with the
                    best
                  </FormMessage>
                </FormItem>
              );
            }}
          />

          <FormField
            name="lunchSchedule"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Regular lunch schedule</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={
                        field.value as unknown as string | undefined
                      }
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {timeSchedule.options.map((value) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="capitalize"
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    We need to know your weight goal to provide you with the
                    best
                  </FormMessage>
                </FormItem>
              );
            }}
          />

          <FormField
            name="dinnerSchedule"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Regular dinner schedule</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={
                        field.value as unknown as string | undefined
                      }
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {timeSchedule.options.map((value) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="capitalize"
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    We need to know your weight goal to provide you with the
                    best
                  </FormMessage>
                </FormItem>
              );
            }}
          />

          <FormField
            name="weightKg"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Weight in Kg</FormLabel>
                  <FormControl>
                    <NumericInput name={field.name} formHandler={form} />
                  </FormControl>
                  <FormMessage>
                    We need to know your weight in Kg to provide you with the
                    best
                  </FormMessage>
                </FormItem>
              );
            }}
          />
          <FormField
            name="heightCm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Height in Cm</FormLabel>
                  <FormControl>
                    <NumericInput name={field.name} formHandler={form} />
                  </FormControl>
                  <FormMessage>
                    We need to know your height in Cm to provide you with the
                    best
                  </FormMessage>
                </FormItem>
              );
            }}
          />

          <FormField
            name="bmi"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>BMI</FormLabel>
                  <FormControl>
                    <NumericInput name={field.name} formHandler={form} />
                  </FormControl>
                  <FormMessage>
                    We need to know your height in Cm to provide you with the
                    best
                  </FormMessage>
                </FormItem>
              );
            }}
          />

          <FormField
            name="waistCircumference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waist Circumference (cm)</FormLabel>
                <FormControl>
                  <NumericInput name={field.name} formHandler={form} />
                </FormControl>
                <FormMessage>
                  Waist circumference helps assess health risks.
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="hipCircumference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hip Circumference (cm)</FormLabel>
                <FormControl>
                  <NumericInput name={field.name} formHandler={form} />
                </FormControl>
                <FormMessage>
                  Hip circumference helps in evaluating body fat distribution.
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="exerciseFrequencyPerWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise Frequency per Week in days*</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value as unknown as string | undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={'Select the number of days'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {['0', '1', '2', '3', '4', '5', '6', '7'].map(
                          (value) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="capitalize"
                            >
                              {value}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>
                  Enter how often you exercise for accurate activity insights.
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="sleepHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sleep Hours per Day*</FormLabel>
                <FormControl>
                  <NumericInput name={field.name} formHandler={form} />
                </FormControl>
                <FormMessage>
                  Sleep duration impacts energy levels and overall wellness.
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="mealsPerDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meals per Day*</FormLabel>
                <FormControl>
                  <NumericInput name={field.name} formHandler={form} />
                </FormControl>
                <FormMessage>
                  Let us know your meal frequency for better dietary planning.
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="waterIntakeLiters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Water Intake (Liters)*</FormLabel>
                <FormControl>
                  <NumericInput name={field.name} formHandler={form} />
                </FormControl>
                <FormMessage>
                  Proper hydration is essential for optimal health.
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="chronicConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chronic Conditions</FormLabel>
                <FormControl>
                  <ChipInput
                    value={field.value}
                    name={field.name}
                    formHandler={form}
                  />
                </FormControl>
                <FormMessage>List any chronic conditions you have.</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="allergies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allergies</FormLabel>
                <FormControl>
                  <ChipInput
                    value={field.value}
                    name={field.name}
                    formHandler={form}
                  />
                </FormControl>
                <FormMessage>List any known allergies.</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="medications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medications</FormLabel>
                <FormControl>
                  <ChipInput
                    value={field.value}
                    name={field.name}
                    formHandler={form}
                  />
                </FormControl>
                <FormMessage>
                  List any medications you are currently taking.
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="supplements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplements</FormLabel>
                <FormControl>
                  <ChipInput
                    value={field.value}
                    name={field.name}
                    formHandler={form}
                  />
                </FormControl>
                <FormMessage>
                  List any supplements you regularly use.
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="frequentFoods"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequent Foods</FormLabel>
                <FormControl>
                  <ChipInput
                    value={field.value}
                    name={field.name}
                    formHandler={form}
                  />
                </FormControl>
                <FormMessage>List foods you frequently consume.</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="foodPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Preferences</FormLabel>
                <FormControl>
                  <ChipInput
                    value={field.value}
                    name={field.name}
                    formHandler={form}
                  />
                </FormControl>
                <FormMessage>
                  Specify any dietary preferences or restrictions.
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="specificHealthGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Health Goals</FormLabel>
                <FormControl>
                  <ChipInput
                    value={field.value}
                    name={field.name}
                    formHandler={form}
                  />
                </FormControl>
                <FormMessage>
                  List any specific health goals you want to achieve.
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="otherBeverages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Beverages</FormLabel>
                <FormControl>
                  <ChipInput
                    value={field.value}
                    name={field.name}
                    formHandler={form}
                  />
                </FormControl>
                <FormMessage>
                  List other beverages you regularly consume (e.g., coffee,
                  tea).
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="digestiveIssues"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Digestive Issues</FormLabel>
                <FormControl>
                  <ChipInput
                    value={field.value}
                    name={field.name}
                    formHandler={form}
                  />
                </FormControl>
                <FormMessage>
                  List any digestive issues you frequently experience.
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-8" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}

export default HealthDataForm;
