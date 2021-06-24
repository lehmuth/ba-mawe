import { html, css, attach, defineComponent } from '../utils/components.js';
import { shoppingCart, products } from '../utils/shopping-cart.js';

const template = html`
  <div id="container">
    <div id="horizontal" class="bar"></div>
    <div id="vertical" class="bar"></div>
  </div>
`;

const styles = css`
  :host {
    display: inline-block;
  }

  #container {
    padding: 0.5em 0.25em;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 3em;
    height: 3em;
    background-color: #000;
    border: solid black 0.2em;
    transition: all 0.2s linear;
    cursor: pointer;
  }

  :host([rotate]) #container {
    padding: 0.25em 0.5em;
  }

  .bar {
    height: 0.2em;
    width: 100%;
    background-color: #fff;
    transition: all 0.2s linear;
  }

  #vertical {
    transform: translate(0, -0.1em) rotate(90deg);
  }

  #container:hover {
    background-color: #fff;
  }

  #container:hover .bar {
    background-color: #000;
  }
`;

defineComponent(
  'plus-button',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['product-id'];
    }

    constructor() {
      super();
      attach(this, template, styles);
      this.addToCart = this.addToCart.bind(this);
    }

    connectedCallback() {
      this.addEventListener('click', this.addToCart);
    }

    disconnectedCallback() {
      this.removeEventListener('click', this.addToCart);
    }

    get productId() {
      return this.getAttribute('product-id');
    }

    set productId(value) {
      this.setAttribute('product-id', value);
    }

    addToCart() {
      if (this.productId && products[this.productId]) {
        shoppingCart.add(this.productId);
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: { count: shoppingCart.items.length, item: this.productId },
          })
        );
      }
    }
  }
);
