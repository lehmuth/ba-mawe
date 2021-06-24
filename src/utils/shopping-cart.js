export const products = {
  'cropped-t': {
    name: 'Cropped T',
    subline: 'BIO-Baumwoll T-Shirt mit Gegenstück für Patches',
    image: '/assets/cropped-t.jpg',
    donation: 5,
    price: 25,
    sizable: true,
  },
  'depression-is-real': {
    name: 'Patch: Depression is real',
    subline: '15 x 15 cm Kollektion Depression',
    image: '/assets/depression-is-real.jpg',
    donation: 5,
    price: 15,
    sizable: false,
  },
};

export const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

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
