import axios from 'axios';
import { useAppContext } from '../../context';
import { useQuery } from '@tanstack/react-query';

export default function useInitializeAuthTokenQuery() {
  const { authToken, setAuthToken } = useAppContext();

  return useQuery({
    queryKey: ['initialize-auth-token'],
    queryFn: async () => {
      if (authToken?.length > 0) {
        // console.log('[INITIALIZE-AUTH-TOKEN-SUCCESS]');

        return;
      }

      const cookie = await axios.get('/api/auth/fetch-cookies');

      // console.log('[INITIALIZE-AUTH-TOKEN-PAYLOAD] :: ', cookie);

      if (cookie.data) {
        // console.log('[INITIALIZE-AUTH-TOKEN-PAYLOAD] :: ', cookie.data);

        setAuthToken(cookie.data.bearerToken);
      }
    },
  });
}
