export async function generateOGImageFromURL(
  width: number,
  height: number,
  imageUrl: string
): Promise<string> {
  if (!imageUrl) return '';

  // Keep the original URL and append size hints when possible.
  try {
    const url = new URL(imageUrl);
    url.searchParams.set('w', String(width));
    url.searchParams.set('h', String(height));
    return url.toString();
  } catch {
    return imageUrl;
  }
}
