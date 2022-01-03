// deno-lint-ignore-file camelcase
type QueryParams = {}; // this should hold all other params for request object

type RequestOptions = {
  resource: Request | string;
  init: RequestInit;
};

type AllCoinsQueryParams = {
  order?: string;
  limit?: number; // limit results per page
  page?: number;
  localization?: boolean; // default true
  sparkline?: boolean; // default false
};

/**
 * Filtered by category (eg. general, milestone, partnership, exchange_listing, software_release, fund_movement, new_listings, event)
 * Filtered by Project Type (eg. coin, market). If left empty returns both status from coins and markets.
 * Total results per page
 * Page Number
 */
type StatusUpdatesParams = {
  category?: string;
  project_type?: string;
  per_page?: number;
  page?: number;
};

type MarketsQueryParams = {
  vs_currency: string; // default USD
  ids?: Array<string> | string; // list of coin ids to filter
  order?: string;
  limit?: number;
  page?: number;
  sparkline?: boolean; // default false
};

type CoinQueryParams = {
  localization?: boolean; // default true
  tickers?: boolean; // default true, include tickers data
  market_data?: boolean; // default true, include market data
  community_data?: boolean; // default true, include community data
  developer_data?: boolean; // default true, include developer data
  sparkline?: boolean; // default false, include sparkline data
};

/**
 * @description Params for fetchTickers()
 * @param {string} id - coin id
 * @param {exchange_ids} array<string> | string - default undefined - list of exchange ids to filter
 * @param {include_exchanges_logo} [boolean] - default undefined, include exchange logo
 * @param {page} [number] - default undefined, page number
 * @param {order} string | string -  valid values: trust_score_desc (default), trust_score_asc and volume_desc
 * @param {depth} boolean - default false, this is a flag to show 2% orderbook depth
 */
type TickersQueryParams = {
  // pass the coin id (can be obtained from /coins/list) eg. bitcoin
  id: string;
  exchange_ids?: Array<string> | string; // list of exchange ids to filter
  include_exchange_logo?: boolean; // default false
  page?: number;
  order?: string;
  depth?: boolean;
};

/**
 * @description Params for fetchHistory()
 * @param {string} date - coin date in snapshot format dd-mm-yyyy
 * @param {boolean} localization - default false, e.g exclude localization data
 */
type FetchHistoryParams = {
  date: string;
  localization?: boolean;
};

/**
 * @description fetchMarketChart() params
 * @param  vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
 * @param  days [default: 1] - (Required) Data up to number of days ago (eg. 1,14,30,max)
 * @param  interval Optional value, e.x - daily, hourly, minutely
 */
type FetchMarketChartParams = {
  vs_currency: string;
  days: string;
  interval?: string;
};

/**
 * @description fetchMarketChartRange() params
 * @param {string} vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
 * @param {string} from - (Required) From date in UNIX Timestamp (eg. 1392577232)
 * @param {string} to - (Required) To date in UNIX Timestamp (eg. 1422577232)
 */
type FetchMarketChartRangeParams = {
  vs_currency: string;
  from: string;
  to: string;
};

/**
 * @description status updates for a given coin
 * @param {string} per_page - Total results per page
 * @param {string} page - Page through results
 */
type FetchStatusUpdatesProps = {
  per_page?: string;
  page?: string;
};

/**
 * @description candles body type
 * @param {string} vs_currency - The target currency of market data (usd, eur, jpy, etc.)
 * @param {number} days - Data up to number of days ago (1/7/14/30/90/180/365/max)
 */
type FetchOhlcParams = {
  vs_currency?: string;
  days?: number;
};

/**
 * @description simple.price() params
 * @param {array<string>|string} ids - required id of coins, comma-separated if querying more than 1 coin refers to coins/list
 * @param {array<string>|string} vs_currencies [default: usd] - A single id or a list of ids. Use simple.supportedVsCurrencies() for a list of vsCurrency ids. comma-separated if querying more than 1 coin refers to coins/list
 * @param {boolean} include_24hr_vol [default: false] - To include 24hr_vol (true/false)
 * @param {boolean} include_last_updated_at [default: false] - To include last_updated_at of price (true/false)
 */
type SimplePriceParams = {
  ids: Array<string> | string; // required
  vs_currencies: Array<string> | string; // required
  include_market_cap?: boolean; // default false
  include_24hr_vol?: boolean; // default false
  include_24hr_change?: boolean; // default false
  include_last_updated_at?: boolean; // default false
};

/**
 * @description simple.fetchTokenPrice() params
 * @param {array<string>|string} contract_addresses - (Required) Token’s contract address
 * @param {array<string>|string} vs_currencies - (Required) vs_currency of coins. Use simple.supportedVsCurrencies() for a list of vsCurrency ids.
 * @param {boolean} include_market_cap [default: false] - Include market cap in results or not
 * @param {boolean} include_24hr_vol [default: false] - Include 24hr volume in results or not
 * @param {boolean} include_24hr_change [default: false] - Include 24hr change in results or not
 * @param {boolean} include_last_updated_at [default: false] - Include last updated date in results or not
 */
type SimpleTokenPriceParams = {
  /**
   * The id of the platform issuing tokens(See asset_platforms endpoint for list of options)
   */
  // id: string; // required
  contract_addresses: Array<string> | string; // required
  vs_currencies: Array<string> | string; // required
  include_market_cap?: boolean; // default false
  include_24hr_vol?: boolean; // default false
  include_24hr_change?: boolean; // default false
  include_last_updated_at?: boolean; // default false
};

/**
 * @description exchanges.fetchTickers() params
 * @param {string} coin_ids - coin id
 * @param {string} include_exchange_logo - default false
 * @param {number} page - default 1
 * @param {string} depth - flag to show 2% orderbook depth i.e., cost_to_move_up_usd and cost_to_move_down_usd
 * @param {string} order - valid values: trust_score_desc (default), trust_score_asc and volume_desc
 */
type ExchangeTickersParams = {
  coin_ids?: string;
  include_exchange_logo?: string;
  page?: number;
  depth?: string;
  order?: string;
};

/* CONSTANT TYPES */
type Order = {
  GECKO_ASC: string;
  GECKO_DESC: string;
  MARKET_CAP_ASC: string;
  MARKET_CAP_DESC: string;
  VOLUME_ASC: string;
  VOLUME_DESC: string;
  COIN_NAME_ASC: string;
  COIN_NAME_DESC: string;
  PRICE_ASC: string;
  PRICE_DESC: string;
  HOUR_24_ASC: string;
  HOUR_24_DESC: string;
  TRUST_SCORE_DESC: string;
  NAME_ASC: string;
  NAME_DESC: string;
  OPEN_INTEREST_BTC_ASC: string;
  OPEN_INTEREST_BTC_DESC: string;
  TRADE_VOLUME_24H_BTC_ASC: string;
  TRADE_VOLUME_24H_BTC_DESC: string;
};

type StatusUpdateCategoryType = {
  GENERAL: string;
  MILESTONE: string;
  PARTNERSHIP: string;
  EXCHANGE_LISTING: string;
  SOFTWARE_RELEASE: string;
  FUND_MOVEMENT: string;
  NEW_LISTINGS: string;
  EVENT: string;
};

type StatusUpdateProjectType = {
  COIN: string;
  MARKET: string;
};

type EventType = {
  EVENT: string;
  CONFERENCE: string;
  MEETUP: string;
};

export type {
  QueryParams,
  RequestOptions,
  AllCoinsQueryParams,
  StatusUpdatesParams,
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
};
