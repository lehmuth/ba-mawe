import { html, css, attach, defineComponent } from '../utils/components.js';
import { shoppingCart } from '../utils/shopping-cart.js';
import './shopping-cart-element.js';

const template = html`<div id="container"></div>`;

const styles = css``;

defineComponent(
  'shopping-cart',
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.container = shadowRoot.querySelector('#container');
      this.render = this.render.bind(this);
    }

    connectedCallback() {
      document.addEventListener('shopping-cart-changed', this.render);
      this.render();
    }

    render() {
      this.container.innerHTML = '';
      for (let id of shoppingCart.getAllIds()) {
        let line = document.createElement('div', {
          is: 'shopping-cart-element',
        });
        line.setAttribute('product-id', id);
        this.container.appendChild(line);
      }
    }
  }
);
