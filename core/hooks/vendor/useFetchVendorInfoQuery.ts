import { useQuery } from '@tanstack/react-query';
import { vendorProfileApi } from '@/core/api/sdk';
import { useAppContext } from '../../context';

export default function useFetchVendorInfoQuery() {
  const { authToken, setVendorInfo } = useAppContext();

  return useQuery({
    queryKey: ['initialize-vendor-info'],
    queryFn: async () => {
      if (!authToken) {
        return;
      }

      const { data } = await vendorProfileApi.vendorProfileControllerFetchVendorProfile();

      setVendorInfo(data);

      return data;
    },
    enabled: !!authToken,
  });
}
