import { IconCpu, IconLeaf, IconTruckDelivery, IconUsers } from '@tabler/icons-react';

export const navLinks = [
  { link: '/', label: 'Home' },
  { link: '/signup', label: 'Register' },
  { link: '/business', label: 'Business' },
  { link: '/about-us', label: 'About Us' },
  { link: '/contact-us', label: 'Contact Us' },
  { link: '/privacy-policy', label: 'Privacy' },
  { link: '/terms-of-service', label: 'Terms' },
];

export const platformFaqs = [
  {
    value: 'What benefits does Livestocx offer to sellers?',
    description:
      'Livestocx helps sellers (livestock farmers) increase their visibility, reach more potential customers across Nigeria and beyond, and promote their livestock products through unique features tailored to small-holder farmers across Africa.',
  },
  {
    value: 'How can I stand out as a seller on Livestocx?',
    description:
      'To help you stand out, Livestocx offers a premium advertising feature for sellers who want to gain more visibility in search results. For a small fee of 500 Naira, your listing will be highlighted, making it easier for potential buyers to find your products.',
  },
  {
    value: 'What is the registration process for sellers on Livestocx?',
    description:
      'To become a verified seller on Livestocx, you will need to upload a valid means of identification. This helps us confirm that you are a legitimate livestock farmer, ensuring a trusted experience for both buyers and sellers.',
  },
  {
    value: 'What steps are being taken to protect buyers from scams?',
    description:
      'Livestocx is committed to providing a safe marketplace for buyers. We have a verification process for sellers and are introducing a badge system for trusted sellers. Additionally, buyers can report any suspicious or fraudulent activities, and we have measures in place to investigate such cases thoroughly.',
  },
  {
    value: 'How can I communicate with sellers or buyers on Livestocx?',
    description:
      'Livestocx offers a built-in chat feature on both the mobile app (available on the App Store and Play Store) that allows sellers and buyers to communicate directly. This feature ensures secure conversations and helps resolve issues in real time.',
  },
  {
    value: 'What is the community feature on Livestocx?',
    description:
      'The community feature on Livestocx allows users to see and connect with their contacts who are already on the platform. This makes it easier to interact with others in the same industry, whether for business opportunities, collaboration, or knowledge sharing.',
  },
  {
    value: 'How can I promote my products on Livestocx?',
    description:
      'Sellers can promote their products on Livestocx using the premium promotion feature. This feature helps increase product visibility, making it easier for potential buyers to find and purchase your products by highlighting your listings in search results.',
  },
  {
    value: 'What is the premium subscription and how does it help sellers?',
    description:
      'The premium subscription on Livestocx offers sellers a custom website and store profile within the mobile app. This feature enables sellers to have a more personalized and professional online presence, helping to attract more customers and stand out in the marketplace.',
  },
];

export const platformFeatures = [
  {
    title: 'Co-ordination and Logistics',
    description:
      'Livestock integrates a logistics module, streamlining the coordination of transportation for livestock. Farmers can easily schedule transportation services directly through our platform, optimizing routes to minimize environmental impact and reduce the huge carbon footprint of the transportation process.',
    icon: IconTruckDelivery,
  },
  {
    title: 'Farmer Empowerment',
    description:
      'We are committed to empowering local farmers by eliminating unnecessary middlemen, reducing transaction costs, and ensuring fair pricing. By providing direct access to buyers and market information, our platform enhances the financial resilience of farmers, making them better equipped to adapt to climate-related challenges.',
    icon: IconUsers,
  },
  {
    title: 'Real-time Data Analytics',
    description:
      'Our platform includes robust data analytics tools that provide insights into market trends, pricing, and demand patterns. Local farmers can make informed decisions, reducing the risk of overproduction and aligning their activities with climate-resilient agricultural practices.',
    icon: IconCpu,
  },
  {
    title: 'Climate-Resilient Practices',
    description:
      'As a future goal, we are putting measures in place to encourage and incentivize climate-resilient farming practices. We will reward farmers who adopt eco-friendly methods, contributing to the overall climate resilience of the agricultural sector.',
    icon: IconLeaf,
  },
];

export const teamMembers = [
  {
    name: 'Oghenekevwe Emadago',
    role: 'Co-founder/CEO',
    bio: `Oghenekevwe has over 7 years experience in sales across agricultural and hygiene sectors and has raised over $230,000 in funding. He leads strategy, vision, and investor relations.`,
    image: '/images/team/team_member_1.png',
    linkedin: 'https://www.linkedin.com/in/oghenekevwe-emadago',
  },
  {
    name: 'Idokoh Divine',
    role: 'COO, Agriculturist and Graphic Designer',
    bio: `With a background in Agriculture and UI/UX, Divine ensures operational excellence and leads on-the-ground engagements to drive platform growth.`,
    image: '/images/team/team_member_2.png',
    linkedin: 'https://www.linkedin.com/in/divine-idokoh',
  },
  {
    name: 'Yada Martins',
    role: 'Co-founder/CTO',
    bio: `Martins is a full stack developer with 6+ years of experience in NestJS, Next.js, and Flutter. He leads the development and implementation of our tech stack.`,
    image: '/images/team/team_member_3.jpg',
    linkedin: 'https://linkedin.com/in/yada-martins',
  },
  {
    name: 'Steve Odinkaru',
    role: 'Co-founder/Product Architect & Lead Designer',
    bio: `Steve is an expert in Figma and product management with 5 years of experience. He handles front-end design, UX, and social media.`,
    image: '/images/team/team_member_4.jpeg',
    linkedin: 'https://linkedin.com/in/steve-odinkaru',
  },
  {
    name: 'Peter Asalu',
    role: 'Co-founder/Product',
    bio: "AI/Data Engineer: Asalu is a key contributor to Livestocx's backend infrastructure, focusing on our data collection and training our AI model on collected data. With his expertise in software architecture and database management, Asalu ensures that we can handle high volumes of transactions and data while maintaining optimal performance and reliability.",

    image: '/images/team/team_member_5.jpeg',
    linkedin: 'https://www.linkedin.com/in/asalu-peter-41300a188',
  },
];

export const appFeatures = [
  {
    id: 1,
    feature: 'Initial Cost',
    custom: {
      text: 'High (design, development, hosting, domain) ₦150,000 - ₦800,000',
      positive: false,
    },
    livestocx: {
      text: 'Low (starting at ₦10,050/year)',
      positive: true,
    },
  },
  {
    id: 2,
    feature: 'Maintenance Cost',
    custom: {
      text: 'High (maintenance, hosting)',
      positive: false,
    },
    livestocx: {
      text: 'Included in subscription',
      positive: true,
    },
  },
  {
    id: 3,
    feature: 'Product Uploads',
    custom: {
      text: 'Additional setup and costs',
      positive: false,
    },
    livestocx: {
      text: 'Unlimited uploads',
      positive: true,
    },
  },
  {
    id: 4,
    feature: 'Sales Management Tools',
    custom: {
      text: 'Additional cost and integration needed',
      positive: false,
    },
    livestocx: {
      text: 'Included',
      positive: true,
    },
  },
  {
    id: 5,
    feature: 'Customer Reach',
    custom: {
      text: 'Limited (depends on SEO, marketing efforts)',
      positive: false,
    },
    livestocx: {
      text: 'High (marketplace visibility)',
      positive: true,
    },
  },
  {
    id: 6,
    feature: 'Promotion and Marketing',
    custom: {
      text: 'Requires separate strategy and additional costs',
      positive: false,
    },
    livestocx: {
      text: 'Included (weekly product promotions)',
      positive: true,
    },
  },
  {
    id: 7,
    feature: 'Analytics and Insights',
    custom: {
      text: 'Requires separate setup and additional tools',
      positive: false,
    },
    livestocx: {
      text: 'Included',
      positive: true,
    },
  },
  {
    id: 8,
    feature: 'Security and Updates',
    custom: {
      text: 'Responsibility of the business owner (time and cost-intensive)',
      positive: false,
    },
    livestocx: {
      text: 'Handled by Livestocx (regular updates and security management)',
      positive: true,
    },
  },
  {
    id: 9,
    feature: 'Customer Support',
    custom: {
      text: 'Varies, generally limited to hosting provider',
      positive: false,
    },
    livestocx: {
      text: 'Included (platform support and assistance)',
      positive: true,
    },
  },
];
