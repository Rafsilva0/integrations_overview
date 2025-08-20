export type Endpoint = {
  raw_url: string;
  url: string;        // canonical
  action: string;     // read|create|update|delete|search|send
  path: string;
  source_row?: number;
};

export type UseCase = {
  name: string;
  endpoints: Endpoint[];
};

export type Vendor = {
  vendor: string;
  domains: string[];
  useCases: UseCase[];
};

export type Catalog = { vendors: Vendor[] };

export type SearchIndexItem = {
  vendor: string;
  domains: string[];
  endpoint_count: number;
  use_case_count: number;
};

export type SearchIndex = { index: SearchIndexItem[] };
