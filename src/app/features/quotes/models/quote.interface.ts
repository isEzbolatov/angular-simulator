export interface IQuote {
  id: number;
  quote: string;
  author: string;
}

export interface IQuotesResponse {
  quotes: IQuote[];
  total: number;
  skip: number;
  limit: number;
}
