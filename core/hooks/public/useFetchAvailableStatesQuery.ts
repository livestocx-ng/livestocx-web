import { useQuery } from '@tanstack/react-query';
import { addressHelperApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';

export default function useFetchAvailableStatesQuery() {
  const { availableStates, setAvailableStates } = useAppContext();

  return useQuery({
    queryKey: ['get-available-states'],
    queryFn: async () => {
      if (availableStates?.length > 0) {
        return availableStates;
      }

      const response = await addressHelperApi.addressHelperControllerGetAvailableStates();

      const data = response.data;

      setAvailableStates(data);

      return data;
    },
  });
}
