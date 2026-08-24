export function Pagination({
  page,
  pageCount,
  onPage
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  if (pageCount <= 1) return null;
  return (
    <div className="psz-pagination">
      <button disabled={page <= 1} onClick={() => onPage(page - 1)}>
        ‹ 上一页
      </button>
      <span>
        {page} / {pageCount}
      </span>
      <button disabled={page >= pageCount} onClick={() => onPage(page + 1)}>
        下一页 ›
      </button>
    </div>
  );
}
