import { blogsApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { BlogInfo } from '@/core/sdk/communication';

export default function useFetchBlogFeedItemQuery(blogId: number, options?: Partial<UseQueryOptions<BlogInfo>>) {
  const { setBlogFeedItem } = useAppContext();

  return useQuery({
    queryKey: ['get-blog-feed', blogId],
    queryFn: async () => {
      const response = await blogsApi.blogControllerFetchBlogInfo(blogId);

      const data = response.data;

      setBlogFeedItem(data);

      return data;
    },
    ...options
  });
}
