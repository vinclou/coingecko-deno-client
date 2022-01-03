<div align="center">
 <h1>Coin Gecko API Client for Deno</h1>
 <h2>v0.2.1</h2>
</div>

<p align="center">
  <img src="https://usethebitcoin.com/wp-content/uploads/2018/03/CoinGecko.png" alt="Gecko image"/>
</p>

<p align="center">
<a href="https://vincentarlou.com" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-@vinclou-4BBAAB.svg" alt="Created by Vincent Arlou"></a>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/vinclou/coingecko-deno-client" alt="License"></a>
</p>

> Hi! Vincent here. I hope you find it easy to use and powerful enough for all your use cases. If you have any issues or suggestions, please [open an issue](https://github.com/vinclou/coingecko-deno-client/issues/new)!
>
> In the course of next month or so I will try to release a stable version of the client.
> It works but there a way too many things left to implement or change. If you'd like to help
> please open an issue or pull request!

<br/>

## Overview

API client library for Deno that allows you to work with the [Coin Gecko API](https://www.coingecko.com/en/api/documentation). I will be providing implementation for all the official routes listed. Yet for now, I have no plans to add tests because I do not own the API. For the latter I might actually do it, if I end up using this library on a constant basis.

## Notes

While I'm still working on a better docs inside readme, checkout examples.ts for use cases on every single route.

## Future plans

Add tests. Keep this up to date with the API. Better Error Handling. Better Docs.

## Contributions And Feedback

Feel free to open an issue or pull requests, for now there are no strict guidelines, I don't think this
small library needs any.

## Quick Start Example

```typescript
//1. Import coingecko-api
//Make sure you use the latest version of the library it can be specified in the url.
//It's just a note in case I ever forget to update it in this section of readme
import Client from "https://deno.land/x/coingecko_deno_client@v0.2.0/mod.ts";

//2. Initiate the CoinGecko API Client
const client = new GeckoClient();

// do not forget top level async function of course, or use .then()
//3. Make any desired call to the API
const ping = await CoinGeckoClient.ping();

// get token price given contract addresses
const tokenPrice = await client.simple.tokenPrice({
  // asset platform is ethereum
  contract_addresses: [
    "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    "0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206",
  ],
  vs_currencies: "usd",
});
console.log(tokenPrice);
```

## Making Calls

All calls using the CoinGeckoClient are asynchronous.

I try to keep the response types up to date with the API,
please do refer to the deno doc for the response types and ds.

The CoinGeckoClient splits up the currently available calls outline in the official CoinGecko API documentation parts into 8 objectparts. (Aside from the `ping`, `global`, `globalDefi`, `listStatusUpdates` `exchangeRates`, `trending`, `topHoldings` calls. These are direct methods inside main client).

The table below shows the available getters for each of the objects.
They strictly coincide with the API docs except for contracts it holds `asset_platforms` route.

| Namespace     | Usage                              | Description                           |
| ------------- | ---------------------------------- | ------------------------------------- |
| `simple`      | `CoinGeckoClient.simple[...]`      | Calls related to "simple" endpoints   |
| `coins`       | `CoinGeckoClient.coins[...]`       | Calls related to coins endpoints      |
| `contracts`   | `CoinGeckoClient.contracts[...]`   | Calls related to "contract" endpoints |
| `categories`  | `CoinGeckoClient.categories[...]`  | Calls related to status updates       |
| `exchanges`   | `CoinGeckoClient.exchanges[...]`   | Calls related to exchanges            |
| `finance`     | `CoinGeckoClient.finance[...]`     | Calls related to finance endpoints    |
| `indexes`     | `CoinGeckoClient.indexes[...]`     | Calls related to index endpoints      |
| `derivatives` | `CoinGeckoClient.derivatives[...]` | Calls related to derivative endpoints |

---

## Constants

This module provides helper constants for use in calls.

---

### `CoinGecko.ORDER`

Order results in specific calls by using one of the following values.
It's mostly made to remind you what constants are available, you might as well
just pass the desired string after referencing the ts doc instead of directly importing the object
when build query params.

| Key                | Usage                              | Description                                                    |
| ------------------ | ---------------------------------- | -------------------------------------------------------------- |
| `GECKO_ASC`        | `CoinGecko.ORDER.GECKO_ASC`        | Order results by CoinGecko's scoring system (ascending)        |
| `GECKO_DESC`       | `CoinGecko.ORDER.GECKO_DESC`       | Order results by CoinGecko's scoring system (descending)       |
| `MARKET_CAP_ASC`   | `CoinGecko.ORDER.MARKET_CAP_ASC`   | Order results by market cap (ascending)                        |
| `MARKET_CAP_DESC`  | `CoinGecko.ORDER.MARKET_CAP_DESC`  | Order results by market cap (descending)                       |
| `VOLUME_ASC`       | `CoinGecko.ORDER.VOLUME_ASC`       | Order results by volume (ascending)                            |
| `VOLUME_DESC`      | `CoinGecko.ORDER.VOLUME_DESC`      | Order results by volume (descending)                           |
| `COIN_NAME_ASC`    | `CoinGecko.ORDER.COIN_NAME_ASC`    | Order results by coin name (ascending)                         |
| `COIN_NAME_DESC`   | `CoinGecko.ORDER.COIN_NAME_DESC`   | Order results by coin name (descending)                        |
| `PRICE_ASC`        | `CoinGecko.ORDER.PRICE_ASC`        | Order results by price (ascending)                             |
| `PRICE_DESC`       | `CoinGecko.ORDER.PRICE_DESC`       | Order results by price (descending)                            |
| `HOUR_24_ASC`      | `CoinGecko.ORDER.HOUR_24_ASC`      | Order results by 24 hour change (ascending)                    |
| `HOUR_24_DESC`     | `CoinGecko.ORDER.HOUR_24_DESC`     | Order results by 24 hour change (descending)                   |
| `TRUST_SCORE_DESC` | `CoinGecko.ORDER.TRUST_SCORE_DESC` | Order results by CoinGecko's trust scoring system (descending) |

---

### `CoinGecko.STATUS_UPDATE_CATEGORY`

Available status update categories to filter by.

| Key                | Usage                                               | Description                                       |
| ------------------ | --------------------------------------------------- | ------------------------------------------------- |
| `GENERAL`          | `CoinGecko.STATUS_UPDATE_CATEGORY.GENERAL`          | Filter status update results by general news      |
| `MILESTONE`        | `CoinGecko.STATUS_UPDATE_CATEGORY.MILESTONE`        | Filter status update results by milestones        |
| `PARTNERSHIP`      | `CoinGecko.STATUS_UPDATE_CATEGORY.PARTNERSHIP`      | Filter status update results by partnerships      |
| `EXCHANGE_LISTING` | `CoinGecko.STATUS_UPDATE_CATEGORY.EXCHANGE_LISTING` | Filter status update results by exchange listings |
| `SOFTWARE_RELEASE` | `CoinGecko.STATUS_UPDATE_CATEGORY.SOFTWARE_RELEASE` | Filter status update results by software releases |
| `FUND_MOVEMENT`    | `CoinGecko.STATUS_UPDATE_CATEGORY.FUND_MOVEMENT`    | Filter status update results by fund movements    |
| `NEW_LISTINGS`     | `CoinGecko.STATUS_UPDATE_CATEGORY.NEW_LISTINGS`     | Filter status update results by new listings      |
| `EVENT`            | `CoinGecko.STATUS_UPDATE_CATEGORY.EVENT`            | Filter status update results by events            |

---

### `CoinGecko.STATUS_UPDATE_PROJECT_TYPE`

Available status update project types to filter by.

| Key      | Usage                                         | Description                                  |
| -------- | --------------------------------------------- | -------------------------------------------- |
| `COIN`   | `CoinGecko.STATUS_UPDATE_PROJECT_TYPE.COIN`   | Filter status update results by coins only   |
| `MARKET` | `CoinGecko.STATUS_UPDATE_PROJECT_TYPE.MARKET` | Filter status update results by markets only |

---

### `CoinGecko.EVENT_TYPE`

List of event types (most recent from `CoinGeckoClient.events.fetchTypes()`)

| Key          | Usage                             | Description                       |
| ------------ | --------------------------------- | --------------------------------- |
| `EVENT`      | `CoinGecko.EVENT_TYPE.EVENT`      | Filter events by _events_ only    |
| `CONFERENCE` | `CoinGecko.EVENT_TYPE.CONFERENCE` | Filter events by conferences only |
| `MEETUP`     | `CoinGecko.EVENT_TYPE.MEETUP`     | Filter events by meetups only     |

---

## License MIT
