'use client';

import React, { useEffect } from 'react';
import { useAppContext } from '@/core/context';
import BlogCard from '@/core/components/cards/blog-card';
import { 
  Box, 
  Container, 
  Stack, 
  Text, 
  Title, 
  Badge, 
  SimpleGrid,
  rem 
} from '@mantine/core';
import useFetchBlogFeedQuery from '@/core/hooks/public/useFetchBlogFeedQuery';

const BlogPage = () => {
	const { blogFeed } = useAppContext();
	const { refetch } = useFetchBlogFeedQuery();

	useEffect(() => {
		refetch();
	}, []);

	return (
		<Box bg="white" pb={100}>
			{/* 1. HERO SECTION (Matching Privacy Policy) */}
			<Box
				pos="relative"
				pt={{ base: 100, md: 140 }}
				pb={{ base: 60, md: 100 }}
				style={{
					backgroundColor: '#0A1711',
					overflow: 'hidden',
				}}
			>
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
					}}
				/>

				<Container size="lg" pos="relative">
					<Stack align="center" gap="md" ta="center">
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
							Insights & Updates
						</Badge>
						
						<Title 
							order={1} 
							c="white"
							style={{ fontSize: rem(48), fontWeight: 800 }}
						>
							Our Blog
						</Title>
						
						<Text c="gray.4" fw={500}>
							Sharing knowledge, trends and stories from the heart of agriculture
						</Text>
					</Stack>
				</Container>
			</Box>

			{/* 2. CONTENT SECTION (Matching Reference Image) */}
			<Container size="xl" py={80}>
                <Stack align="center" gap="xs" mb={60} ta="center">
                    <Title order={2} size={rem(42)} fw={800} c="dark.9" style={{ fontFamily: 'var(--mantine-font-family-headings)' }}>
                        Exploring New Articles
                    </Title>
                    <Text size="xl" c="dimmed">
                        Ideas, trends, and inspiration for a brighter future
                    </Text>
                    <Box 
                        mt="sm" 
                        w={40} 
                        h={2} 
                        style={{ backgroundColor: '#E64980', borderRadius: rem(2) }}
                    />
                </Stack>

				<SimpleGrid
					cols={{ base: 1, sm: 2, lg: 3 }}
					spacing={50}
					verticalSpacing={60}
				>
					{blogFeed.map((blog) => (
						<BlogCard key={blog.id} blog={blog} />
					))}
				</SimpleGrid>
			</Container>
		</Box>
	);
};

export default BlogPage;