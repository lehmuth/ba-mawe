import { html, css, attach, defineComponent } from '../utils/components.js';
import { shoppingCart, products } from '../utils/shopping-cart.js';
import './counter-spinner.js';
import './size-select.js';

const template = html`
  <div id="container">
    <div id="image"></div>
    <div id="content">
      <div id="first-line">
        <div id="title"></div>
        <size-select id="size" value="0"></size-select>
        <div id="counter">
          <counter-spinner id="counter-value" value="1"></counter-spinner>X
        </div>
        <div id="price"><span id="price-value"></span>€</div>
      </div>
      <div id="subline"></div>
      <div id="donation">
        <span id="donation-value"></span>€ werden gespendet
      </div>
    </div>
  </div>
`;

const styles = css`
  #container {
    display: flex;
    flex-flow: row nowrap;
    border-bottom: solid 0.12em #000;
    padding: 1.25em 0;
  }

  #image {
    flex: 0 0 6em;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  #content {
    flex: 3 1 auto;
    display: flex;
    flex-flow: column nowrap;
    margin-left: 1em;
  }

  #first-line {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    justify-content: space-between;
    font-size: 1.5em;
  }

  #title {
    flex: 1;
  }

  #size {
    flex: 0 0 3em;
    visibility: hidden;
  }

  #size.sizable {
    visibility: visible;
  }

  #counter {
    flex: 0 0 3em;
    text-align: center;
  }

  #price {
    flex: 0 0 2em;
    text-align: right;
  }

  #subline,
  #donation {
    color: #585858;
  }
`;

defineComponent(
  'shopping-cart-element',
  class extends HTMLDivElement {
    static get observedAttributes() {
      return ['product-id'];
    }

    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.image = shadowRoot.querySelector('#image');
      this.titleElem = shadowRoot.querySelector('#title');
      this.size = shadowRoot.querySelector('#size');
      this.counter = shadowRoot.querySelector('#counter-value');
      this.price = shadowRoot.querySelector('#price-value');
      this.subline = shadowRoot.querySelector('#subline');
      this.donation = shadowRoot.querySelector('#donation-value');
      this.updateAmount = this.updateAmount.bind(this);
      this.updateSize = this.updateSize.bind(this);
    }

    connectedCallback() {
      this.productId = this.productId || 'test';
      this.render();
      this.size.addEventListener('change', this.updateSize);
      this.counter.addEventListener('change', this.updateAmount);
    }

    disconnectedCallback() {
      this.size.removeEventListener('change', this.updateSize);
      this.counter.removeEventListener('change', this.updateAmount);
    }

    get productId() {
      return this.getAttribute('product-id');
    }

    set productId(value) {
      this.setAttribute('product-id', value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        this.render();
      }
    }

    updateSize() {
      shoppingCart.updateSize(this.productId, this.size.value);
    }

    updateAmount() {
      shoppingCart.updateAmount(this.productId, this.counter.value);
    }

    render() {
      const product = products[this.productId];
      if (product) {
        this.image.style.backgroundImage = `url(${product.image})`;
        this.titleElem.innerHTML = product.name;
        this.price.innerHTML = product.price;
        this.subline.innerHTML = product.subline;
        this.donation.innerHTML = product.donation;
        const details = shoppingCart.get(this.productId);
        if (details) {
          if (product.sizable) {
            this.size.setAttribute('class', 'sizable');
            this.size.setAttribute('value', details.size);
          } else {
            this.size.removeAttribute('class');
          }
          this.counter.setAttribute('value', details.amount);
        }
      }
    }
  },
  'div'
);
