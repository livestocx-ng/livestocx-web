import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Livestocx - Terms Of Service',
  description: 'Best deals, Everything Animals',
  keywords: ['Livestocx', 'Livestock', 'Nigeria', 'Pets', 'Animals', 'Meat'],
  other: {
    'facebook-domain-verification': 'yy2fxudmyl6e8nxtl2zjx9lss8j8dl',
  },
  openGraph: {
    title: 'Livestocx - Terms Of Service',
    description: 'Best deals, Everything Animals',
    url: 'https://livestocx.com',
    siteName: 'Livestocx',
    type: 'website',
    images: [
      {
        url: 'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/3c6152e0-3bdc-4130-a81f-74045a91a9bf_image.png',
        secureUrl:
          'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/3c6152e0-3bdc-4130-a81f-74045a91a9bf_image.png',
        width: 300,
        height: 200,
      },
      {
        url: 'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/0f33bd14-e723-4702-8375-fca460059f0f_image.png',
        secureUrl:
          'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/0f33bd14-e723-4702-8375-fca460059f0f_image.png',
        width: 300,
        height: 300,
      },
      {
        url: 'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/92484e7d-0411-41cb-ac5a-b2fb07f2258c_image.png',
        secureUrl:
          'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/92484e7d-0411-41cb-ac5a-b2fb07f2258c_image.png',
        alt: 'Livestocx Banner',
        width: 1200,
        height: 630,
      },
      {
        url: 'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/92484e7d-0411-41cb-ac5a-b2fb07f2258c_image.png',
        secureUrl:
          'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/92484e7d-0411-41cb-ac5a-b2fb07f2258c_image.png',
        alt: 'Livestocx Banner',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '@livestocx',
    creator: '@livestocx',
    title: 'Livestocx - Terms Of Service',

    description: 'Best deals, Everything Animals',
    images: [
      {
        url: 'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/3c6152e0-3bdc-4130-a81f-74045a91a9bf_image.png',
        secureUrl:
          'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/3c6152e0-3bdc-4130-a81f-74045a91a9bf_image.png',
        width: 300,
        height: 200,
      },
      {
        url: 'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/0f33bd14-e723-4702-8375-fca460059f0f_image.png',
        secureUrl:
          'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/0f33bd14-e723-4702-8375-fca460059f0f_image.png',
        width: 300,
        height: 300,
      },
      {
        url: 'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/92484e7d-0411-41cb-ac5a-b2fb07f2258c_image.png',
        secureUrl:
          'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/92484e7d-0411-41cb-ac5a-b2fb07f2258c_image.png',
        alt: 'Livestocx Banner',
        width: 1200,
        height: 630,
      },
      {
        url: 'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/92484e7d-0411-41cb-ac5a-b2fb07f2258c_image.png',
        secureUrl:
          'https://afritint-media.s3.eu-north-1.amazonaws.com/versions/original/92484e7d-0411-41cb-ac5a-b2fb07f2258c_image.png',
        alt: 'Livestocx Banner',
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
