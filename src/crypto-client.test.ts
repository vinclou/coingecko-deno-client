/*
	I hope this file will be a very minimal implementation of the tests needed
	To run these tests deno test --allow-net
*/
import GeckoClient from "./crypto-client.ts";
import {
  beforeEach,
  describe,
  expect,
  it,
  run,
} from "https://deno.land/x/tincan/mod.ts";

const client = new GeckoClient();

// Global Client Tests
describe("GeckoClient tests", () => {
  it("ping should successful", async () => {
    const ping = await client.ping();
    expect(ping).toEqual({ gecko_says: "(V3) To the Moon!" });
  });
});

run();
