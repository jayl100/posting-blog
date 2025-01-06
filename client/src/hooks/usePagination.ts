function usePagination(currentPage: number, totalPages: number, maxVisible: number = 5): number[] {
  const half = Math.floor(5 / 2); // 2
  let start = currentPage - half; // 1 - 2, 2 - 2, 3 - 2 = 1
  let end = currentPage + half; // 5 + 2, 4 + 2 = 6

  if (start < 1) {
    start = 1;
    end = Math.min(maxVisible, totalPages);
  }

  if (end === totalPages + 1) {
    end = Math.max(maxVisible, totalPages);
    start = Math.min(totalPages - maxVisible + 1, totalPages);
  }

  if (totalPages === currentPage) {
    end = totalPages;
    start = Math.min(totalPages - maxVisible + 1, totalPages);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
return pages;
}

export default usePagination;