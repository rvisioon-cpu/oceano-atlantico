import { redirect } from 'next/navigation';
import { getFloorsData } from '@/app/actions/units';

export default async function PlantasRedirect() {
  const floorsData = await getFloorsData();
  const defaultFloor = floorsData[floorsData.length - 1]?.id || '9';
  redirect(`/plantas/${defaultFloor}`);
}
