// Lang type

export type LangProps = {
  lang: 'th' | 'en';
};

export type LangType = LangProps['lang'];

// Pagination type

export type PaginationType = {
  totalCount: number;
  pageSize: number;
  totalPages: number;
  pageNumber: number;
};

export type StatusType = {
  statusCode: number;
  statusText: string;
  message: string;
};
