import { Item } from "../Item";
import { GildedRose } from "../gilded-rose";
import { makeApiRequest } from './api';

async function main() {
    const updates = parseInt(process.argv[2]);
    const requestsToApi = parseInt(process.argv[3]);

    const items = [
        new Item("+5 Dexterity Vest", 10, 20), //
        new Item("Aged Brie", 2, 0), //
        new Item("Elixir of the Mongoose", 5, 7), //
        new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
        new Item("Sulfuras, Hand of Ragnaros", -1, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
        new Item("Conjured Mana Cake", 3, 6)];
      
      const gildedRose = new GildedRose(items);

      for (let i = 0; i < updates; i++) {
        let yesResponseNumber = requestsToApi;
        while (yesResponseNumber > 0) {
          const apiResponses = await Promise.all(Array.from({length: yesResponseNumber}, makeApiRequest));
          yesResponseNumber = apiResponses.filter(response => response === true).length;
          
          
          //TODO: Response to log.txt
          console.log(apiResponses);
          console.log(yesResponseNumber);
        }
        break;
        gildedRose.updateQuality();
      }
}

main();