import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should create foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

describe('Daily updates', () => {
  it('should lower sellIn and quality on update', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 7, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
    expect(items[0].sellIn).toBe(6);
  });

  it('should degrade quality twice as fast after sellIn date passes', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', -1, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(5);
    expect(items[0].sellIn).toBe(-2);
  });

  it('should degrade quality twice as fast when sellIn date reaches 0', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 0, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(5);
    expect(items[0].sellIn).toBe(-1);
  });

  test('if quality never becomes negative', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });
});

describe('Aged Brie', () => {
  it('should increase quality every day', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(1);
  });

  test('if quality never becomes more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 50)]);
    const [{ quality }] = gildedRose.updateQuality();
    expect(quality).toBe(50);
  });
});

describe('Sulfuras', () => {
  it('should not update quality and sellIn', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 11)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
    expect(items[0].sellIn).toBe(1);
  });
});

describe('Backstage passes', () => {
  it('should increase quality by 1 when sellIn > 10', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(16);
    expect(items[0].sellIn).toBe(10);
  });

  it('should increase quality by 2 when sellIn <= 10', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(17);
    expect(items[0].sellIn).toBe(9);
  });

  it('should increase quality by 3 when sellIn <= 5', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
    expect(items[0].sellIn).toBe(3);
  });

  it('it should drop quality to 0 after sellIn becomes negative', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 15)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });
});

describe('Conjured', () => {
  it('should degrade quality by 2 when sellIn > 0', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 3, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
    expect(items[0].sellIn).toBe(2);
  });

  it('should degrade quality by 4 when sellIn < 0', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
    expect(items[0].sellIn).toBe(-1);
  });

  test('if quality never becomes less than 0', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', -1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-2);
  });
});