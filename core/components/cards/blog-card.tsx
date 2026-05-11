
// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { PencilIcon } from 'lucide-react';
// import { BlogItem } from '@/core/types/types';

// interface BlogCardProps {
//     blog: BlogItem;
//     isAdmin?: boolean; 
//     onEdit?: (blog: BlogItem) => void; 
// }

// const BlogCard = ({ blog, isAdmin, onEdit }: BlogCardProps) => {

//     const slug = blog.title.toLowerCase().replace(/ /g, '-'); 

//     return (
//         <div className='w-[360px] flex flex-col space-y-5 border rounded-md p-2 hover:shadow-md transition-shadow'>
//             {/* Admin Controls */}
//             {isAdmin && (
//                 <div className='flex justify-end'>
//                     <button 
//                         type='button'
//                         onClick={() => onEdit?.(blog)}
//                         className='p-1 bg-white border border-slate-300 rounded-full hover:bg-slate-50'
//                     >
//                         <PencilIcon size={14} className='text-green-600' />
//                     </button>
//                 </div>
//             )}

//             {/* Link to Detail Page */}
//             <Link
//                 href={`/blog/${slug}`}
//                 className='w-full h-[240px] relative rounded-md overflow-hidden'
//             >
//                 <img    
//                     src={blog.imageUrl}
//                     alt={`Blog - ${blog.title}`}
//                     className='object-cover'
//                     sizes="(max-width: 768px) 100vw, 360px"
//                 />
//             </Link>

//             <div className="px-1">
//                 <h1 className='text-sm font-semibold line-clamp-2 h-[40px]'>
//                     {blog.title}
//                 </h1>

//                 <section className='text-sm text-slate-600 mt-2'>
//                     {blog?.subDescription?.slice(0, 150)}...
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default BlogCard;




import React from 'react';
import Link from 'next/link';
import { PencilIcon } from 'lucide-react';
import { Card, Image, Text, ActionIcon, Stack, Group } from '@mantine/core';
import { BlogItem } from '@/core/types/types';
import { formatBlogSlug } from '@/core/middlewares/slug-formatter';

interface BlogCardProps {
    blog: BlogItem;
    isAdmin?: boolean;
    onEdit?: (blog: BlogItem) => void;
}

const BlogCard = ({ blog, isAdmin, onEdit }: BlogCardProps) => {

    const slug = blog.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const truncatedText = blog?.subDescription
        ? blog.subDescription.length > 200
            ? `${blog.subDescription.slice(0, 200)}...`
            : blog.subDescription
        : '';

    return (
        <Card
            key={blog.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="w-[360px] hover:shadow-lg transition-all duration-300"
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            <Card.Section className="relative overflow-hidden">
                {isAdmin && (
                    <ActionIcon
                        variant="white"
                        color="green.6"
                        radius="xl"
                        className="absolute top-3 left-3 z-10 shadow-sm"
                        onClick={() => onEdit?.(blog)}
                    >
                        <PencilIcon size={16} />
                    </ActionIcon>
                )}

                <Link href={`/blog/${formatBlogSlug(blog)}`}>
                    <Image
                        src={blog.imageUrl}
                        height={180}
                        alt={blog.title}
                        fit="cover"
                        className="transition-transform duration-500 hover:scale-105"
                    />
                </Link>
            </Card.Section>


            <Stack mt="md" gap="xs" style={{ flex: 1 }}>
                <Text
                    component={Link}
                    href={`/blog/${slug}`}
                    fw={600}
                    size="lg"
                    className="leading-tight hover:text-blue-600 transition-colors"
                    lineClamp={2}
                >
                    {blog.title}
                </Text>

                <Text size="sm" c="dimmed" lineClamp={4}>
                    {truncatedText}
                </Text>
            </Stack>


            <Group justify="flex-start" mt="xl">
                <Text
                    component={Link}
                    href={`/blog/${slug}`}
                    size="sm"
                    fw={500}
                    c="blue.6"
                    className="hover:underline"
                >
                    Read more →
                </Text>
            </Group>
        </Card>
    );
};

export default BlogCard;