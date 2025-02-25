/* eslint-disable no-useless-escape */
export const cleanTitle = (data: string) => {
  const title = data.replace(/[™®]/g, '');
  return title;
};

export const cleanTitleForUrl = (data: string) => {
  const title = data
    .replace(/[™.:!'&,+\–®]/g, '')
    .replace('é', 'e')
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/-{2,}/g, '-')
    .replace(/[-]$/, '');
  return title;
};
