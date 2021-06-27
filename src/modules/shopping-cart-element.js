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
        <size-select id="size" value="0" class="desktop"></size-select>
        <div id="counter" class="desktop">
          <counter-spinner id="counter-value" value="1"></counter-spinner>X
        </div>
        <div id="price" class="desktop"><span id="price-value"></span>€</div>
      </div>
      <div id="subline"></div>
      <div id="donation">
        <span id="donation-value"></span>€ werden gespendet
      </div>
    </div>
    <div class="mobile">
      <size-select id="size-mobile" value="0"></size-select>
      <div id="counter-mobile">
        <counter-spinner id="counter-value-mobile" value="1"></counter-spinner>X
      </div>
      <div id="price-mobile"><span id="price-value-mobile"></span>€</div>
    </div>
  </div>
`;

const styles = css`
  #container {
    display: flex;
    flex-flow: row nowrap;
    border-bottom: solid 0.12em #000;
    padding: 1.25em 1.9em;
  }

  #image {
    flex: 0 0 4em;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  #content {
    flex: 1 1 calc(100% - 5em);
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

  .mobile {
    flex: 1 0 calc(100% - 2 * 1.9rem);
    display: none;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: baseline;
    margin: 1rem 0 0;
    font-size: 1.5em;
  }

  .mobile > * {
    flex: 1;
  }

  #size-mobile {
    visibility: hidden;
  }

  #size-mobile.sizable {
    visibility: visible;
  }

  #counter-mobile {
    text-align: center;
  }

  #price-mobile {
    text-align: right;
  }

  @media screen and (max-width: 590px) {
    #container {
      flex-wrap: wrap;
    }

    .desktop {
      display: none;
    }

    .mobile {
      display: flex;
    }
  }

  @media screen and (max-width: 410px) {
    #container {
      padding: 1.25em 0;
    }
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
      this.sizeMobile = shadowRoot.querySelector('#size-mobile');
      this.counter = shadowRoot.querySelector('#counter-value');
      this.counterMobile = shadowRoot.querySelector('#counter-value-mobile');
      this.price = shadowRoot.querySelector('#price-value');
      this.priceMobile = shadowRoot.querySelector('#price-value-mobile');
      this.subline = shadowRoot.querySelector('#subline');
      this.donation = shadowRoot.querySelector('#donation-value');
      this.updateAmount = this.updateAmount.bind(this);
      this.updateSize = this.updateSize.bind(this);
    }

    connectedCallback() {
      this.productId = this.productId || 'test';
      this.render();
      this.size.addEventListener('change', this.updateSize);
      this.sizeMobile.addEventListener('change', this.updateSize);
      this.counter.addEventListener('change', this.updateAmount);
      this.counterMobile.addEventListener('change', this.updateAmount);
    }

    disconnectedCallback() {
      this.size.removeEventListener('change', this.updateSize);
      this.sizeMobile.removeEventListener('change', this.updateSize);
      this.counter.removeEventListener('change', this.updateAmount);
      this.counterMobile.removeEventListener('change', this.updateAmount);
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
      this.render();
    }

    updateAmount() {
      shoppingCart.updateAmount(this.productId, this.counter.value);
      this.render();
    }

    render() {
      const product = products[this.productId];
      if (product) {
        this.image.style.backgroundImage = `url(${product.image})`;
        this.titleElem.innerHTML = product.name;
        this.price.innerHTML = product.price;
        this.priceMobile.innerHTML = product.price;
        this.subline.innerHTML = product.subline;
        this.donation.innerHTML = product.donation;
        const details = shoppingCart.get(this.productId);
        if (details) {
          if (product.sizable) {
            this.size.classList.add('sizable');
            this.size.setAttribute('value', details.size);
            this.sizeMobile.classList.add('sizable');
            this.sizeMobile.setAttribute('value', details.size);
          } else {
            this.size.classList.remove('sizable');
            this.sizeMobile.classList.remove('sizable');
          }
          this.counter.setAttribute('value', details.amount);
          this.counterMobile.setAttribute('value', details.amount);
        }
      }
    }
  },
  'div'
);
