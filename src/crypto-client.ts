import Utils from "./utils.ts";
import Constants from "./constants.ts";

import {
  GeckoApiClient,
  CoinsUrlObject,
  SimpleUrlObject,
  ContractsUrlObject,
  CategoriesUrlObject,
  ExchangesUrlObject,
  FinanceUrlObject,
  IndexesUrlObject,
  DerivativesUrlObject,
} from "../types/interfaces.ts";

import type {
  QueryParams,
  RequestOptions,
  StatusUpdatesParams,
  Order,
  StatusUpdateCategoryType,
  StatusUpdateProjectType,
  EventType,
} from "../types/types.ts";

import type {
  PingResponse,
  GlobalResponse,
  GlobalDefiResponse,
  CoinStatusUpdateResponse,
  ExchangeRatesResponse,
  TrendingResponse,
  TopHoldingsResponse,
} from "../types/gecko-data-interfaces.ts";

/**
 * @description
 * GeckoApiClient class
 * @example
 * ```const client = new GeckoClient()```
 * @see https://www.coingecko.com/api/documentations/v3
 * @functions
 * - `ping()`
 * - `global()`
 * - `globalDefi()`
 * - `listStatusUpdates()`
 * - `exchangeRates()`
 * - `trending()`
 * - `topHoldings()`
 * @methods
 * - `get simple`
 * - `get coins`
 * - `get contracts`
 * - `get categories`
 * - `get exchanges`
 * - `get finance`
 * - `get indexes`
 * - `get derivatives`
 * @readonly constants(for now, some will be implemented in the constructor)
 * - `Order`
 * - `API_VERSION`
 * - `EVENT_TYPE`
 * - `REQUESTS_PER_SECOND`
 * - `STATUS_UPDATE_CATEGORY`
 * - `STATUS_UPDATE_PROJECT_TYPE`
 * - `TIMEOUT`
 */
class GeckoClient implements GeckoApiClient {
  readonly ORDER: Order = Constants.ORDER;
  readonly API_VERSION: string = Constants.API_VERSION;
  readonly EVENT_TYPE: EventType = Constants.EVENT_TYPE;
  readonly REQUESTS_PER_SECOND: number = Constants.REQUESTS_PER_SECOND;
  readonly STATUS_UPDATE_CATEGORY: StatusUpdateCategoryType =
    Constants.STATUS_UPDATE_CATEGORY;
  readonly STATUS_UPDATE_PROJECT_TYPE: StatusUpdateProjectType =
    Constants.STATUS_UPDATE_PROJECT_TYPE;
  readonly TIMEOUT: number = Constants.TIMEOUT;

  ping(): Promise<PingResponse> {
    const path = `/ping`;

    return this._request(path);
  }

  global(): Promise<GlobalResponse> {
    const path = `/global`;

    return this._request(path, {});
  }

  globalDefi(): Promise<GlobalDefiResponse> {
    const path = `/global/decentralized_finance_defi`;

    return this._request(path);
  }

  listStatusUpdates(
    params: StatusUpdatesParams = {}
  ): Promise<CoinStatusUpdateResponse> {
    const path = `/status_updates`;

    return this._request(path, params);
  }

  exchangeRates(): Promise<ExchangeRatesResponse> {
    const path = `/exchange_rates`;

    return this._request(path);
  }

  trending(): Promise<TrendingResponse> {
    const path = `/search/trending`;

    return this._request(path);
  }

  topHoldings(coinId = "bitcoin"): Promise<TopHoldingsResponse> {
    const path = `/companies/public_treasury/${coinId}`;

    return this._request(path);
  }

  public get simple(): SimpleUrlObject {
    return {
      /* Actually bad design, should not really provide default values for it, ids */
      price: (
        params = {
          ids: "",
          vs_currencies: "",
        }
      ) => {
        const path = `/simple/price`;
        // Must be object
        if (!Utils.isObject(params))
          Promise.reject(`Invalid parameter, params must be of type: Object`);

        // Check the params.vs_currencies
        // If is string, ok. If is array, convert to string
        if (Utils.isArray(params["vs_currencies"])) {
          params.vs_currencies = params.vs_currencies.join(",");
        }

        // If no params.vs_currency, set to default: 'usd'
        if (
          !Utils.isString(params["vs_currencies"]) ||
          Utils.isStringEmpty(params["vs_currencies"])
        ) {
          params.vs_currencies = "usd";
        }

        // Check the params.ids
        // If is string, ok. If is array, convert to string
        if (Utils.isArray(params["ids"])) {
          params.ids = params.ids.join(",");
        }

        // Must have params.ids
        if (
          !Utils.isString(params["ids"]) ||
          Utils.isStringEmpty(params["ids"])
        )
          Promise.reject(
            `Invalid parameter, params.ids must be of type: String or Array and greater than 0 characters.`
          );

        return this._request(path, params);
      },
      /*

      */
      tokenPrice: (
        params = {
          // id: "",
          contract_addresses: "",
          vs_currencies: "",
        },
        assetPlatform = "ethereum"
      ) => {
        //Must be object
        if (!Utils.isObject(params))
          Promise.reject(`Invalid parameter, params must be of type: Object`);

        //Must have assetPlatform
        if (
          !Utils.isString(assetPlatform) ||
          Utils.isStringEmpty(assetPlatform)
        )
          Promise.reject(
            `Invalid parameter, assetPlatform must be of type: String and greater than 0 characters.`
          );

        //Must have contract_addresses, vs_currencies
        if (!params["contract_addresses"])
          Promise.reject(
            `Missing parameter, params must include contract_addresses and be a of type: String or Object`
          );
        if (!params["vs_currencies"])
          Promise.reject(
            `Missing parameter, params must include vs_currencies and be a of type: String or Object`
          );

        //If are arrays, convert to string
        if (Utils.isArray(params["contract_addresses"])) {
          params.contract_addresses = params.contract_addresses.join(",");
        }

        if (Utils.isArray(params["vs_currencies"])) {
          params.vs_currencies = params.vs_currencies.join(",");
        }

        const path = `/simple/token_price/${assetPlatform}`;

        return this._request(path, params);
      },
      supportedVsCurrencies: () => {
        const path = `/simple/supported_vs_currencies`;

        return this._request(path);
      },
    };
  }

  public get coins(): CoinsUrlObject {
    const pathPrefix = `coins`;

    return {
      all: (params = {}) => {
        const path = `/${pathPrefix}`;

        return this._request(path, params);
      },
      list: () => {
        const path = `/${pathPrefix}/list`;

        return this._request(path, { include_platform: true });
      },
      markets: (
        params = {
          vs_currency: "usd",
        }
      ) => {
        const path = `/${pathPrefix}/markets`;

        //Must be object
        if (!Utils.isObject(params))
          return Promise.reject(
            `Invalid parameter, params must be an object, you have specified something else`
          );

        //If no params.vs_currency, set to default: 'usd'
        if (Utils.isStringEmpty(params["vsCurrency"])) {
          params.vsCurrency = "usd";
        }

        //Check the params.ids
        //If is string, ok. If is array, convert to string
        if (Utils.isArray(params["ids"])) {
          params.ids = params.ids.join(",");
        }

        return this._request(path, params);
      },
      fetchCoin: (coinId, params = {}) => {
        // Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId))
          return Promise.reject(
            `Invalid parameter, Params must be an String, greater than 0`
          );

        const path = `/${pathPrefix}/${coinId}`;

        return this._request(path, params);
      },
      fetchTickers: (
        coinId,
        params = {
          id: "",
        }
      ) => {
        // Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId))
          return Promise.reject(
            `Invalid parameter, Params must be an String, greater than 0`
          );

        if (Utils.isArray(params["exchange_ids"])) {
          params.exchange_ids = params.exchange_ids.join(",");
        }

        const path = `/${pathPrefix}/${coinId}/tickers`;

        return this._request(path, params);
      },
      fetchHistory: (
        coinId,
        params = {
          date: "",
        }
      ) => {
        // Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId))
          Promise.reject(
            `Invalid parameter, coinId must be of type: String and greater than 0 characters.`
          );

        //If no params.date, set to default today/now
        if (
          !Utils.isString(params["date"]) ||
          Utils.isStringEmpty(params["date"])
        )
          Promise.reject(
            `Missing parameter params must include date and be a string in format: dd-mm-yyyy`
          );

        const path = `/${pathPrefix}/${coinId}/history`;

        return this._request(path, params);
      },
      fetchMarketChart: (
        coinId,
        params = {
          vs_currency: "usd",
          days: "1",
        }
      ) => {
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId))
          Promise.reject(
            "Invalid parameter: coinId must be of type: String and greater than 0 characters."
          );

        //If no params.vs_currency, set to default: 'usd'
        if (
          !Utils.isString(params["vs_currency"]) ||
          Utils.isStringEmpty(params["vs_currency"])
        ) {
          params.vs_currency = "usd";
        }

        //If no params.days, set to default: 1
        if (!Utils.isStringEmpty(params["days"])) {
          params.days = "1";
        }

        const path = `/${pathPrefix}/${coinId}/market_chart`;

        return this._request(path, params);
      },
      fetchMarketChartRange: (
        coinId,
        params = {
          vs_currency: "usd",
          from: "1392577232",
          to: "1422577232",
        }
      ) => {
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId))
          Promise.reject(
            "Invalid parameter: coinId must be of type: String and greater than 0 characters."
          );

        if (Utils.isStringEmpty(params["vs_currency"])) {
          params.vs_currency = "usd";
        }

        if (
          Utils.isStringEmpty(params["from"]) ||
          Utils.isStringEmpty(params["to"])
        ) {
          Promise.reject("Invalid Parameter: Empty from or to params.");
        }

        const path = `/${pathPrefix}/${coinId}/market_chart/range`;

        return this._request(path, params);
      },
      fetchStatusUpdates: (coinId, params = {}) => {
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId))
          Promise.reject(
            "Invalid parameter: coinId must be of type: String and greater than 0 characters."
          );

        const path = `/${pathPrefix}/${coinId}/status_updates`;

        return this._request(path, params);
      },
      fetchOhlc: (
        coinId,
        params = {
          vs_currency: "usd",
          days: 1,
        }
      ) => {
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId))
          Promise.reject(
            "Invalid parameter: coinId must be of type: String and greater than 0 characters."
          );

        const path = `/${pathPrefix}/${coinId}/ohlc`;

        return this._request(path, params);
      },
    };
  }

  public get contracts(): ContractsUrlObject {
    const pathPrefix = "coins";

    return {
      assetPlatforms: () => {
        const path = `/asset_platforms`;

        return this._request(path);
      },
      fetchContract: (coinId, contract_address) => {
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId))
          return Promise.reject(
            "Invalid parameter: coinId must be of type: String and greater than 0 characters."
          );
        if (
          !Utils.isString(contract_address) ||
          Utils.isStringEmpty(contract_address)
        )
          return Promise.reject(
            "Invalid parameter: contract_address must be of type: String and greater than 0 characters."
          );

        const path = `/${pathPrefix}/${coinId}/contract/${contract_address}`;

        return this._request(path);
      },
      // Look these if statement checks look silly, maybe get rid of them?
      fetchContractMarketChart: (
        id,
        contract_address,
        params = {
          vs_currency: "usd",
          days: "max",
        }
      ) => {
        const path = `/${pathPrefix}/${id}/contract/${contract_address}/market_chart/`;

        if (!Utils.isString(id) || Utils.isStringEmpty(id))
          return Promise.reject(
            "Invalid parameter: id must be of type: String and greater than 0 characters."
          );
        if (
          !Utils.isString(contract_address) ||
          Utils.isStringEmpty(contract_address)
        )
          return Promise.reject(
            "Invalid parameter: contract_address must be of type: String and greater than 0 characters."
          );

        return this._request(path, params);
      },
      // Look these if statement checks look silly, maybe get rid of them?
      fetchContractMarketChartRange: (
        id,
        contract_address,
        params = {
          vs_currency: "",
          from: -1,
          to: -1,
        }
      ) => {
        const path = `/${pathPrefix}/${id}/contract/${contract_address}/market_chart/range/`;

        if (!Utils.isString(id) || Utils.isStringEmpty(id))
          return Promise.reject(
            "Invalid parameter: id must be of type: String and greater than 0 characters."
          );
        if (
          !Utils.isString(contract_address) ||
          Utils.isStringEmpty(contract_address)
        )
          return Promise.reject(
            "Invalid parameter: contract_address must be of type: String and greater than 0 characters."
          );

        if (params.from === -1 || params.to === -1)
          return Promise.reject("Invalid Parameter: Empty from or to params.");

        if (Utils.isStringEmpty(params.vs_currency))
          return Promise.reject("Invalid Parameter: Empty vs_currency param.");

        return this._request(path, params);
      },
    };
  }

  public get categories(): CategoriesUrlObject {
    const pathPrefix = "coins/categories";

    return {
      list: () => {
        const path = `/${pathPrefix}/list`;
        return this._request(path);
      },
      /*
        default market_cap_desc
        /coins/categories
      */
      listMarket: (params = { order: "market_cap_desc" }) => {
        const path = `/${pathPrefix}`;
        return this._request(path, params);
      },
    };
  }

  public get exchanges(): ExchangesUrlObject {
    const pathPrefix = "exchanges";

    return {
      all: (
        params = {
          per_page: 100,
          page: "1",
        }
      ) => {
        const path = `/${pathPrefix}`;

        return this._request(path, params);
      },
      list: () => {
        const path = `/${pathPrefix}/list`;

        return this._request(path);
      },
      fetchExchange: (id) => {
        if (!Utils.isString(id) || Utils.isStringEmpty(id))
          return Promise.reject(
            "Invalid parameter: id must be of type: String and greater than 0 characters."
          );

        const path = `/${pathPrefix}/${id}`;
        return this._request(path);
      },
      fetchTickers: (id, params = {}) => {
        if (!Utils.isString(id) || Utils.isStringEmpty(id))
          return Promise.reject(
            "Invalid parameter: id must be of type: String and greater than 0 characters."
          );

        const path = `/${pathPrefix}/${id}`;
        return this._request(path, params);
      },
      fetchStatusUpdates: (id, params = {}) => {
        if (!Utils.isString(id) || Utils.isStringEmpty(id))
          return Promise.reject(
            "Invalid parameter: id must be of type: String and greater than 0 characters."
          );

        const path = `/${pathPrefix}/${id}/status_updates`;
        return this._request(path, params);
      },
      fetchVolumeChart: (
        id,
        params = {
          days: 1,
        }
      ) => {
        if (!Utils.isString(id) || Utils.isStringEmpty(id))
          return Promise.reject(
            "Invalid parameter: id must be of type: String and greater than 0 characters."
          );

        const path = `/${pathPrefix}/${id}/volume_chart`;
        return this._request(path, params);
      },
    };
  }

  public get finance(): FinanceUrlObject {
    return {
      platforms: (
        params = {
          per_page: 100,
          page: "1",
        }
      ) => {
        const path = "/finance_platforms";

        return this._request(path, params);
      },
      products: (
        params = {
          per_page: 100,
          page: "1",
        }
      ) => {
        const path = "/finance_products";

        return this._request(path, params);
      },
    };
  }

  public get indexes(): IndexesUrlObject {
    const pathPrefix = "indexes";

    return {
      all: (params = { per_page: 100, page: 1 }) => {
        const path = `/${pathPrefix}`;

        return this._request(path, params);
      },
      list: () => {
        const path = `/${pathPrefix}/list`;

        return this._request(path);
      },
      fetchIndex: (marketId: string, id: string) => {
        if (!Utils.isString(marketId) || Utils.isStringEmpty(marketId))
          return Promise.reject(
            "Invalid parameter: marketId must be of type: String and greater than 0 characters."
          );
        if (!Utils.isString(id) || Utils.isStringEmpty(id))
          return Promise.reject(
            "Invalid parameter: Index Id must be of type: String and greater than 0 characters."
          );

        const path = `/${pathPrefix}/${marketId}/${id}`;

        return this._request(path);
      },
    };
  }

  public get derivatives(): DerivativesUrlObject {
    const pathPrefix = "derivatives";

    return {
      all: (params = { include_tickers: "unexpired" }) => {
        const path = `/${pathPrefix}`;

        return this._request(path, params);
      },
      list: () => {
        const path = `/${pathPrefix}/exchanges/list`;

        return this._request(path);
      },
      listDerivatives: (params = {}) => {
        const path = `/${pathPrefix}/exchanges`;

        return this._request(path, params);
      },
      fetchDerivativeData: (id: string, params = {}) => {
        if (!Utils.isString(id) || Utils.isStringEmpty(id))
          return Promise.reject(
            "Invalid parameter: id must be of type: String and greater than 0 characters."
          );

        const path = `/${pathPrefix}/exchanges/${id}`;

        return this._request(path, params);
      },
    };
  }
  /**
   * This function is not indented to be used by the user, ideally should be private
   *
   * TODO: Remove console.logs on the params build, rn it's just for debugging
   * Check if isEmptyObject function works as expected
   */
  _buildRequestParams(path: string, params?: unknown): RequestOptions {
    let builtParams: URLSearchParams | undefined;
    let builtPath: string;

    // stringify the params if they exist
    if (Utils.isObject(params) && !Utils.isEmptyObject(params)) {
      builtParams = new URLSearchParams(params);
    } else {
      builtParams = undefined;
    }
    // Build relative path and append params if they exist
    if (params === undefined || Utils.isEmptyObject(params)) {
      builtPath = `${Constants.BASE}/api/v${this.API_VERSION}${path}`;
      console.log("params is undefined", builtPath);
    } else {
      builtPath = `${Constants.BASE}/api/v${this.API_VERSION}${path}?${builtParams}`;
      console.log("params were defined", builtPath);
    }

    // work on it later
    const init: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return {
      resource: builtPath,
      init,
    };
  }

  /**
   * This function is not indented to be used by the user, ideally should be private
   * TODO:
   * 1. Add refetching logic
   * 2. Add max cap on the number of requests
   * 3. Fix the type, currently returns Promise<any>, but better to return Promise<T>, something wrong with deno
   */
  // deno-lint-ignore no-explicit-any
  _request(path: string, params?: QueryParams): Promise<any> {
    const { resource, init } = this._buildRequestParams(path, params);

    // set an abort controller, default is 3000ms
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.TIMEOUT);

    return fetch(resource, {
      ...init,
      signal: controller.signal,
    }).then(async (response) => {
      // Don't really like how I wrote this, work on it later
      const data = await response.json();

      if (response.ok) {
        clearTimeout(timeout);
        return data;
      } else {
        return Promise.reject(data);
      }
    });
  }
}

export default GeckoClient;
