// default client for the API
import GeckoClient from "./src/crypto-client.ts";
export default GeckoClient;

// Interfaces for the GeckoClient class
export type {
  GeckoApiClient,
  CoinsUrlObject,
  SimpleUrlObject,
  ContractsUrlObject,
  CategoriesUrlObject,
  ExchangesUrlObject,
  FinanceUrlObject,
  IndexesUrlObject,
  DerivativesUrlObject,
} from "./types/interfaces.ts";

// Types: for QueryParams
export type {
  QueryParams,
  RequestOptions,
  AllQueryParams,
  MarketsQueryParams,
  CoinQueryParams,
  TickersQueryParams,
  FetchHistoryParams,
  FetchMarketChartParams,
  FetchMarketChartRangeParams,
  FetchStatusUpdatesProps,
  FetchOhlcParams,
  SimplePriceParams,
  SimpleTokenPriceParams,
  ExchangeTickersParams,
  /* CONSTANT MISC */
  Order,
  StatusUpdateCategoryType,
  StatusUpdateProjectType,
  EventType,
  StatusUpdatesParams,
} from "./types/types.ts";
