export interface BlogItem {
	id: number;
	title: string;
	// hasCTA: boolean;
	imageUrl: string;
	subDescription: string;
	description: string;
	createdAt: Date;
	articles: {
		id: number;
		blog: number;
		hasCTA: boolean;
        imageUrl?: string;
		title: string;
		description: string;
	}[];
}

export interface Sponsor {
	name: string;
	image: string;
}