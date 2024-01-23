import { Item } from "./Item";

enum itemType {
  AgedBrie = 'Aged Brie',
  BackstagePass = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
  Conjured = 'Conjured Mana Cake',
  Normal = 'Elixir of the Mongoose',
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      this.updateItemQuality(item)
    }

    return this.items;
  }

  private updateItemQuality(item: Item) {
    if (item.name != itemType.AgedBrie && item.name != itemType.BackstagePass) {
      if (item.quality > 0) {
        if (item.name != itemType.Sulfuras) {
          item.quality = item.quality - 1
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1
        if (item.name == itemType.BackstagePass) {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
        }
      }
    }
    if (item.name != itemType.Sulfuras) {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (item.name != itemType.AgedBrie) {
        if (item.name != itemType.BackstagePass) {
          if (item.quality > 0) {
            if (item.name != itemType.Sulfuras) {
              item.quality = item.quality - 1
            }
          }
        } else {
          item.quality = item.quality - item.quality
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
        }
      }
    }
  }
}
