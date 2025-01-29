export const normalizeImages = (images: any): string[] => {
  if (
    images.length === 1 &&
    typeof images[0] === 'string' &&
    images[0].startsWith('["')
  ) {
    try {
      // Parse the wrapped string into an array
      const parsedImages = JSON.parse(images[0]);
      return Array.isArray(parsedImages) ? parsedImages : [];
    } catch (error) {
      console.error('Failed to parse images:', error);
      return [];
    }
  }
  return images;
};
