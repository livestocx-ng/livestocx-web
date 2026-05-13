'use client';

import React, { use } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
	Box,
	Container,
	Title,
	Text,
	Stack,
	Skeleton,
	Divider,
	Badge,
	Group,
	ActionIcon,
	rem,
	Image as MantineImage
} from '@mantine/core';
import { ChevronLeft, Calendar, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

import { formatBlogSlug } from '@/core/middlewares/slug-formatter';
import useFetchBlogFeedItemQuery from '@/core/hooks/public/useFetchBlogFeedItemQuery';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAppContext } from '@/core/context';

interface BlogDetailsPageParams {
	params: Promise<{
		blogId: string;
	}>;
}

const BlogDetailsPage = ({ params }: BlogDetailsPageParams) => {
	const { blogId: rawBlogId } = use(params);
	const { blogFeedItem } = useAppContext();

	const formattedBlogId = rawBlogId.includes('_')
		? rawBlogId.split('_').pop()
		: rawBlogId;

	const { data: blog, isLoading: loading } = useFetchBlogFeedItemQuery(Number(formattedBlogId), {
		enabled: !blogFeedItem || blogFeedItem.id !== formattedBlogId,
		initialData: (blogFeedItem && blogFeedItem.id === formattedBlogId) ? blogFeedItem : undefined
	});

	const formattedDate = blog?.createdAt ? dayjs(blog.createdAt).format('MMMM D, YYYY') : 'Nov 29, 2024';

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
								description: blog?.subDescription,
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

			<Box component="main" bg="white">
				{/* 1. HERO SECTION (Privacy Policy Style) */}
				<Box
					pos="relative"
					pt={{ base: 100, md: 160 }}
					pb={{ base: 80, md: 120 }}
					style={{
						backgroundColor: '#0A1711',
						overflow: 'hidden',
					}}
				>
					{/* Background Image with Blending */}
					{!loading && blog?.imageUrl && (
						<Box
							pos="absolute"
							inset={0}
							style={{
								backgroundImage: `url(${blog.imageUrl})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								transform: 'scale(1.05)',
							}}
						/>
					)}

					{/* Sophisticated Gradient Overlay */}
					<Box
						pos="absolute"
						inset={0}
						style={{
							background: `
								linear-gradient(to right, rgba(10, 23, 17, 0.85) 0%, rgba(10, 23, 17, 0.4) 0%, rgba(10, 23, 17, 0.2) 100%),
								linear-gradient(to bottom, rgba(10, 23, 17, 0) 100%, #0A1711 100%)
							`,
						}}
					/>

					{/* Subtle Grid Background */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							backgroundImage: `
								linear-gradient(#ffffff08 1px, transparent 1px),
								linear-gradient(90deg, #ffffff08 1px, transparent 1px)
							`,
							backgroundSize: '40px 40px',
							backgroundPosition: 'center center',
							pointerEvents: 'none',
							zIndex: 1,
						}}
					/>

					<Container size="lg" pos="relative" style={{ zIndex: 2 }}>
						<Stack gap="xl">
							<Link href="/blog" style={{ textDecoration: 'none' }}>
								<Group gap={5} c="green.4" className="hover:text-green-300 transition-colors">
									<ChevronLeft size={16} />
									<Text size="sm" fw={600} style={{ textTransform: 'uppercase', letterSpacing: rem(1) }}>
										Back to Blog
									</Text>
								</Group>
							</Link>

							<Stack gap="md">
								{loading ? (
									<Skeleton height={20} width={100} />
								) : (
									<Badge
										variant="outline"
										size="lg"
										radius="sm"
										styles={{
											root: {
												backgroundColor: '#4ade8015',
												border: '1px solid #4ade8040',
												color: '#4ade80',
												textTransform: 'uppercase',
												fontWeight: 600,
											},
										}}
									>
										Article
									</Badge>
								)}

								<Title
									order={1}
									c="white"
									style={{ fontSize: rem(48), fontWeight: 800, lineHeight: 1.2 }}
									maw={900}
								>
									{loading ? <Skeleton height={50} width="80%" /> : blog?.title}
								</Title>

								<Group gap="xl" mt="md">
									<Group gap="xs">
										<Calendar size={16} color="#9ca3af" />
										<Text c="gray.4" size="sm">{loading ? <Skeleton height={15} width={80} /> : formattedDate}</Text>
									</Group>
									<Group gap="xs">
										<User size={16} color="#9ca3af" />
										<Text c="gray.4" size="sm">Livestocx Team</Text>
									</Group>
									<Group gap="xs">
										<Clock size={16} color="#9ca3af" />
										<Text c="gray.4" size="sm">5 min read</Text>
									</Group>
								</Group>
							</Stack>
						</Stack>
					</Container>
				</Box>

				{/* 2. MAIN CONTENT AREA */}
				<Box py={80}>
					<Container size="md">
						<Stack gap={60}>
							{/* Blog Articles / Sections */}
							<Stack gap={60}>
								{blog?.articles.map((article, index) => (
									<motion.div
										key={article.id}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
									>
										<Stack gap="xl">
											<Title order={2} size={rem(32)} fw={800} c="dark.9" style={{ lineHeight: 1.3 }}>
												{article.title}
											</Title>

											{article.imageUrl && (
												<Box style={{ overflow: 'hidden' }}>
													<MantineImage
														src={article.imageUrl}
														alt={article.title}
														radius="md"
														fit="cover"
														height={400}
													/>
												</Box>
											)}

											<Box>
												<ReactMarkdown
													remarkPlugins={[remarkGfm]}
													components={{
														h1: ({ node, ...props }) => <Title order={1} mb="md" {...props} />,
														h2: ({ node, ...props }) => <Title order={2} size="h3" mb="md" {...props} />,
														p: ({ node, ...props }) => <Text size="xl" lh={1.8} c="gray.8" mb="md" style={{ whiteSpace: 'pre-wrap' }} {...props} />,
														ul: ({ node, ...props }) => <Box component="ul" style={{ paddingLeft: rem(20), marginBottom: rem(16) }} {...props} />,
														li: ({ node, children, ...props }) => (
															<Box component="li" style={{ marginBottom: rem(8) }} {...props}>
																<Text size="xl" lh={1.8} c="gray.8">{children}</Text>
															</Box>
														),
														strong: ({ node, ...props }) => <Text component="strong" fw={700} {...props} />,
													}}
												>
													{article.description}
												</ReactMarkdown>
											</Box>
										</Stack>
										{index !== blog.articles.length - 1 && <Divider mt={60} variant="dashed" />}
									</motion.div>
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

