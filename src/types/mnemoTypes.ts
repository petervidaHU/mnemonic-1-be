export interface MnemoApiResponse {
  acronyms: string;
  data: Array<{
    id: string;
    text: string;
  }>;
}
