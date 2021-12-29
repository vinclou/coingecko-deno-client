/**
 * @author Vincent Arlou
 * This file contains the interfaces used to specify parameters for the API calls.
 */
import {
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
} from "./types.ts";

/**
 * @description
 * interface for coin gecko api client
 */
export interface GeckoApiClient {
  readonly ORDER: Order;
  readonly API_VERSION: string;
  readonly EVENT_TYPE: EventType;
  readonly REQUESTS_PER_SECOND: number;
  readonly STATUS_UPDATE_CATEGORY: StatusUpdateCategoryType;
  readonly STATUS_UPDATE_PROJECT_TYPE: StatusUpdateProjectType;

  /**
   * Pings server to check if it is alive.
   */
  ping: () => Promise<void | Response>;
  /**
   * Get global crypto data.
   */
  global: () => Promise<void | Response>;
  globalDefi: () => Promise<void | Response>;

  /**
   * Status Updates
   */
  listStatusUpdates: (params?: StatusUpdatesParams) => Promise<void | Response>;
  /**
   * Get BTC-to-Currency exchange rates
   */
  exchangeRates: () => Promise<void | Response>;
  /**
   * Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first)
   */
  trending: () => Promise<void | Response>;
  /**
   * `GET /companies/public_treasury/{coin_id}`
   * Currently in Beta, results might not be accurate, reference official docs
   * Get public companies bitcoin or ethereum holdings (Ordered by total holdings descending)
   * @param {string} coinId - can only be bitcoin or ethereum
   */
  topHoldings: (coinId: string) => Promise<void | Response>;
  /**
   * SIMPLE Endpoint - https://www.coingecko.com/api/documentations/v3#/simple
   */
  simple: SimpleUrlObject;
  /**
   * COINS Endpoint - https://www.coingecko.com/api/documentations/v3#/coins
   */
  coins: CoinsUrlObject;
  /**
   * This object holds two endpoints:
   * default pram - bitcoin
   * Contracts Endpoint - https://www.coingecko.com/api/documentations/v3#/contracts
   * And asset_platforms endpoint. https://www.coingecko.com/api/documentations/v3#/asset_platforms
   */
  contracts: ContractsUrlObject;
  /**
   * This object holds two endpoints:
   * `/coins/categories/` and `/coins/categories/list`
   * Categories Endpoint - https://www.coingecko.com/api/documentations/v3#/category
   */
  categories: CategoriesUrlObject;
  /**
   * Exchanges Endpoint - https://www.coingecko.com/api/documentations/v3#/exchanges
   * `/exchanges/...`
   */
  exchanges: ExchangesUrlObject;
  /**
   * Finance Endpoint - https://www.coingecko.com/api/documentations/v3#/finance
   * `/finance/...`
   */
  finance: FinanceUrlObject;
  /**
   * Indexes endpoint  - `/indexes/...`
   */
  indexes: IndexesUrlObject;
  /**
   * Derivatives - `/derivatives/...`
   */
  derivatives: DerivativesUrlObject;
  /**
   * Private method to make a request to the API
   */
  _request: (path: string, params?: QueryParams) => Promise<void | Response>;
  /**
   * Private method to build url
   */
  _buildRequestParams: (path: string, params?: unknown) => RequestOptions;
}

/**
 * @description
 * interface for `/coins` routes
 */
export interface CoinsUrlObject {
  /**
   * @description
   * /coins - simple fetch of all coins
   */
  all: (params?: AllQueryParams) => Promise<void | Response>;
  /**
   * @description
   * list all supported coins id, name and symbol
   */
  list: () => Promise<void | Response>;
  /**
   * @description
   * vsCurrency param required, defaults to usd. List all supported coins price, market price, volume, and market related data
   */
  markets: (params: MarketsQueryParams) => Promise<void | Response>;
  /**
   * @description
   * fetch a single coin data, /coins/:id in original coinGecko API
   * almost all params resolve to true(by coin gecko), the data set will be huge
   */
  fetchCoin: (
    coinId: string,
    params?: CoinQueryParams
  ) => Promise<void | Response>;
  /**
   * @description
   * 'BTC' is an example of a coin ticker
   * /coins/:id/tickers - Get coin tickers (paginated to 100 items)
   */
  fetchTickers: (
    coinId: string,
    params?: TickersQueryParams
  ) => Promise<void | Response>;

  /**
   * @description
   * Get historical data at a given date for a coin. (name, price, market, stats)
   * Default date is set promise is rejected, setting default date as now() should
   * be done on your end. The date of data snapshot in dd-mm-yyyy eg. 30-12-2017
   */
  fetchHistory: (
    coinId: string,
    params: FetchHistoryParams
  ) => Promise<void | Response>;

  /**
   * @description
   * For a coin,
   * Get historical market data include price, market cap, and 24h volume (granularity auto)
   */
  fetchMarketChart: (
    coinId: string,
    params: FetchMarketChartParams
  ) => Promise<void | Response>;
  /**
   * @description
   * Get historical market data include price, market cap,
   * and 24h volume within a range of timestamp (granularity auto).
   * Minutely data will be used for duration within 1 day.
   * Hourly data will be used for duration between 1 day and 90 days.
   * Daily data will be used for duration above 90 days.
   */
  fetchMarketChartRange: (
    coinId: string,
    params: FetchMarketChartRangeParams
  ) => Promise<void | Response>;
  /**
   *  @description Get status updates for a given coin
   */
  fetchStatusUpdates: (
    coinId: string,
    params?: FetchStatusUpdatesProps
  ) => Promise<void | Response>;
  /**
   * @description Get coin's OHLC data (/coins/:id/ohlc)
   * Candle's body: 1 - 2 days: 30 minutes, 3 - 30 days: 4 hours, 31 and before: 4 days
   * Data up to number of days ago (1/7/14/30/90/180/365/max)
   */
  fetchOhlc: (
    coinId: string,
    params: FetchOhlcParams
  ) => Promise<void | Response>;
}
/**
 * @description
 * interface for `/simple` routes
 */
export interface SimpleUrlObject {
  /**
   * @description
   * Get the current price of any cryptocurrencies in any other supported currencies that you need.
   */
  price: (params: SimplePriceParams) => Promise<void | Response>;
  /**
   * @description
   * Get current price of tokens (using contract addresses) for a given platform in any other currency that you need.
   */
  tokenPrice: (params: SimpleTokenPriceParams) => Promise<void | Response>;
  /**
   * @description
   * Get the list of supported_vs_currencies.
   */
  supportedVsCurrencies: () => Promise<void | Response>;
}
/**
 * @description
 * interface for `/contracts` routes
 */
export interface ContractsUrlObject {
  /**
   * @description
   * This endpoint is used to get the list of supported asset platforms.
   * Read docs for more.
   * https://www.coingecko.com/api/documentations/v3#/asset_platforms
   * https://www.coingecko.com/api/documentations/v3#/contracts
   */
  assetPlatforms: () => Promise<void | Response>;
  /**
   * @description
   * Get the coin info from the contract address.
   */
  contract: (id: string, contract_address: string) => Promise<void | Response>;
}
/**
 * @description
 * interface for `/categories` routes
 */
export interface CategoriesUrlObject {
  /**
   * @description
   * Get the list of categories.
   * https://www.coingecko.com/api/documentations/v3#/categories
   */
  list: () => Promise<void | Response>;
  /**
   * @description
   * Get all categories with the market data
   */
  listMarket: (params?: { order: string }) => Promise<void | Response>;
}
/**
 * @description
 * exchanges for `/exchanges` routes
 */
export interface ExchangesUrlObject {
  /**
   *  @description
   *  List all exchanges
   *  Default params
   *  per_page: 100
   *  page: 1
   *  /exchanges
   */
  all: (params?: {
    per_page: number;
    page: string;
  }) => Promise<void | Response>;
  /**
   *  @description
   *  List all supported exchanges, no params
   *  /exchanges/list
   */
  list: () => Promise<void | Response>;
  /**
   *  @description
   *  Fetch exchange data in BTC by providing an exchange id
   *  /exchanges/{id}
   *  Pass the exchange id as a parameter and other optional query
   */
  fetchExchange: (id: string) => Promise<void | Response>;
  /**
   *  @description
   *  Get exchange tickers paginated to 100 items
   *  `id - exchange id`
   *  `params - optional query params`
   *  /exchanges/{id}/tickers
   *  Pass the exchange id as a parameter and other optional query
   *  https://www.coingecko.com/api/documentations/v3#/exchanges/tickers
   *  Ticker is_stale is true when ticker that has not been updated/unchanged from the exchange for a while.
   *  Ticker is_anomaly is true if ticker's price is outliered by our system.
   *  You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide)
   */
  fetchTickers: (
    id: string,
    params?: ExchangeTickersParams
  ) => Promise<void | Response>;
  /**
   *  @description
   *  Get status updates for a given exchange
   *  /exchanges/{id}/status_updates
   *  Pass the `exchange id` as a parameter and other optional query
   *  Pass `optional query params` to filter the data
   */
  fetchStatusUpdates: (
    id: string,
    params?: {
      per_page?: number;
      page?: number;
    }
  ) => Promise<void | Response>;
  /**
   *  @description
   *  Get the volume chart for a given exchange
   *  /exchanges
   *  `id` - exchange id
   *  `params` - Data up to number of days ago (eg. 1,14,30)
   */
  fetchVolumeChart: (
    id: string,
    params: {
      days: number;
    }
  ) => Promise<void | Response>;
}
/**
 * @description
 * interface for `/finance` routes
 */
export interface FinanceUrlObject {
  /**
   *  @description
   *  List all finance platforms.
   *  pass optional params:
   * `per_page` - number of items per page
   * `page` - page number
   * `defaults to 100 and 1`
   */
  platforms: (params?: {
    per_page?: number;
    page?: string;
  }) => Promise<void | Response>;

  /**
   *  @description
   *  List all supported finance products.
   *  Props:
   *  `per_page`: number of items per page, default 100
   *  `page`: page number, default 1
   *  `start_at`: string, start date of the financial products
   *  `end_at`: string, end date of the financial products`
   */
  products: (params?: {
    per_page?: number;
    page?: string;
    start_at?: string;
    end_at?: string;
  }) => Promise<void | Response>;
}
/**
 * @description
 * interface `/indexes` routes
 */
export interface IndexesUrlObject {
  /**
   *  @description
   * List all market indexes.
   * default params: 100 and 1
   */
  all: (params?: {
    per_page?: number;
    page?: number;
  }) => Promise<void | Response>;

  /**
   *  @description
   * List all market indexes id and name
   */
  list: () => Promise<void | Response>;

  /**
   *  @description
   * Get market index by market id and index id
   * pass the market id (can be obtained from /exchanges/list)
   * pass the index id (can be obtained from /indexes/list)
   */
  fetchIndex: (marketId: string, id: string) => Promise<void | Response>;
}
/**
 * @description
 * interface `/derivatives` routes
 */
export interface DerivativesUrlObject {
  /**
   *  @description
   *  List all derivatives platforms.
   *  `/derivatives`
   *  optional params: `['all', 'unexpired'] - expired to show unexpired tickers, all to list all tickers, defaults to unexpired`
   */
  all: (params?: { include_tickers?: string }) => Promise<void | Response>;
  /**
   *  @description
   *  List all derivative exchanges name and identifier
   *  `/derivatives/exchanges/list`
   */
  list: () => Promise<void | Response>;
  /**
   *  @description
   * List all derivative exchanges
   * `derivatives/exchanges`
   * order results using following params name_asc，name_desc，open_interest_btc_asc，
   * open_interest_btc_desc，trade_volume_24h_btc_asc，trade_volume_24h_btc_desc
   */
  listDerivatives: (params?: {
    order?: string;
    per_page?: number;
    page?: number;
  }) => Promise<void | Response>;

  /**
   *  @description
   *  Show derivative exchange data
   *  `/derivatives/exchanges/{id}`
   *  string (path) pass the exchange id
   *  (can be obtained from derivatives/exchanges/list) eg. bitmex
   *  ['all', 'unexpired'] - expired to show unexpired tickers, all to list all tickers,
   *  leave blank to omit tickers data in response
   */
  fetchDerivativeData: (
    id: string,
    params?: {
      include_tickers?: string;
    }
  ) => Promise<void | Response>;
}
