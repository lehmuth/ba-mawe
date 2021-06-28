export const products = {
  'cropped-t': {
    name: 'Cropped T',
    subline: 'BIO-Baumwoll T-Shirt mit Gegenstück für Patches',
    image: '/assets/cropped-t.png',
    donation: 5,
    price: 25,
    sizable: true,
  },
  'oversized-t': {
    name: 'Oversized T',
    subline: 'BIO-Baumwoll T-Shirt mit Gegenstück für Patches',
    image: '/assets/oversized-t.png',
    donation: 5,
    price: 25,
    sizable: true,
  },
  rorschach: {
    name: 'Patch: Rorschach',
    subline: '7,5 x 10 cm Kollektion Depression',
    image: '/assets/rorschach.png',
    donation: 5,
    price: 10,
    sizable: false,
  },
  pain: {
    name: 'Patch: Pain',
    subline: '7,5 x 10 cm Kollektion Depression',
    image: '/assets/pain.png',
    donation: 5,
    price: 10,
    sizable: false,
  },
  'sea-food': {
    name: 'Patch: Sea Food',
    subline: '7,5 x 10 cm Kollektion Plastikverschmutzung',
    image: '/assets/seafood.png',
    donation: 5,
    price: 10,
    sizable: false,
  },
  fishbowl: {
    name: 'Patch: Fishbowl',
    subline: '7,5 x 10 cm Kollektion Plastikverschmutzung',
    image: '/assets/fishbowl.png',
    donation: 5,
    price: 10,
    sizable: false,
  },
  'nothing-to-wear': {
    name: 'Patch: Nothing To Wear',
    subline: '7,5 x 10 cm Kollektion Fast Fashion',
    image: '/assets/nothing-to-wear.png',
    donation: 5,
    price: 10,
    sizable: false,
  },
  human: {
    name: 'Patch: Human',
    subline: '7,5 x 10 cm Kollektion Rassismus',
    image: '/assets/human.png',
    donation: 5,
    price: 10,
    sizable: false,
  },
};

export const sizes = [
  'S (b)',
  'M (b)',
  'L (b)',
  'XL (b)',
  'XXL (b)',
  'S (w)',
  'M (w)',
  'L (w)',
  'XL (w)',
  'XXL (w)',
];

class ShoppingCart {
  constructor() {
    // Load current shopping cart
    this.items = JSON.parse(sessionStorage.getItem('shopping-cart')) || {};
  }

  add(id) {
    if (!this.items[id] && products[id]) {
      this.items[id] = {};
      this.items[id].amount = 1;
      if (products[id].sizable) {
        this.items[id].size = 0;
      }
      document.dispatchEvent(
        new CustomEvent('shopping-cart-changed', { detail: { id } })
      );
      sessionStorage.setItem('shopping-cart', JSON.stringify(this.items));
    }
  }

  get(id) {
    return this.items[id];
  }

  getAllIds() {
    return Object.keys(this.items);
  }

  updateAmount(id, amount) {
    if (products[id] && this.items[id] && amount !== this.items[id].amount) {
      if (amount > 0) {
        this.items[id].amount = amount;
      } else {
        delete this.items[id];
        document.dispatchEvent(
          new CustomEvent('shopping-cart-changed', { detail: { id } })
        );
      }
      sessionStorage.setItem('shopping-cart', JSON.stringify(this.items));
    }
  }

  updateSize(id, size) {
    if (
      products[id] &&
      products[id].sizable &&
      this.items[id] &&
      size !== this.items[id].size &&
      size >= 0 &&
      size < sizes.length
    ) {
      this.items[id].size = size;
      sessionStorage.setItem('shopping-cart', JSON.stringify(this.items));
    }
  }

  clear() {
    this.items = {};
    document.dispatchEvent(new CustomEvent('shopping-cart-changed'));
    sessionStorage.removeItem('shopping-cart');
  }
}

export const shoppingCart = new ShoppingCart();
