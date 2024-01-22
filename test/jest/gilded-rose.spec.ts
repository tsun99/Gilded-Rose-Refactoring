import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should create foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

describe('Daily updates', () => {
  it('lower sellIn and quality on update', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 7, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
    expect(items[0].sellIn).toBe(6);
  });

  it('quality degrades twice as fast after sellIn date passes', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', -1, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(5);
    expect(items[0].sellIn).toBe(-2);
  });

  it('quality degrades twice as sellIn date reaches 0', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 0, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(5);
    expect(items[0].sellIn).toBe(-1);
  });

  it('quality is never negative', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });
});

describe('Aged Brie', () => {
  it('Aged Brie quality increases every day', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(1);
  });

  it('Quality is never more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 50)]);
    const [{ quality }] = gildedRose.updateQuality();
    expect(quality).toBe(50);
  });
});
