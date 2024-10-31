import { auth } from '@/app/(auth)/auth';
import { getHealthData, saveHealthData } from '@/db/health_data.queries';

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json('Unauthorized!', { status: 401 });
  }

  const data = await getHealthData(session.user.id!);
  return Response.json(data || {});
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json('Unauthorized!', { status: 401 });
  }

  const body = await request.json();

  const data = await saveHealthData({
    userId: session.user.id!,
    ...body,
  });
  return Response.json(data);
}
