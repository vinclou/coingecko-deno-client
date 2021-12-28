import Utils from "./utils.ts";
import Constants from "./constants.ts";

import {
  GeckoApiClient,
  CoinsUrlObject,
  SimpleUrlObject,
  ContractsUrlObject,
  CategoriesUrlObject,
  ExchangesUrlObject,
} from "../types/interfaces.ts";

import type {
  QueryParams,
  RequestOptions,
  AllQueryParams,
  StatusUpdatesParams,
  MarketsQueryParams,
  CoinQueryParams,
  TickersQueryParams,
  FetchHistoryParams,
  FetchMarketChartParams,
  FetchMarketChartRangeParams,
  FetchStatusUpdatesProps,
  SimplePriceParams,
  SimpleTokenPriceParams,
  Order,
  StatusUpdateCategoryType,
  StatusUpdateProjectType,
  EventType,
} from "../types/types.ts";

class Client implements GeckoApiClient {
  readonly ORDER: Order = Constants.ORDER;
  readonly API_VERSION: string = Constants.API_VERSION;
  readonly EVENT_TYPE: EventType = Constants.EVENT_TYPE;
  readonly REQUESTS_PER_SECOND: number = Constants.REQUESTS_PER_SECOND;
  readonly STATUS_UPDATE_CATEGORY: StatusUpdateCategoryType =
    Constants.STATUS_UPDATE_CATEGORY;
  readonly STATUS_UPDATE_PROJECT_TYPE: StatusUpdateProjectType =
    Constants.STATUS_UPDATE_PROJECT_TYPE;
  readonly TIMEOUT: number = Constants.TIMEOUT;

  /**
   * Pings Gecko server to check if it is alive.
   */
  ping(): Promise<void | Response> {
    const path = `/ping`;

    return this._request(path);
  }
  /**
   * `/global` read the api docs for more info
   * Get cryptocurrency global data
   */
  global(): Promise<void | Response> {
    const path = `/global`;

    return this._request(path, {});
  }
  /**
   * `/global/decentralized_finance_defi`
   * Get Top 100 Cryptocurrency Global Decentralized Finance(defi) data
   */
  globalDefi(): Promise<void | Response> {
    const path = `/global/decentralized_finance_defi`;

    return this._request(path);
  }
  /**
   * `/status_updates`
   * Default behavior is unknown, sorted by coin gecko itself,
   * I do not to plan to change it, if you want specific order,
   * provide the params, for more look at ts doc or official docs.
   */
  listStatusUpdates(params = {}): Promise<void | Response> {
    const path = `/status_updates`;

    return this._request(path, params);
  }
  /**
   * `/exchange_rates`
   * Get the exchange rates for all supported currencies
   * Relative to BTC
   */
  exchangeRates(): Promise<void | Response> {
    const path = `/exchange_rates`;

    return this._request(path);
  }

  trending(): Promise<void | Response> {
    const path = `/search/trending`;

    return this._request(path);
  }

  topHoldings(coinId = "bitcoin") {
    const path = `/companies/public_treasury/${coinId}`;

    return this._request(path);
  }
  // TODO: Refactor
  public get simple(): SimpleUrlObject {
    return {
      /* Actually bad design, should not really provide default values for it, ids */
      price: (
        params = {
          ids: "",
          vs_currencies: "",
        }
      ) => {
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

        const path = `/simple/price`;

        return this._request(path, params);
      },
      tokenPrice: (
        params = {
          id: "",
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
  // TODO: Go over code and fix it, possibly add types to be able skimming through the them
  public get coins(): CoinsUrlObject {
    const pathPrefix = `coins`;

    return {
      all: (params = {}) => {
        const path = `/${pathPrefix}`;

        return this._request(path, params);
      },
      list: () => {
        const path = `/${pathPrefix}/list`;

        return this._request(path);
      },
      markets: (
        params = {
          vs_currency: "",
        }
      ) => {
        const path = `/${pathPrefix}/markets`;

        //Must be object
        if (!Utils.isObject(params))
          return Promise.reject(
            `Invalid parameter, params must be an object, you have specified something else`
          );

        //If no params.vs_currency, set to default: 'usd'
        if (
          !Utils.isString(params["vsCurrency"]) ||
          Utils.isStringEmpty(params["vsCurrency"])
        ) {
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
  // TODO: Add all the methods
  public get contracts(): ContractsUrlObject {
    const pathPrefix = "coins";

    return {
      assetPlatforms: () => {
        const path = `/asset_platforms`;

        return this._request(path);
      },
      contract: (coinId, contract_address) => {
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
      // contractHistory: (coinId, )
    };
  }
  /*
    /coins/categories/list
  */
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
  /*
    /exchanges/...
  */
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
  /*
    TODO Add finance, indexes, derivatives routes
    /finance
  */

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
   */
  _request(path: string, params?: QueryParams): Promise<void | Response> {
    const { resource, init } = this._buildRequestParams(path, params);

    return fetch(resource, init).then(async (response) => {
      // Don't really like how I wrote this, work on it later
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
  }
}

async function test() {
  const client: GeckoApiClient = new Client();

  // here's an example of passing an array of ids to get prices for btc and eth
  let data = await client.simple.price({
    ids: ["bitcoin", "ethereum"],
    vs_currencies: "usd",
  });

  console.log(data);
  // here's an example of getting token price but the promise will throw an error
  // because id, contract_addresses and vs_currencies are not only required, but need to be valid
  // this library will throw an error if the params are not valid and not make the request to the api at all
  // but if you receive an empty object as a response usually it will mean, some of the params are wrong
  // try to manually test at least once your params. The client library will only check
  // simple stuff like types and length
  // data = await client.simple.tokenPrice({
  //   id: "",
  //   contract_addresses: "",
  //   vs_currencies: "",
  // });
  // console.log(data);
  // here I am making a valid call to the api
  // test this later
  // data = await client.simple.tokenPrice({
  //   id: "bitcoin",
  //   contract_addresses: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  //   vs_currencies: "usd",
  // });

  // gets a list of all supported currencies from coin gecko
  // data = await client.simple.supportedVsCurrencies();
  // console.log(data);

  // data = await client.coins.all();
  // console.log(data);

  // data = await client.coins.markets({
  //   vs_currency: "usd",
  //   order: "market_cap_desc",
  //   limit: 100,
  //   page: 1,
  //   sparkline: false,
  // });
  // console.log(data);

  // data = await client.coins.fetchCoin("bitcoin");
  // console.log(data);

  // data = await client.coins.fetchTickers("bitcoin");
  // console.log(data);

  // data = await client.coins.fetchHistory("bitcoin", { date: "01-01-2019" });
  // console.log(data);

  // data = await client.coins.fetchMarketChart("bitcoin", {
  //   vs_currency: "usd",
  //   days: "1",
  //   interval: "daily",
  // });
  // console.log(data);

  // data = await client.coins.fetchMarketChartRange("bitcoin", {
  //   vs_currency: "usd",
  //   from: "1392577232",
  //   to: "",
  // });
  // console.log(data);

  // data = await client.coins.fetchStatusUpdates("bitcoin");
  // console.log(data);

  // data = await client.coins.fetchOhlc("bitcoin", {
  //   vs_currency: "usd",
  //   days: 1,
  // });
  // console.log(data);

  /* Here's the end of coins endpoint tests */

  // let d = await client.contracts.assetPlatforms();
  // console.log(d);

  /* Here's the end of contracts endpoint dirty tests */
  // data = await client.categories.list();
  // console.log(data);

  // data = await client.categories.listMarket();
  // console.log(data);

  /* Test Exchanges */

  // data = await client.exchanges.all();
  // console.log(data);

  // data = await client.exchanges.fetchExchange("binance");
  // console.log(data);

  // data = await client.exchanges.fetchTickers("binance");
  // console.log(data);

  // data = await client.exchanges.fetchStatusUpdates("binance", {
  //   per_page: 1,
  //   page: 1,
  // });
  // console.log(data);

  // data = await client.exchanges.fetchVolumeChart("binance", { days: 1 });
  // console.log(data);

  // data = await client.topHoldings("ethereum");
  // console.log(data);
}
test()
  .then(() => console.log("Tests have been completed"))
  .catch((err) => {
    console.log(err.message);
  });

export default Client;
