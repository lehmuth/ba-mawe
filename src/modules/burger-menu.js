import { html, css, defineComponent, attach } from '../scripts/utils.js';
import './burger-menu-icon.js';

const template = html`
  <div id="menu-container">
    <img
      id="logo"
      src="../assets/logo_menu.png"
      class="menu-element transparent"
    />
    <nav id="menu" class="menu-element">
      <a class="nav-item" href="#">Shirts & Patches</a>
      <a class="nav-item" href="#">Themen & Missstände</a>
      <a class="nav-item" href="#">Spenden</a>
      <a class="nav-item" href="#">Mein Konto</a>
      <a class="nav-item" href="#">Warenkorb</a>
    </nav>
  </div>
  <div id="closer"></div>
`;

const styles = css`
  :host {
    height: 0;
    position: relative;
    visibility: hidden;
    display: block;
    z-index: -1;
  }

  :host([active]) {
    visibility: visible;
    z-index: 1;
  }

  #menu-container {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: bottom;
    height: 9.7em;
    opacity: 0;
    transition-property: all;
    transition-timing-function: linear;
    transition-duration: var(--burger-menu-animation-duration);
  }

  :host([active]) #menu-container {
    opacity: 1;
  }

  #logo {
    flex: 1;
    object-fit: cover;
    width: auto;
    height: 100%;
  }

  #menu {
    display: flex;
    flex-direction: column;
    flex: 0;
    padding: 2.45em 1.25em 1.25em 1.25em;
    background-color: #000;
  }

  #menu a {
    display: block;
    color: #fff;
    text-decoration: none;
    white-space: nowrap;
    width: 100%;
    background-color: #000;
    text-transform: uppercase;
    transition: all 0.3s linear;
    padding: 0 0.2em;
    text-align: right;
    line-height: 1.25em;
  }

  #menu a:hover {
    color: #000;
    background-color: #fff;
  }

  #closer {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }

  @media screen and (max-width: 420px) {
    #menu-container {
      display: block;
      width: 100%;
    }

    #logo {
      display: none;
    }
  }
`;

defineComponent(
  'burger-menu',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['active'];
    }

    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.container = shadowRoot.querySelector('#menu-container');
      this.closer = shadowRoot.querySelector('#closer');
      this.close = this.close.bind(this);
      this.active = this.active || false;
    }

    connectedCallback() {
      this.closer.addEventListener('click', this.close);
    }

    disconnectedCallback() {
      this.closer.removeEventListener('click', this.close);
    }

    get active() {
      return this.hasAttribute('active');
    }

    set active(value) {
      if (value) {
        this.setAttribute('active', '');
      } else {
        this.removeAttribute('active');
      }
    }

    close() {
      // dispatch a close event
      const handle = this.dispatchEvent(
        new CustomEvent('close', {
          cancelable: true,
          detail: { active: false },
        })
      );
      // handle default (can be prevented with event.preventDefault() in another event handler)
      if (handle) {
        this.active = false;
      }
    }
  }
);
