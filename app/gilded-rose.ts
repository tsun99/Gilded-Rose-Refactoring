import { Item } from "./Item";

enum ItemType {
  AgedBrie = "Aged Brie",
  BackstagePass = "Backstage passes to a TAFKAL80ETC concert",
  Sulfuras = "Sulfuras, Hand of Ragnaros",
  Conjured = "Conjured Mana Cake",
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      this.updateItemQuality(item);
    }

    return this.items;
  }

  private updateItemQuality(item: Item) {
    let qualityDegradeRate = this.calculateDegradeRate(item);
    let doesItemDegrade: boolean =
      !(item.name === ItemType.BackstagePass) &&
      !(item.name === ItemType.AgedBrie) &&
      !(item.name === ItemType.Sulfuras);

    if (doesItemDegrade) {
      this.changeQuality(item, qualityDegradeRate);
    }

    if (
      item.name === ItemType.AgedBrie ||
      item.name === ItemType.BackstagePass
    ) {
      this.changeQuality(item, 1);
    }

    if (item.name == ItemType.BackstagePass) {
      if (item.sellIn < 11) {
        this.changeQuality(item, 1);
      }
      if (item.sellIn < 6) {
        this.changeQuality(item, 1);
      }
      if (item.sellIn <= 0) {
        item.quality = 0;
      }
    }

    if (item.name != ItemType.Sulfuras) {
      item.sellIn = item.sellIn - 1;
    }

    if (item.sellIn < 0 && item.name === ItemType.AgedBrie) {
      this.changeQuality(item, 1);
    }

  }

  private changeQuality(item: Item, by: number) {
    if (item.quality + by < 0) {
      item.quality = 0;
    } else if (item.quality + by > 50) {
      item.quality = 50;
    } else {
      item.quality = item.quality + by;
    }
  }

  private calculateDegradeRate(item: Item): number {
    let degradeRate = item.name === ItemType.Conjured ? -2 : -1;
    
    if (item.sellIn <= 0) {
      degradeRate *= 2;
    }
    return degradeRate;
  }
}
