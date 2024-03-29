import { html, css, attach, defineComponent } from '../utils/components.js';
import './burger-menu.js';
import './burger-menu-icon.js';
import './shopping-cart-icon.js';
import './page-footer.js';

const template = html`
  <div id="hero">
    <slot name="hero"></slot>
  </div>
  <burger-menu-icon></burger-menu-icon>
  <shopping-cart-icon></shopping-cart-icon>
  <burger-menu></burger-menu>
  <div id="overlay">
    <slot name="overlay"></slot>
  </div>
  <main id="content">
    <slot name="content"></slot>
  </main>
  <page-footer></page-footer>
`;

const styles = css`
  :host {
    /* Use flexbox for a sticky footer */
    display: flex;
    flex-flow: column nowrap;
    min-height: 100vh;

    /* Generate a container on displays bigger than 1920px */
    max-width: 1920px;
    width: 100%;
    margin: auto;
    background-color: #fff;
  }

  #hero {
    flex: 0 0 auto;
    width: 100%;
    z-index: 2;
  }

  burger-menu-icon {
    position: sticky;
    top: 1rem;
    height: 0;
    z-index: 15;
    display: block;
    margin: 1rem 0.5rem -1rem auto;
    font-size: 1.25em;
    mix-blend-mode: difference;
  }

  shopping-cart-icon {
    position: sticky;
    top: 3.25rem;
    height: 0;
    z-index: 6;
    display: block;
    margin: 3.25rem 0.5rem -3.25rem auto;
    font-size: 1.25em;
    mix-blend-mode: difference;
  }

  burger-menu {
    z-index: 10;
    position: sticky;
    top: 0;
    font-size: 1.5em;
  }

  #overlay {
    z-index: 5;
    top: 0;
    right: 0;
    left: 0;
    margin: auto;
    max-width: 1920px;
    position: absolute;
    flex: none;
  }

  #content {
    flex: 1;
    background-color: #fff;
    z-index: 1;
    width: 100%;
    padding: 1em var(--container-padding);
    box-sizing: border-box;
    position: relative;
  }

  page-footer {
    z-index: 20;
    flex: 0 0 auto;
  }

  slot[name='content']::slotted(*) {
    z-index: 1;
  }

  /* Utility classes for content (only available for directtly slotted elements) */
  slot[name='content']::slotted(.oversize) {
    width: calc(100% + 2 * var(--container-padding));
    margin-left: calc(-1 * var(--container-padding));
  }
`;

defineComponent(
  'page-template',
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.menuIcon = shadowRoot.querySelector('burger-menu-icon');
      this.menu = shadowRoot.querySelector('burger-menu');
      this.handleBurgerMenu = this.handleBurgerMenu.bind(this);
    }

    connectedCallback() {
      this.menuIcon.addEventListener('open', this.handleBurgerMenu);
      this.menuIcon.addEventListener('close', this.handleBurgerMenu);
      this.menu.addEventListener('close', this.handleBurgerMenu);
    }

    disconnectedCallback() {
      this.menuIcon.removeEventListener('open', this.handleBurgerMenu);
      this.menuIcon.removeEventListener('close', this.handleBurgerMenu);
      this.menu.removeEventListener('close', this.handleBurgerMenu);
    }

    handleBurgerMenu(event) {
      event.preventDefault();
      const newStatus = event.detail.active;
      this.menuIcon.active = newStatus;
      this.menu.active = newStatus;
    }
  }
);
