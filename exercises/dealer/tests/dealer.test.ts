import { Dealer, Suit, CardNumber } from '../src/dealer';

let exp = expect as jest.Expect;
type Card = [Suit, CardNumber];

if (Dealer) {
  test('Dealer is available as a named export from ./src/dealer.ts', () => {
    exp(Dealer).toBeDefined();
  });

  test('CardNumber is available as a named export from ./src/dealer.ts', () => {
    exp(CardNumber).toBeDefined();
  });

  test('Suit is available as a named export from ./src/dealer.ts', () => {
    exp(Suit).toBeDefined();
  });

  test('13 members in the CardNumber enum', () => {
    exp(Object.keys(CardNumber).length / 2).toBe(13);
  });

  test('4 members in the Suit enum', () => {
    exp(Object.keys(Suit).length / 2).toBe(4);
  });

  test('dealer.readCard([0, 6]) -> "Seven of Clubs" ', () => {
    let dealer = new Dealer();
    exp(dealer.readCard([0, 6])).toBe('Seven of Clubs');
  });

  test('A new dealer has 52 cards - via dealer.getLength() ', () => {
    let dealer = new Dealer();
    exp(dealer.getLength()).toBe(52);
  });

  test('dealer.dealHand(numCards) returns a hand of cards (array of size-2 tuples)', () => {
    let dealer = new Dealer();
    let cards = dealer.dealHand(1);
    exp(typeof cards).toBe('object');
    exp(typeof cards.map).toBe('function');
    exp(typeof cards[0]).toBe('object');
    exp(typeof cards[0].map).toBe('function');
    exp(cards[0].length).toBe(2);
  });

  test('dealer.dealHand(numCards) returns the correct number of cards', () => {
    let dealer = new Dealer();
    let cards = dealer.dealHand(5);
    exp(cards.length).toBe(5);
  });

  test('dealer.dealHand(numCards) throws an error if you ask for too many cards', () => {
    let dealer = new Dealer();
    exp(() => {
      dealer.dealHand(53);
      dealer.dealHand(53);
      dealer.dealHand(53);
      dealer.dealHand(53);
      dealer.dealHand(53);
      dealer.dealHand(53);
    }).toThrow();
  });

  test('dealer.dealHand(numCards) throws an error if you ask for a negative number of cards', () => {
    let dealer = new Dealer();
    exp(() => {
      dealer.dealHand(-1);
    }).toThrow();
  });

  test('deck contains 13 cards per suit, and 4 per number', () => {
    let dealer = new Dealer();
    let cards = dealer.dealHand(52);
    let numberCounts = new Array(13).fill(0, 0);
    let suitCounts = new Array(4).fill(0, 0);
    cards.forEach(([suit, number]: Card) => {
      numberCounts[number]++;
      suitCounts[suit]++;
    });

    numberCounts.forEach((count, num) => {
      expect(`${count} cards in the deck for number ${CardNumber[num]}`).toBe(
        `4 cards in the deck for number ${CardNumber[num]}`
      );
    });
    suitCounts.forEach((count, suit) => {
      expect(`${suitCounts[suit]} cards in the deck for suit ${Suit[suit]}`).toBe(
        `13 cards in the deck for suit ${Suit[suit]}`
      );
    });
  });

  test('Cards are represented as [Suit(0-3), CardNumber(0-12)]', () => {
    let dealer = new Dealer();
    let cards = dealer.dealHand(52);
    cards.forEach(([suit, num]: Card) => {
      exp(suit).toBeLessThan(4);
      exp(suit).toBeGreaterThan(-1);
      exp(num).toBeLessThan(13);
      exp(num).toBeGreaterThan(-1);
    });
  });

  test('resetCards should unshuffle the deck', () => {
    const dealer = new Dealer();
    const origCards = dealer.cards;
    dealer.shuffleCards(dealer.cards);
    dealer.shuffleCards(dealer.cards);
    dealer.shuffleCards(dealer.cards);
    dealer.resetCards();
   setTimeout(() => {
     exp(dealer.cards).toEqual(origCards);
   }, 3000);
  });
} else {
  describe('Instructions', () => {
    test('Please uncomment the Dealer class in dealer/src/dealer.ts', () => {
      expect(true).toBeTruthy();
    });
  });
}
