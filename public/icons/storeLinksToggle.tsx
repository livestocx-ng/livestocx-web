'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Button, Group } from '@mantine/core';

const StoreLinksToggle = () => {
	const [showStores, setShowStores] = useState(false);

	return (
		<>
			<Box style={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					type='button'
					onClick={() => setShowStores(!showStores)}
					bg='#006838'
					c='white'
					radius='md'
					size='sm'
				>
					{showStores ? 'Hide App Links' : 'Learn More'}
				</Button>
			</Box>

			{showStores && (
				<Group justify='center' gap='sm' mt='md'>
					<Link
						href='https://apps.apple.com/ng/app/livestocx/id6738842775'
						className=''
					>
						<Image
							alt='Download on App Store'
							width={120}
							height={60}
							unoptimized
							className='object-cover'
							src='/icons/icon_appstore_2.svg'
						/>
					</Link>
					<Link
						className=''
						target='_blank'
						href='https://play.google.com/store/apps/details?id=com.livestocx.livestocx_mobile'
					>
						<Image
							alt='Download on Play Store'
							width={120}
							height={60}
							unoptimized
							className='object-cover'
							src='/icons/icon_playstore_2.svg'
						/>
					</Link>
				</Group>
			)}
		</>
	);
};

export default StoreLinksToggle;
