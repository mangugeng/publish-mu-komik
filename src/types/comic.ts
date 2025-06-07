export interface Comic {
  id: string;
  title: string;
  coverUrl: string;
  chapters: Chapter[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'review';
  authorId: string;
  genre?: string;
  cover: string;
  synopsis: string;
  contributors: Contributor[];
  category?: string;
  tags?: string[];
  language?: string;
  audience?: string;
  authorAlias?: string;
  authorBioUrl?: string;
  year?: string;
  isPublished?: boolean;
  isUnggulan?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  pages: ComicPage[];
  createdAt: string;
  updatedAt: string;
  pricePerPage: number;
  bundlePrice: number;
  discount?: Discount;
  isComment?: boolean;
}

export interface ComicPage {
  id: string;
  imageUrl: string;
  order: number;
  isPaid: boolean;
}

export interface Contributor {
  role: string;
  userId?: string;
  name?: string;
}

export interface Discount {
  type: "percentage" | "fixed";
  value: number;
  validUntil: string;
} 