'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NextImage from 'next/image';
import Head from 'next/head';
import {
	Box,
	Container,
	Title,
	Text,
	Image,
	Stack,
	AspectRatio,
	Skeleton,
	Divider
} from '@mantine/core';

import { BlogItem } from '@/core/types/types';
import { Footer } from '@/core/components/navigation/footer';
import { Navbar } from '@/core/components/navigation/navbar';
import { formatBlogSlug } from '@/core/middlewares/slug-formatter';

interface BlogDetailsPageParams {
	params: {
		blogId: string;
	};
}

const BlogDetailsPage = ({ params }: BlogDetailsPageParams) => {
	const [blog, setBlog] = useState<BlogItem | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchBlogDescription = async () => {
		try {
			if (blog) return;


			const resolvedParams = await params;
			const rawBlogId = resolvedParams.blogId;

			const formattedBlogId = rawBlogId.includes('_')
				? rawBlogId.split('_').pop()
				: rawBlogId;

			console.log(`I want to see this blog ID self ::`, formattedBlogId);

			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/fetch-blog?blogId=${formattedBlogId}`
				// `https://livestocx.xyz/api/v1/admin/fetch-blog?blogId=${formattedBlogId}`
			);
			setBlog(data?.data ?? null);
		} catch (error) {
			console.error('[FETCH-BLOG-ERROR] :: ', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBlogDescription();
	}, []);

	return (
		<>
			{blog && (
				<Head>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'BlogPosting',
								mainEntityOfPage: {
									'@type': 'WebPage',
									'@id': `https://livestocx.com/blog/${formatBlogSlug(blog)}`,
								},
								headline: blog?.title,
								description: blog?.description,
								image: [blog?.imageUrl],
								author: {
									'@type': 'Organization',
									name: 'Livestocx',
								},
								publisher: {
									'@type': 'Organization',
									name: 'Livestocx',
									logo: {
										'@type': 'ImageObject',
										url: 'https://livestocx.com/logo.png',
									},
								},
								dateModified: new Date().toISOString(),
							}),
						}}
					/>
				</Head>
			)}



			<Box component="main">
				{/* Hero Header Section */}
				<Box
					className="bg-blog bg-cover"
					style={{
						backgroundColor: '#28312B',
						minHeight: '280px',
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<Container size="lg" w="100%">
						<Title
							order={1}
							c="white"
							size="h1"
							fw={600}
							style={{ maxWidth: '800px' }}
						>
							{loading ? <Skeleton height={40} width="60%" /> : (blog?.title || 'Blog')}
						</Title>
					</Container>
				</Box>

				{/* Main Content Area */}
				<Box bg="white" py={60}>
					<Container size="lg">
						<Stack gap={50}>

							{/* Featured Image */}
							<Box pos="relative">
								{loading ? (
									<Skeleton height={450} radius="md" />
								) : (
									<img
										src={blog?.imageUrl ?? '/icons/icon_clif.jpg'}
										alt={blog?.title || 'Livestocx Blog'}
										height={500}
										width={1200}
										style={{
											borderRadius: '12px',
											objectFit: 'cover',
											width: '100%',
											height: '500px'
										}}
									/>
								)}
							</Box>

							{/* Blog Articles / Sections */}
							<Stack gap={60}>
								{blog?.articles.map((article, index) => (
									<Box key={article.id}>
										<Stack gap="xl">
											<Title order={2} size="h3" fw={700} c="dark.4">
												{article.title}
											</Title>

											{article.imageUrl && (
												<Box w={{ base: '100%', md: '70%' }}>
													<img
														src={article.imageUrl}
														alt={article.title}
														style={{
															borderRadius: '12px',
															objectFit: 'cover',
															width: '100%',
															height: '500px'
														}}
													/>
												</Box>
											)}

											<Text
												size="lg"
												lh={1.8}
												c="gray.8"
												style={{ whiteSpace: 'pre-wrap' }}
											>
												{article.description}
											</Text>
										</Stack>
										{index !== blog.articles.length - 1 && <Divider mt={60} variant="dashed" />}
									</Box>
								))}
							</Stack>
						</Stack>
					</Container>
				</Box>
			</Box>

		</>
	);
};

export default BlogDetailsPage;

