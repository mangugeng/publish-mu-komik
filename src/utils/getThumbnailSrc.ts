import type { LibraryItem } from "@/utils/library-loader";

export function getThumbnailSrc(item: LibraryItem): string {
  if (!item.thumbnail) return '';
  if (item.thumbnail.startsWith('http')) return item.thumbnail;
  if (item.thumbnail.startsWith('data:image/')) return item.thumbnail;
  const match = item.thumbnail.match(/^(?:\/library\/(?:karakter|background)\/)(https?.*)$/);
  if (match) return match[1];
  if (item.thumbnail.startsWith('/')) return item.thumbnail;
  return item.thumbnail;
}

export {}; 