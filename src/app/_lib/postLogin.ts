import { apiUrl } from '@/hooks/api';
import { mapTelecom, parseIdentity } from '@/hooks/useUtil';

export async function postLogin(props) {
  const { id, password, telecom, phoneNumber } = props;

  const api_params = JSON.stringify({
    id: id,
    password: password,
  });

  console.log(api_params);
  const accessToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0N2FmZmJkOC1hNDY1LTQyNjUtYjE3My1kZDk2YWM2MjNhYWQiLCJpYXQiOjE3MTExMTY0NTEsInJvbGUiOiJST0xFX1VTRVIiLCJleHAiOjE3MTExMjU0NTF9.0IQrGF-jrlfgTZGLOSGtpRVX5JRwVsI73LN6WJTE9fo';
  try {
    const res = await fetch(`${apiUrl}/vaccination`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: api_params,
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error('Error during POST request:', error);
    throw error;
  }
}