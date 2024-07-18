export const maxWords = (value: string | undefined, max: number) => {
  if (!value) return true;
  const wordCount = value.trim().split(/\s+/).length;
  return wordCount <= max;
};
