

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Title, Container, SimpleGrid, Center } from '@mantine/core';
import { BlogItem } from '@/core/types/types';
import BlogCard from '@/core/components/cards/blog-card';

const BlogPage = () => {
    // Logic & Functionality 
    const [blogs, setBlogs] = useState<BlogItem[]>([]);

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/fetch-blogs`
                // `https://livestocx.xyz/api/v1/admin/fetch-blogs`
            );
            console.log(`this is the blog data :: `, data);
            setBlogs(data?.data ?? []);
        } catch (error) {
            console.error('[FETCH-BLOGS-ERROR] :: ', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <Box component="main">
            {/* Hero Section */}
            <Box
                className="bg-blog bg-cover"
                style={{
                    backgroundColor: '#28312B',
                    height: '280px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Title
                    order={1}
                    c="white"
                    fw={500}
                    size="2.5rem"
                >
                    Blog
                </Title>
            </Box>

            {/* Content Section */}
            <Box bg="white" py={40}>
                <Container size="xl">
                    <SimpleGrid
                        cols={{ base: 1, sm: 2, lg: 3 }}
                        spacing="xl"
                        verticalSpacing="xl"
                    >
                        {blogs.map((blog) => (
                            <Center key={blog.id}>
                                <BlogCard key={blog.id} blog={blog} />
                            </Center>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>
        </Box>
    );
};

export default BlogPage;