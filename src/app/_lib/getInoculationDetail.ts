import { apiDevUrl, apiUrl } from '@/hooks/api';
import { LocalStorage, mapTelecom, parseIdentity } from '@/hooks/useUtil';

export async function getInoculationDetail(type: string, vaccineId: string) {
  const api_params = JSON.stringify({
    vaccineId: vaccineId,
  });

  const accessToken = LocalStorage.getItem('accessToken');

  try {
    const res = await fetch(`${apiDevUrl}/inoculation/detail?type=${type}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: api_params,
      cache: 'no-store',
    });

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error('Error during POST request:', error);
    throw error;
  }
}
