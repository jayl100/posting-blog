export const formattedDate = (date: string) => {
  return new Date(date)
    .toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '').replace(/\s/g, '-');
};
