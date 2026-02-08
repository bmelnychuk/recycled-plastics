export const formatWebsite = (website: string) => {
  try {
    return new URL(website).host;
  } catch {
    return website.replace(/^https?:\/\//, '');
  }
};
