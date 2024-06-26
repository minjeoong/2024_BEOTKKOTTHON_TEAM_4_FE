import { apiUrl } from '@/hooks/api';
import { LocalStorage, mapTelecom, parseIdentity } from '@/hooks/useUtil';

export async function postSignup(userData) {
  const {
    userName,
    id,
    password,
    identity_first,
    identity_last,
    telecom,
    phoneNumber,
  } = userData;

  const update_identity = parseIdentity(identity_first);
  const mappedTelecom = mapTelecom(telecom);

  const api_params = JSON.stringify({
    userName: userName,
    id: id,
    password: password,
    identity: update_identity.date + identity_last,
    telecom: mappedTelecom,
    phoneNumber: phoneNumber,
  });

  const accessToken = LocalStorage.getItem('accessToken');

  try {
    const res = await fetch(`${apiUrl}/signup`, {
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
    return error;
  }
}
