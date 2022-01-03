// default client for the API
// import GeckoClient from "./src/crypto-client.ts";
// export default GeckoClient;
export * from "./src/crypto-client.ts";

// Interfaces for the GeckoClient class
// export type {
//   GeckoApiClient,
//   CoinsUrlObject,
//   SimpleUrlObject,
//   ContractsUrlObject,
//   CategoriesUrlObject,
//   ExchangesUrlObject,
//   FinanceUrlObject,
//   IndexesUrlObject,
//   DerivativesUrlObject,
// } from "./types/interfaces.ts";
export * from "./types/interfaces.ts";
// Types: for QueryParams
// export type {
//   QueryParams,
//   RequestOptions,
//   AllCoinsQueryParams,
//   MarketsQueryParams,
//   CoinQueryParams,
//   TickersQueryParams,
//   FetchHistoryParams,
//   FetchMarketChartParams,
//   FetchMarketChartRangeParams,
//   FetchStatusUpdatesProps,
//   FetchOhlcParams,
//   SimplePriceParams,
//   SimpleTokenPriceParams,
//   ExchangeTickersParams,
//   /* CONSTANT MISC */
//   Order,
//   StatusUpdateCategoryType,
//   StatusUpdateProjectType,
//   EventType,
//   StatusUpdatesParams,
// } from "./types/types.ts";
export * from "./types/types.ts";
// Response Object Data From the Coin Gecko API
// export type {
//   PingResponse,
//   GlobalResponse,
//   GlobalDefiResponse,
//   CoinStatusUpdateResponse,
//   ExchangeRatesResponse,
//   TrendingResponse,
//   TopHoldingsResponse,
//   SimplePriceResponse,
//   TokenPriceResponse,
//   BasicCoin,
//   CoinListResponse,
//   CoinMarketData,
//   CoinFullInfo,
//   CoinTickerResponse,
//   CoinHistoryResponse,
//   CoinMarketChartResponse,
//   AssetPlatformData,
//   PLATFORMS,
//   CategoryData,
//   CategoryListResponse,
//   Exchange,
//   NameIdPair,
//   ExchangeIdData,
//   ExchangeIdTickerResponse,
//   FinancePlatform,
//   FinanceProduct,
//   IndexItem,
//   Derivative,
//   DerivativeExchange,
// } from "./types/gecko-data-interfaces.ts";
export * from "./types/gecko-data-interfaces.ts";
