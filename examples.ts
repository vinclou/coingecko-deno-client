/*
	Please do not run this file directly.
  Take snippets from it.
*/
import GeckoClient from "https://deno.land/x/coingecko_deno_client@v0.2.0/mod.ts";
// import GeckoClient from "./mod.ts";

async function test() {
  const client = new GeckoClient();

  const ping = await client.ping();
  console.log(ping);

  const gdata = await client.global();
  console.log(gdata);

  const defdata = await client.globalDefi();
  console.log(defdata);

  const statusUpdates = await client.listStatusUpdates({});
  console.log(statusUpdates);

  const exchangeRates = await client.exchangeRates();
  console.log(exchangeRates);

  const trending = await client.trending();
  console.log(trending);

  const holdings = await client.topHoldings();
  console.log(holdings);

  const simple = await client.simple.price({
    ids: "ethereum",
    vs_currencies: "usd",
  });
  console.log(simple);

  const coins = await client.coins.fetchCoin("ethereum");
  console.log(coins);

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

  // list of supported vs currencies
  const supportedVs = await client.simple.supportedVsCurrencies();
  console.log(supportedVs);

  const assetPlatforms = await client.contracts.assetPlatforms();
  console.log(assetPlatforms);

  const coinsAll = await client.coins.all();
  console.log(coinsAll);

  // fetch the list of coins with contrcat addresses
  const coinsList = await client.coins.list();
  console.log(coinsList);

  // coins with market data
  const market = await client.coins.markets({ vs_currency: "usd" });
  console.log(market);

  // fetch single coin data
  const fetchCoinData = await client.coins.fetchCoin("ethereum");
  console.log(fetchCoinData.categories);

  // fetch tickers
  const fetchTickers = await client.coins.fetchTickers("ethereum");
  console.log(fetchTickers);

  const history = await client.coins.fetchHistory("ethereum", {
    date: "01-01-2021",
  });
  console.log(history);

  const marketChart = await client.coins.fetchMarketChart("ethereum", {
    vs_currency: "usd",
    days: "3",
  });
  console.log(marketChart);

  // // unix timestamp
  const marketChartRange = await client.coins.fetchMarketChartRange(
    "ethereum",
    {
      vs_currency: "usd",
      from: "1543157627",
      to: "1641177627",
    }
  );
  console.log(marketChartRange);

  // // fetch cardano status updates
  const statusUpdatesCoins = await client.coins.fetchStatusUpdates("cardano");
  console.log(statusUpdatesCoins);

  // // fetch
  const ohlcData = await client.coins.fetchOhlc("bitcoin", {
    vs_currency: "usd",
    days: 1,
  });
  console.log(ohlcData);

  // fetch asset platforms
  const platforms = await client.contracts.assetPlatforms();
  console.log(platforms);

  // fetch contrcat data, given asset platform and the contrcat address
  const contractData = await client.contracts.fetchContract(
    "ethereum",
    "0x514910771AF9Ca656af840dff83E8264EcF986CA"
  );
  console.log(contractData);

  // fetch market chart
  const contractChart = await client.contracts.fetchContractMarketChart(
    "ethereum",
    "0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206",
    {
      vs_currency: "usd",
      days: "max",
    }
  );
  console.log(contractChart);

  // chart range
  const contractChartRange =
    await client.contracts.fetchContractMarketChartRange(
      "ethereum",
      "0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206",
      {
        vs_currency: "usd",
        from: 1543157627,
        to: 1641177627,
      }
    );
  console.log(contractChartRange);

  const categories = await client.categories.list();
  console.log(categories);

  const listCategories = await client.categories.listMarket();
  console.log(listCategories);

  /* Test Exchanges */

  const exchanges = await client.exchanges.all();
  console.log(exchanges);

  const exchangesList = await client.exchanges.list();
  console.log(exchangesList);

  const binance = await client.exchanges.fetchExchange("binance");
  console.log(binance);

  const binanceTickers = await client.exchanges.fetchTickers("binance");
  console.log(binanceTickers);

  const updates = await client.exchanges.fetchStatusUpdates("binance", {
    per_page: 1,
    page: 1,
  });
  console.log(updates);

  const volData = await client.exchanges.fetchVolumeChart("binance", {
    days: 1,
  });
  console.log(volData);

  const financePlatforms = await client.finance.platforms();
  console.log(financePlatforms);

  const products = await client.finance.products();
  console.log(products);

  const indxList = await client.indexes.list();
  console.log(indxList);

  const exList = await client.exchanges.list();
  console.log(exList);

  // test this one idk why it doesn't work
  const inxData = await client.indexes.fetchIndex("binance", "BTC");
  console.log(inxData);

  const deriv = await client.derivatives.list();
  console.log(deriv);

  const allDeriv = await client.derivatives.all();
  console.log(allDeriv);

  const listDeriv = await client.derivatives.listDerivatives();
  console.log(listDeriv);

  const singleDeriv = await client.derivatives.fetchDerivativeData("bitmex", {
    include_tickers: "unexpired",
  });
  console.log(singleDeriv);
}

test()
  .then(() => console.log("All example functions have been executed"))
  .catch((err) => {
    console.log(err.message);
  });
