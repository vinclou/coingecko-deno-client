/**
 * @author Vincent Arlou
 * This file contains the interfaces used to specify parameters for the API calls.
 */
import {
  QueryParams,
  RequestOptions,
  AllCoinsQueryParams,
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

import {
  PingResponse,
  GlobalResponse,
  GlobalDefiResponse,
  CoinStatusUpdateResponse,
  ExchangeRatesResponse,
  TrendingResponse,
  TopHoldingsResponse,
  SimplePriceResponse,
  TokenPriceResponse,
  BasicCoin,
  CoinListResponse,
  CoinMarketData,
  CoinFullInfo,
  CoinTickerResponse,
  CoinHistoryResponse,
  CoinMarketChartResponse,
  AssetPlatformData,
  PLATFORMS,
  CategoryData,
  CategoryListResponse,
  Exchange,
  NameIdPair,
  ExchangeIdData,
  ExchangeIdTickerResponse,
  FinancePlatform,
  FinanceProduct,
  IndexItem,
  Derivative,
  DerivativeExchange,
} from "./gecko-data-interfaces.ts";

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
   * @description
   * Pings server to check if it is alive.
   * @example
   * ```typescript
   * const client = new GeckoApiClient();
   * const data = client.ping();
   * ```
   * @returns {Promise<PingResponse>}
   */
  ping: () => Promise<PingResponse>;
  /**
   * @description
   * Get global crypto data.
   * @example
   * ```typescript
   * const gdata = await client.global();
   * ```
   * @returns {Promise<GlobalResponse>}
   */
  global: () => Promise<GlobalResponse>;
  /**
   * @description
   * `/global/decentralized_finance_defi`
   * Get Top 100 Cryptocurrency Global Decentralized Finance(defi) data
   * @example
   * ```typescript
   * const defiData = await client.globalDefi();
   * ```
   * @returns {GlobalDefiResponse}
   */
  globalDefi: () => Promise<GlobalDefiResponse>;

  /**
   * @description
   * `/status_updates`
   * Default behavior is unknown, sorted by coin gecko itself,
   * I do not to plan to change it, if you want specific order,
   * provide the params, for more look at ts doc or better official docs.
   * @example
   * ```typescript
   * const statusUpdates = await client.listStatusUpdates({});
   * ```
   * @param params.category
   * @param params.project_type
   * @param params.page
   * @param params.per_page
   *
   * @returns {CoinStatusUpdateResponse}
   */
  listStatusUpdates: (
    params?: StatusUpdatesParams
  ) => Promise<CoinStatusUpdateResponse>;
  /**
   * @description
   * `/exchange_rates`
   * Get the exchange rates for all supported currencies
   * Relative to BTC
   * @example
   * ```typescript
   * const exchangeRates = await client.exchangeRates();
   * ```
   * @returns {ExchangeRatesResponse}
   */
  exchangeRates: () => Promise<ExchangeRatesResponse>;
  /**
   * @description
   * Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first)
   * @example
   * ```typescript
   * const trending = await client.trending();
   * ```
   * @returns {TrendingResponse}
   */
  trending: () => Promise<TrendingResponse>;
  /**
   * `GET /companies/public_treasury/{coin_id}`
   * Currently in Beta, results might not be accurate, reference official docs
   * Get public companies bitcoin or ethereum holdings (Ordered by total holdings descending)
   * @param {string} coinId - can only be bitcoin or ethereum, default string is set to bitcoin
   * @example
   * ```typescript
   * const topHoldings = await client.topHoldings("bitcoin");
   * ```
   * @returns {TopHoldingsResponse}
   */
  topHoldings: (coinId: string) => Promise<TopHoldingsResponse>;
  /**
   * @description
   * `Getter Method`
   * SIMPLE Endpoint - https://www.coingecko.com/api/documentations/v3#/simple
   * @function
   * - `price()`
   * - `tokenPrice()`
   * - `supportedVsCurrencies()`
   * @returns {SimpleUrlObject}
   */
  simple: SimpleUrlObject;
  /**
   * @description
   * `Getter Method`
   * COINS Endpoint - https://www.coingecko.com/api/documentations/v3#/coins
   * @function
   * - `all()`
   * - `list()`
   * - `markets()`
   * - `fetchCoin()`
   * - `fetchTickers()`
   * - `fetchHistory()`
   * - `fetchMarketChart()`
   * - `fetchMarketChartRange()`
   * - `fetchStatusUpdates()`
   * - `fetchOhlc()`
   * @returns {CoinUrlObject}
   */
  coins: CoinsUrlObject;
  /**
   * @description
   * `Getter Method`
   * This object holds two endpoints:
   * default pram - bitcoin
   * Contracts Endpoint - https://www.coingecko.com/api/documentations/v3#/contracts
   * And asset_platforms endpoint. https://www.coingecko.com/api/documentations/v3#/asset_platforms
   * @function
   * - `assetPlatforms()`
   * - `fetchContract()`
   * - `fetchContractMarketChart()`
   * - `fetchContractMarketChartRange()`
   * @returns {ContractsUrlObject}
   */
  contracts: ContractsUrlObject;
  /**
   * @description
   * `Getter Method`
   * This object holds two endpoints:
   * `/coins/categories/` and `/coins/categories/list`
   * Categories Endpoint - https://www.coingecko.com/api/documentations/v3#/category
   * @function
   * - `list()`
   * - `listMarket()`
   * @returns {CategoryUrlObject}
   */
  categories: CategoriesUrlObject;
  /**
   * @description
   * `Getter Method`
   * Exchanges Endpoint - https://www.coingecko.com/api/documentations/v3#/exchanges
   * `/exchanges/...`
   * @function
   * - `all()`
   * - `list()`
   * - `fetchExchange()`
   * - `fetchTickers()`
   * - `fetchStatusUpdates()`
   * - `fetchVolumeChart()`
   * @returns {ExchangesUrlObject}
   */
  exchanges: ExchangesUrlObject;
  /**
   * @description
   * `Getter Method`
   * Finance Endpoint - https://www.coingecko.com/api/documentations/v3#/finance
   * `/finance/...`
   * @function
   * - `platforms()`
   * - `products()`
   * @returns {FinanceUrlObject}
   */
  finance: FinanceUrlObject;
  /**
   * @description
   * `Getter Method`
   * Indexes endpoint  - `/indexes/...`
   * @function
   * - `all()`
   * - `list()`
   * - `fetchIndex()`
   * @returns {IndexesUrlObject}
   */
  indexes: IndexesUrlObject;
  /**
   * @description
   * `Getter Method`
   * Derivatives - `/derivatives/...`
   * @function
   * - `all()`
   * - `list()`
   * - `listDerivatives()`
   * - `fetchDerivativeData()`
   * @returns {DerivativesUrlObject}
   */
  derivatives: DerivativesUrlObject;
  /**
   * @description
   * Private method to make a request to the API
   */
  _request: (path: string, params?: QueryParams) => Promise<void | Response>;
  /**
   * @description
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
   * list all supported coins id, name and symbol
   */
  all: (params?: AllCoinsQueryParams) => Promise<Array<BasicCoin>>;
  /**
   * @description
   * list all supported coins id, name and symbol
   * @returns Object
   */
  list: () => Promise<CoinListResponse>;
  /**
   * @description
   * vsCurrency param required, defaults to usd. List all supported coins price, market price, volume, and market related data
   */
  markets: (params: MarketsQueryParams) => Promise<Array<CoinMarketData>>;
  /**
   * @description
   * fetch a single coin data, /coins/:id in original coinGecko API
   * almost all params resolve to true(by coin gecko), the data set will be huge
   */
  fetchCoin: (
    coinId: string,
    params?: CoinQueryParams
  ) => Promise<CoinFullInfo>;
  /**
   * @description
   * 'BTC' is an example of a coin ticker
   * /coins/:id/tickers - Get coin tickers (paginated to 100 items)
   */
  fetchTickers: (
    coinId: string,
    params?: TickersQueryParams
  ) => Promise<CoinTickerResponse>;

  /**
   * @description
   * Get historical data at a given date for a coin. (name, price, market, stats)
   * Default date is set promise is rejected, setting default date as now() should
   * be done on your end. The date of data snapshot in dd-mm-yyyy eg. 30-12-2017
   */
  fetchHistory: (
    coinId: string,
    params: FetchHistoryParams
  ) => Promise<CoinHistoryResponse>;

  /**
   * @description
   * For a coin,
   * Get historical market data include price, market cap, and 24h volume (granularity auto)
   */
  fetchMarketChart: (
    coinId: string,
    params: FetchMarketChartParams
  ) => Promise<CoinMarketChartResponse>;
  /**
   * @description
   * Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)
   * Minutely data will be used for duration within 1 day, Hourly data will be used for duration between 1 day and 90 days, Daily data will be used for duration above 90 days.
   *
   * @category Coin
   * @param id pass the coin id (can be obtained from /coins) eg. bitcoin
   * @param param.vs_currency The target currency of market data (usd, eur, jpy, etc.)
   * @param param.from From date in UNIX Timestamp (eg. 1392577232)
   * @param param.to To date in UNIX Timestamp (eg. 1618716149)
   * @returns CoinMarketChartResponse
   */
  fetchMarketChartRange: (
    coinId: string,
    params: FetchMarketChartRangeParams
  ) => Promise<CoinMarketChartResponse>;
  /**
   * Get status updates for a given coin (beta)
   *
   * @see https://www.coingecko.com/api/documentations/v3#/coins/get_coins__id__status_updates
   * @category Coin
   * @param param.id pass the coin id (can be obtained from /coins) eg. bitcoin
   * @param param.per_page Total results per page
   * @param param.page Page through results
   * @returns CoinStatusUpdateResponse
   */
  fetchStatusUpdates: (
    coinId: string,
    params?: FetchStatusUpdatesProps
  ) => Promise<CoinStatusUpdateResponse>;
  /**
   * @description
   * Get coin's OHLC (Beta)
   * ```
   * Candle’s body:
   * 1 - 2 days: 30 minutes
   * 3 - 30 days: 4 hours
   * 31 and before: 4 days
   * ```
   * @see https://www.coingecko.com/api/documentations/v3#/coins/get_coins__id__ohlc
   * @category Coin
   * @param input.id pass the coin id (can be obtained from /coins) eg. bitcoin
   * @param input.vs_currency The target currency of market data (usd, eur, jpy, etc.)
   * @param input.days Data up to number of days ago (1/7/14/30/90/180/365/max)
   * @returns {CoinStatusUpdateResponse}
   * Sample output
   * ```
   * [
   *  [
   *    1618113600000,
   *    79296.36,
   *    79296.36,
   *    79279.94,
   *    79279.94
   *   ]
   * . ... ... . .. . .. . . . . .
   * ]
   *```
   */
  fetchOhlc: (
    coinId: string,
    params: FetchOhlcParams
  ) => Promise<Array<Array<number>>>;
}
/**
 * @description
 * interface for `/simple` routes
 */
export interface SimpleUrlObject {
  /**
   * @category Simple
   * @description
   * Get the current price of any cryptocurrencies in any other supported currencies that you need.
   * @param param.vs_currencies vs_currency of coins, comma-separated if querying more than 1 vs_currency. *refers to simple/supported_vs_currencies
   * @param param.ids The ids of the coin, comma separated crytocurrency symbols (base). refers to /coins/list. When left empty, returns numbers the coins observing the params limit and start
   * @param param.include_market_cap @default false
   * @returns {SimplePriceResponse}
   */
  price: (params: SimplePriceParams) => Promise<SimplePriceResponse>;
  /**
   * @category Simple
   * @description
   * Get current price of tokens (using contract addresses) for a given platform in any other currency that you need.
   * @param param.id The id of the platform issuing tokens (Only ethereum is supported for now)
   * @param param.contract_addresses The contract address of tokens, comma separated
   * @param param.vs_currencies vs_currency of coins, comma-separated if querying more than 1 vs_currency. *refers to simple/supported_vs_currencies
   * @returns The dictionary of price pair with details
   * * Example output
   * ```json
   * {
   *    "0x8207c1ffc5b6804f6024322ccf34f29c3541ae26": {
   *      "btc": 0.00003754,
   *      "btc_market_cap": 7914.297728099776,
   *      "btc_24h_vol": 2397.477480037078,
   *      "btc_24h_change": 3.7958858800037834,
   *      "eth": 0.0009474,
   *      "eth_market_cap": 199730.22336519035,
   *      "eth_24h_vol": 60504.258122696505,
   *      "eth_24h_change": 2.8068351977135007,
   *      "last_updated_at": 1618664199
   *   }
   *}
   *```
   */
  tokenPrice: (params: SimpleTokenPriceParams) => Promise<TokenPriceResponse>;
  /**
   * @description
   * Get list of supported_vs_currencies.
   * @returns list of supported_vs_currencies
   * @category Simple
   */
  supportedVsCurrencies: () => Promise<string[]>;
}
/**
 * @description
 * interface for `/contracts` routes
 */
export interface ContractsUrlObject {
  /**
   * @description
   * This endpoint is used to get the list of supported asset platforms.
   * @see https://www.coingecko.com/api/documentations/v3#/asset_platforms
   * @see https://www.coingecko.com/api/documentations/v3#/contracts
   */
  assetPlatforms: () => Promise<Array<AssetPlatformData>>;
  /**
   * Get historical market data include price, market cap, and 24h volume (granularity auto) from a contract address
   * @see https://www.coingecko.com/api/documentations/v3#/contract/get_coins__id__contract__contract_address_
   * @returns current data for a coin
   * @param id Asset platform (only ethereum is supported at this moment)
   * @param contract_address Token’s contract address
   * @category Contract
   * @returns {CoinFullInfo}
   */
  fetchContract: (
    id: PLATFORMS,
    contract_address: string
  ) => Promise<CoinFullInfo>;
  /**
   * @description
   * Get historical market data include price, market cap, and 24h volume (granularity auto)
   * @see https://www.coingecko.com/api/documentations/v3#/contract/get_coins__id__contract__contract_address__market_chart_
   * @returns current data for a coin
   * @param id Asset platform (only ethereum is supported at this moment)
   * @param contract_address Token’s contract address
   * @param param.vs_currency The target currency of market data (usd, eur, jpy, etc.)
   * @param param.days Data up to number of days ago (eg. 1,14,30,max)
   * @default params usd, max
   * @category Contract
   * @returns {CoinMarketChartResponse}
   */
  fetchContractMarketChart: (
    id: PLATFORMS,
    contract_address: string,
    params: {
      vs_currency: string;
      days: number | "max";
    }
  ) => Promise<CoinMarketChartResponse>;
  /**
   * @description
   * Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto) from a contract address
   * @see https://www.coingecko.com/api/documentations/v3#/contract/get_coins__id__contract__contract_address__market_chart_range
   * @returns current data for a coin
   * @param id Asset platform (only ethereum is supported at this moment)
   * @param contract_address Token’s contract address
   * @param param.vs_currency The target currency of market data (usd, eur, jpy, etc.)
   * @param param.from From date in UNIX Timestamp (eg. 1392577232)
   * @param param.to From date in UNIX Timestamp (eg. 1618716149)
   * @category Contract
   * @returns {CoinMarketChartResponse} Get historical market data include price, market cap, and 24h volume
   */
  fetchContractMarketChartRange: (
    id: PLATFORMS,
    contract_address: string,
    params: {
      vs_currency: string;
      from: number;
      to: number;
    }
  ) => Promise<CoinMarketChartResponse>;
}
/**
 * @description
 * interface for `/categories` routes
 */
export interface CategoriesUrlObject {
  /**
   * @description
   * Get the list of categories.
   * @see https://www.coingecko.com/api/documentations/v3#/categories
   */
  list: () => Promise<Array<CategoryData>>;
  /**
   * @description
   * @see https://www.coingecko.com/api/documentations/v3#/categories
   * @param param.order The order to sort
   */
  listMarket: (params?: { order: string }) => Promise<CategoryListResponse>;
}
/**
 * @description
 * exchanges for `/exchanges` routes
 */
export interface ExchangesUrlObject {
  /**
   * List all exchanges
   * @see https://www.coingecko.com/api/documentations/v3#/exchanges/get_exchanges
   * @returns List all exchanges
   * @param params.per_page Total results per page (valid values: 1…250)
   * @default params.per_page = 100
   * @param params.page Page through results
   * @default params.page = 1
   * @category Exchange
   * @returns {Exchange[]} Get historical market data include price, market cap, and 24h volume
   */
  all: (params?: { per_page: number; page: string }) => Promise<Exchange[]>;
  /**
   * List all supported markets id and name (no pagination required)
   * @see https://www.coingecko.com/api/documentations/v3#/exchanges/get_exchanges_list
   * @returns Use this to obtain all the markets’ id in order to make API calls
   * @category Exchange
   * @returns {NameIdPair[]} Get historical market data include price, market cap, and 24h volume
   */
  list: () => Promise<NameIdPair[]>;
  /**
   * List all supported markets id and name (no pagination required)
   * @see https://www.coingecko.com/api/documentations/v3#/exchanges/get_exchanges__id_
   * @param id the exchange id (can be obtained from /exchanges/list) eg. binance
   * @returns Use this to obtain all the markets’ id in order to make API calls
   * ```
   * IMPORTANT:
   * Ticker object is limited to 100 items, to get more tickers, use /exchanges/{id}/tickers
   * Ticker is_stale is true when ticker that has not been updated/unchanged from the exchange for a while.
   * Ticker is_anomaly is true if ticker’s price is outliered by our system.
   * You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide)
   * ```
   * @category Exchange
   * @returns {ExchangeId} Get exchange volume in BTC and top 100 tickers only
   */
  fetchExchange: (id: string) => Promise<ExchangeIdData>;
  /**
   * Get exchange tickers (paginated, 100 tickers per page)
   * @see https://www.coingecko.com/api/documentations/v3#/exchanges/get_exchanges__id__tickers
   * @param id pass the exchange id (can be obtained from /exchanges/list) eg. binance
   * @param params.coin_ids filter tickers by coin_ids (ref: v3/coins/list)
   * @param params.include_exchange_logo flag to show exchange_logo
   * @param params.page Page through results
   * @param params.depth flag to show 2% orderbook depth i.e., cost_to_move_up_usd and cost_to_move_down_usd
   * @returns Use this to obtain all the markets’ id in order to make API calls
   * ```
   * IMPORTANT:
   * Ticker object is limited to 100 items, to get more tickers, use /exchanges/{id}/tickers
   * Ticker is_stale is true when ticker that has not been updated/unchanged from the exchange for a while.
   * Ticker is_anomaly is true if ticker’s price is outliered by our system.
   * You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide)
   * ```
   * @category Exchange
   * @returns {ExchangeIdTickerResponse} Get exchange volume in BTC and top 100 tickers only
   */
  fetchTickers: (
    id: string,
    params?: ExchangeTickersParams
  ) => Promise<ExchangeIdTickerResponse>;
  /**
   * Get status updates for a given exchange
   * @see https://www.coingecko.com/api/documentations/v3#/exchanges/get_exchanges__id__status_updates
   * @param id pass the exchange id (can be obtained from /exchanges/list) eg. binance
   * @param params.page Page through results
   * @param params.per_page Total results per page
   * @returns Get status updates for a given exchange
   * @category Exchange
   * @returns {CoinStatusUpdateResponse} Get status updates for a given exchange
   */
  fetchStatusUpdates: (
    id: string,
    params?: {
      per_page?: number;
      page?: number;
    }
  ) => Promise<CoinStatusUpdateResponse>;
  /**
   * Get status updates for a given exchange
   * @see https://www.coingecko.com/api/documentations/v3#/exchanges/get_exchanges__id__volume_chart
   * @param input.id pass the exchange id (can be obtained from /exchanges/list) eg. binance
   * @param input.days Data up to number of days ago (eg. 1,14,30)
   * @returns Get status updates for a given exchange
   * @category Exchange
   * @returns {CoinStatusUpdateResponse} Get status updates for a given exchange
   */
  fetchVolumeChart: (
    id: string,
    params: {
      days: number;
    }
  ) => Promise<Array<Array<number>>>;
}
/**
 * @description
 * interface for `/finance` routes
 */
export interface FinanceUrlObject {
  /**
   * List all finance platforms
   * @see https://www.coingecko.com/api/documentations/v3#/finance/get_finance_platforms
   * @param params.per_page Total results per page
   * @param params.page Data up to number of days ago (eg. 1,14,30)
   * @category Finance
   * @returns {Finance[]}
   */
  platforms: (params?: {
    per_page?: number;
    page?: string;
  }) => Promise<Array<FinancePlatform>>;

  /**
   * List all finance products
   * @see https://www.coingecko.com/api/documentations/v3#/finance/get_finance_products
   * @param params.per_page Total results per page
   * @param params.page Data up to number of days ago (eg. 1,14,30)
   * @param params.start_at
   * @param params.end_at
   * @category Finance
   * @returns {Finance[]}
   */
  products: (params?: {
    per_page?: number;
    page?: string;
    start_at?: string;
    end_at?: string;
  }) => Promise<Array<FinanceProduct>>;
}
/**
 * @description
 * interface `/indexes` routes
 */
export interface IndexesUrlObject {
  /**
   * List all market indexes
   * @see https://www.coingecko.com/api/documentations/v3#/indexes/get_indexes
   * @param params.per_page Total results per page
   * @param params.page Data up to number of days ago (eg. 1,14,30)
   * @category Indexes
   * @returns {IndexItem[]}
   */
  all: (params?: {
    per_page?: number;
    page?: number;
  }) => Promise<Array<IndexItem>>;

  /**
   * list market indexes id and name
   * @see https://www.coingecko.com/api/documentations/v3#/indexes/get_indexes_list
   * @category Indexes
   * @returns {NameIdPair[]}
   */
  list: () => Promise<Array<NameIdPair>>;

  /**
   * get market index by market id and index id
   * @see https://www.coingecko.com/api/documentations/v3#/indexes/get_indexes__market_id___id_
   * @param market_id pass the market id (can be obtained from /exchanges/list)
   * @param id pass the index id (can be obtained from /indexes/list)
   * @category Indexes
   * @returns {IndexItem[]}
   */
  fetchIndex: (marketId: string, id: string) => Promise<Array<IndexItem>>;
}
/**
 * @description
 * interface `/derivatives` routes
 */
export interface DerivativesUrlObject {
  /**
   * List all derivative tickers
   * @see https://www.coingecko.com/api/documentations/v3#/derivatives/get_derivatives
   * @param params.include_tickers Optional ['all’, ‘unexpired’] - expired to show unexpired tickers, all to list all tickers, defaults to unexpired
   * @category Derivatives
   * @returns {Derivative[]}
   */
  all: (params?: { include_tickers?: string }) => Promise<Array<Derivative>>;
  /**
   * List all derivative exchanges name and identifier
   * @see https://www.coingecko.com/api/documentations/v3#/derivatives/get_derivatives_exchanges_list
   * @category Derivatives
   * @returns {NameIdPair[]}
   */
  list: () => Promise<Array<NameIdPair>>;
  /**
   * List all derivative tickers
   * @see https://www.coingecko.com/api/documentations/v3#/derivatives/get_derivatives_exchanges
   * @param params.order order results using following params name_asc，name_desc，open_interest_btc_asc，open_interest_btc_desc，trade_volume_24h_btc_asc，trade_volume_24h_btc_desc
   * @param params.page Page through results
   * @param params.per_page  Total results per page
   * @category Derivatives
   * @returns {DerivativeExchange[]}
   */
  listDerivatives: (params?: {
    order?: string;
    per_page?: number;
    page?: number;
  }) => Promise<Array<DerivativeExchange>>;

  /**
   * show derivative exchange data
   * @see https://www.coingecko.com/api/documentations/v3#/derivatives/get_derivatives_exchanges__id_
   * @param params.id pass the exchange id (can be obtained from derivatives/exchanges/list) eg. bitmex
   * @param params.include_tickers ['all’, ‘unexpired’] - expired to show unexpired tickers, all to list all tickers, leave blank to omit tickers data in response
   * @category Derivatives
   * @returns {DerivativeExchange}
   */
  fetchDerivativeData: (
    id: string,
    params?: {
      include_tickers?: string;
    }
  ) => Promise<DerivativeExchange>;
}
