import axios from 'axios';
import { Metadata, ResolvingMetadata } from 'next';
import { formatBlogSlug } from '@/core/middlewares/slug-formatter';

interface BlogDescriptionLayoutProps {
	params: Promise<{ blogId: string }>; // Typed as a Promise
	children: React.ReactNode;
}

export async function generateMetadata(
	{ params }: BlogDescriptionLayoutProps,
	_parent: ResolvingMetadata
): Promise<Metadata> {
	const resolvedParams = await params;
	const rawId = resolvedParams.blogId;
	const formattedBlogId = rawId.includes('_') ? rawId.split('_').pop() : rawId;

	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/admin/fetch-blog?blogId=${formattedBlogId}`
		);

		const blogData = data?.data;
		if (!blogData) return { title: "Blog | Livestocx" };

		const title = String(blogData.title);
		const description = String(blogData.description || "").slice(0, 160);
		const imageUrl = String(blogData.imageUrl || "");
		const slug = formatBlogSlug(blogData);

		return {
			title: `Blog - ${title}`,
			description: `${description}...`,
			openGraph: {
				title,
				description,
				url: `https://livestocx.com/blog/${slug}`,
				images: imageUrl ? [{ url: imageUrl }] : [],
			},
			twitter: {
				card: 'summary_large_image',
				title,
				images: imageUrl ? [imageUrl] : [],
			}
		};
	} catch (error) {
		return { title: "Blog | Livestocx" };
	}
}

export default async function RootLayout({ children }: BlogDescriptionLayoutProps) {
	return <>{children}</>;
}