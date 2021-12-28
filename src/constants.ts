import {
  Order,
  StatusUpdateCategoryType,
  StatusUpdateProjectType,
  EventType,
} from "../types/types.ts";

const BASE = "https://api.coingecko.com";
const HOST = "api.coingecko.com";
const API_VERSION = "3";
const URI = `${BASE}v${API_VERSION}`;
const REQUESTS_PER_SECOND = 10;
const TIMEOUT = 30000;

const ORDER: Order = {
  GECKO_ASC: "gecko_asc",
  GECKO_DESC: "gecko_desc",
  MARKET_CAP_ASC: "market_cap_asc",
  MARKET_CAP_DESC: "market_cap_desc",
  VOLUME_ASC: "volume_asc",
  VOLUME_DESC: "volume_desc",
  COIN_NAME_ASC: "coin_name_asc",
  COIN_NAME_DESC: "coin_name_desc",
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc",
  HOUR_24_ASC: "h24_change_asc",
  HOUR_24_DESC: "h24_change_desc",
  TRUST_SCORE_DESC: "trust_score_desc",
  NAME_ASC: "name_asc",
  NAME_DESC: "name_desc",
  OPEN_INTEREST_BTC_ASC: "open_interest_btc_asc",
  OPEN_INTEREST_BTC_DESC: "open_interest_btc_desc",
  TRADE_VOLUME_24H_BTC_ASC: "trade_volume_24h_btc_asc",
  TRADE_VOLUME_24H_BTC_DESC: "trade_volume_24h_btc_desc",
};

const STATUS_UPDATE_CATEGORY: StatusUpdateCategoryType = {
  GENERAL: "general",
  MILESTONE: "milestone",
  PARTNERSHIP: "partnership",
  EXCHANGE_LISTING: "exchange_listing",
  SOFTWARE_RELEASE: "software_release",
  FUND_MOVEMENT: "fund_movement",
  NEW_LISTINGS: "new_listings",
  EVENT: "event",
};

const STATUS_UPDATE_PROJECT_TYPE: StatusUpdateProjectType = {
  COIN: "coin",
  MARKET: "market",
};

const EVENT_TYPE: EventType = {
  EVENT: "Event",
  CONFERENCE: "Conference",
  MEETUP: "Meetup",
};

export default {
  BASE,
  HOST,
  API_VERSION,
  URI,
  REQUESTS_PER_SECOND,
  ORDER,
  STATUS_UPDATE_CATEGORY,
  STATUS_UPDATE_PROJECT_TYPE,
  EVENT_TYPE,
  TIMEOUT,
};
