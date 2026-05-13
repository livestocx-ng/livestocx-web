import { blogsApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { useQuery } from '@tanstack/react-query';

export default function useFetchBlogFeedQuery() {
  const { setBlogFeed } = useAppContext();

  return useQuery({
    queryKey: ['get-blog-feed'],
    queryFn: async () => {
      const response = await blogsApi.blogControllerFetchBlogFeed();

      const data = response.data;

      setBlogFeed(data);

      return data;
    },
  });
}
