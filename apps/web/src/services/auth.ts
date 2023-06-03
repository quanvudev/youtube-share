import axios from '../plugins/axios';

export function SignIn(payload: { email: string; password: string }) {
  return axios
    .post<{
      accessToken: string;
      user: {
        id: number;
        email: string;
      };
    }>('/auth', payload)
    .then((r) => r.data);
}
