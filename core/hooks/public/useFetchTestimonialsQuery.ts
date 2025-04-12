import { useQuery } from '@tanstack/react-query';
import { testimonialsApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { TestimonialInfo } from '@/core/sdk/communication';

export default function useFetchTestimonialsQuery() {
  const { testimonials, setTestimonials } = useAppContext();

  return useQuery({
    queryKey: ['get-testimonials'],
    queryFn: async (): Promise<TestimonialInfo[]> => {
      if (testimonials.length > 0) {
        return testimonials;
      }

      const response = await testimonialsApi.testimonialControllerFetchTestimonialsFeed();
      const data = response.data || [];
      setTestimonials(data);
      return data;
    },
  });
}
