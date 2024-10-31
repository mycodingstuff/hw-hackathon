import { notFound } from 'next/navigation';

import { auth } from '@/app/(auth)/auth';
import HealthDataForm from '@/components/forms/health_data.form';
import { getHealthData } from '@/db/health_data.queries';

export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const { id } = params;
  const profileFromDb = await getHealthData(id);

  const session = await auth();

  if (!session || !session.user) {
    return notFound();
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <h2 className="text-2xl mb-5">Your Profile</h2>
        <HealthDataForm profileFromDb={profileFromDb} />
      </div>
    </div>
  );
}
