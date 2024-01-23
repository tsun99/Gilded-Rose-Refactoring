import { Item } from "../Item";
import { GildedRose } from "../gilded-rose";
import { makeApiRequest } from "./api";
import * as fs from "fs/promises";

async function main() {
  // receiving the input from the console
  const updates = parseInt(process.argv[2]);
  const requestsToApi = parseInt(process.argv[3]);

  // initializing the shop with items
  const items = [
    new Item("+5 Dexterity Vest", 10, 20), //
    new Item("Aged Brie", 2, 0), //
    new Item("Elixir of the Mongoose", 5, 7), //
    new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    new Item("Conjured Mana Cake", 3, 6),
  ];

  const gildedRose = new GildedRose(items);

  // looping through to update the shop and make api requests
  for (let i = 0; i < updates; i++) {
    let yesResponseCount = requestsToApi;

    while (yesResponseCount > 0) {
      // Promise.all returns a single boolean[] promise. If any of the requests fail, rejects.
      const apiResponses = await Promise.all(
        Array.from({ length: yesResponseCount }, makeApiRequest)
      );
      // updating how many 'yes' responses were received
      yesResponseCount = apiResponses.filter(
        (response) => response === true
      ).length;

      await fs.appendFile(
        "log.txt",
        `Update ${i + 1}: Yes count: ${yesResponseCount}\n`
      );
    }

    gildedRose.updateQuality();

    // console.log(gildedRose.items[1]);
  }
}

main();
