import { html, css, attach, defineComponent } from '../utils/components.js';
import { shoppingCart } from '../utils/shopping-cart.js';

const template = html`<a href="/checkout.html"
  ><svg
    id="Ebene_1"
    data-name="Ebene 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 339.37 315.32"
  >
    <defs>
      <style>
        .cls-1,
        .cls-2,
        .cls-3 {
        }
        .cls-1,
        .cls-3 {
          stroke-miterlimit: 10;
        }
        .cls-2,
        .cls-3 {
          fill: none;
        }
        .cls-2 {
          stroke-linejoin: bevel;
        }
      </style>
    </defs>
    <polyline
      class="cls-1"
      points="0 15 52.72 15 120.67 169.18 251.35 169.18 314.94 43.75 75.37 43.75"
    />
    <polyline class="cls-2" points="116.79 169.18 87.46 220.52 302.73 220.52" />
    <rect
      class="cls-3"
      x="229.82"
      y="387.73"
      width="29.1"
      height="29.1"
      rx="14.55"
      transform="translate(-32.87 -160.62) rotate(12.76)"
    />
    <rect
      class="cls-3"
      x="375.49"
      y="387.79"
      width="29.1"
      height="29.1"
      rx="14.55"
      transform="translate(740.17 578.39) rotate(165.59)"
    /></svg
></a>`;

const styles = css`
  :host {
    display: inline-block;

    --shopping-cart-icon-size: 1em;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    width: var(--shopping-cart-icon-size);
    height: var(--shopping-cart-icon-size);
    text-decoration: none;
    background-color: transparent;
    transition: all 0.3s linear;
    padding: 0.5rem;
    visibility: visible;
    opacity: 1;
  }

  a:hover {
    background-color: #fff;
  }

  a svg {
    object-fit: cover;
  }

  .cls-1,
  .cls-2,
  .cls-3 {
    stroke: #fff;
    stroke-width: 30px;
    transition: all 0.3s linear;
  }

  .cls-1 {
    fill: #fff;
  }

  a:hover .cls-1,
  a:hover .cls-2,
  a:hover .cls-3 {
    stroke: #000;
  }

  a:hover .cls-1 {
    fill: #000;
  }

  .hidden {
    visibility: hidden;
    opacity: 0;
  }
`;

defineComponent(
  'shopping-cart-icon',
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.icon = shadowRoot.querySelector('a');
      this.render = this.render.bind(this);
    }

    connectedCallback() {
      document.addEventListener('shopping-cart-changed', this.render);
      this.render();
    }

    render() {
      const itemCount = shoppingCart.getAllIds().length;
      if (window.location.pathname !== '/checkout.html' && itemCount > 0) {
        if (this.icon.classList.contains('hidden')) {
          this.icon.classList.remove('hidden');
        } else {
          this.icon.classList.add('hidden');
          setTimeout(() => {
            this.icon.classList.remove('hidden');
          }, 300);
        }
      } else {
        this.icon.classList.add('hidden');
      }
    }
  }
);
