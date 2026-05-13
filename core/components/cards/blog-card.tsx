import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BlogInfo } from '@/core/sdk/communication';
import { formatBlogSlug } from '@/core/middlewares/slug-formatter';
import { Image, Text, Stack, Group, Title, Avatar, Button, rem, Box } from '@mantine/core';
import dayjs from 'dayjs';
import { useAppContext } from '@/core/context';

interface BlogCardProps {
	blog: BlogInfo;
	isAdmin?: boolean;
	onEdit?: (blog: BlogInfo) => void;
}

const BlogCard = ({ blog }: BlogCardProps) => {
	const slug = formatBlogSlug(blog);
	const { setBlogFeedItem } = useAppContext();

	const truncatedText = blog?.subDescription
		? blog.subDescription.length > 150
			? `${blog.subDescription.slice(0, 150)}...`
			: blog.subDescription
		: '';

	const formattedDate = blog.createdAt ? dayjs(blog.createdAt).format('MMM D, YYYY') : 'Nov 29, 2024';

	return (
		<Stack gap="md" style={{ height: '100%' }}>
			<Link
				href={`/blog/${slug}`}
				style={{ display: 'block' }}
				onClick={() => setBlogFeedItem(blog)}
			>
				<Image
					src={blog.imageUrl}
					height={280}
					alt={blog.title}
					fit="cover"
					radius={0}
				/>
			</Link>

			<Stack gap="xs" style={{ flex: 1 }}>
				<Group gap="sm">
					{/* <Avatar 
						src={null} 
						size="sm" 
						radius="xl" 
						color="green.9"
					>
						{blog?.title?.charAt(0) || 'B'}
					</Avatar> */}
					<Group gap={4}>
						<Text size="xs" fw={600} c="dark.4">Author</Text>
						<Text size="xs" c="dimmed">{formattedDate}</Text>
					</Group>
				</Group>

				<Link
					href={`/blog/${slug}`}
					style={{ textDecoration: 'none' }}
					onClick={() => setBlogFeedItem(blog)}
				>
					<Title
						order={3}
						size={rem(24)}
						fw={700}
						lh={1.3}
						c="dark.9"
						className="hover:text-green-800 transition-colors"
						lineClamp={2}
					>
						{blog.title}
					</Title>
				</Link>

				<Text size="sm" c="dimmed" lh={1.6} lineClamp={4}>
					{truncatedText}
				</Text>
			</Stack>

			<Box>
				<Button
					component={Link}
					href={`/blog/${slug}`}
					onClick={() => setBlogFeedItem(blog)}
					variant="filled"
					color="gray.0"
					c="dark.8"
					radius={0}
					size="md"
					px="xl"
					fw={600}
					rightSection={<ChevronRight size={14} />}
					styles={{
						root: {
							backgroundColor: '#f8f9fa',
							'&:hover': {
								backgroundColor: '#f1f3f5'
							}
						},
						label: {
							textTransform: 'uppercase',
							letterSpacing: rem(1)
						}
					}}
				>
					Read More
				</Button>
			</Box>
		</Stack>
	);
};

export default BlogCard;