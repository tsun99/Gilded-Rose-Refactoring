import { Item } from "./Item";

enum ItemType {
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
    if (item.name != ItemType.AgedBrie && item.name != ItemType.BackstagePass) {
        if (item.name != ItemType.Sulfuras) {
          this.changeQuality(item, -1);
        }
    } else {
        this.changeQuality(item, 1)
        if (item.name == ItemType.BackstagePass) {
          if (item.sellIn < 11) {
              this.changeQuality(item, 1)
          }
          if (item.sellIn < 6) {
              this.changeQuality(item, 1)
          }
      }
    }
    if (item.name != ItemType.Sulfuras) {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (item.name != ItemType.AgedBrie) {
        if (item.name != ItemType.BackstagePass) {
            if (item.name != ItemType.Sulfuras) {
              this.changeQuality(item, -1);
            }
        } else {
          item.quality = item.quality - item.quality
        }
      } else {
          this.changeQuality(item, 1);
      }
    }
  }

  private changeQuality(item: Item, by: number) {
    if(item.quality + by >= 0 && item.quality + by <= 50) {
      item.quality = item.quality + by;
    }
  }
}
