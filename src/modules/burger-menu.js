import { html, css, defineComponent, attach } from '../scripts/utils.js';
import './burger-menu-icon.js';

const template = html`
  <div id="menu-container">
    <burger-menu-icon></burger-menu-icon>
    <div id="spacer-1" class="menu-element"></div>
    <div id="spacer-2" class="menu-element"></div>
    <div id="spacer-3" class="menu-element"></div>
    <div id="spacer-4" class="menu-element"></div>
    <div id="spacer-5" class="menu-element"></div>
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
    <div id="closer"></div>
  </div>
`;

const styles = css`
  :host {
    position: sticky;
    top: 0;
    left: 0;
    font-size: 40px;
    display: block;
    height: 0;
  }

  #menu-container {
    display: inline-grid;
    position: relative;
    width: 100%;
    height: 100%;
    grid-template-columns: auto 1.25em auto 1.65em 1.25em;
    grid-template-rows: 1.25em 1.25em 6.4em 1.25em;
    grid-template-areas:
      'logo spacer-4 spacer-2 spacer-2 spacer-3'
      'logo spacer-4 spacer-1 icon spacer-3'
      'logo spacer-4 menu menu spacer-3'
      'logo spacer-4 spacer-5 spacer-5 spacer-3';
    justify-content: end;
  }

  burger-menu-icon {
    display: block;
    grid-area: icon;
    font-size: 1.25em;
    padding-right: 0.35em;
    position: relative;
    background-color: transparent;
    transition: background-color 0.3s linear;
    z-index: 110;
  }

  :host([active]) burger-menu-icon {
    background-color: #000;
  }

  :host([active]) #menu {
    display: flex;
    flex-direction: column;
    opacity: 1;
  }

  #logo {
    height: 10.15em;
    grid-area: logo;
    object-fit: cover;
  }

  #menu {
    border: solid 0.2em #000;
    height: 6em;
    grid-area: menu;
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
    box-sizing: border-box;
    text-align: right;
    line-height: 1.2em;
  }

  #menu a:hover {
    color: #000;
    background-color: #fff;
  }

  :host([active]) #closer {
    display: block;
    z-index: 90;
  }

  #closer {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: none;
    z-index: -1;
  }

  #spacer-1 {
    grid-area: spacer-1;
  }

  #spacer-2 {
    grid-area: spacer-2;
  }

  #spacer-3 {
    grid-area: spacer-3;
  }

  #spacer-4 {
    grid-area: spacer-4;
  }

  #spacer-5 {
    grid-area: spacer-5;
  }

  .menu-element {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s linear;
    background-color: #000;
    display: block;
    z-index: -1;
  }

  :host([active]) .menu-element {
    visibility: visible;
    opacity: 1;
    z-index: 100;
  }

  .transparent {
    background-color: transparent;
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
      this.menuIcon = shadowRoot.querySelector('burger-menu-icon');
      this.closer = shadowRoot.querySelector('#closer');
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.active = this.active || false;
    }

    connectedCallback() {
      this.menuIcon.addEventListener('open', this.open);
      this.menuIcon.addEventListener('close', this.close);
      this.closer.addEventListener('click', this.close);
      this.render();
    }

    disconnectedCallback() {
      this.menuIcon.removeEventListener('open', this.open);
      this.menuIcon.removeEventListener('close', this.close);
      this.closer.removeEventListener('click', this.close);
    }

    get active() {
      return this.hasAttribute('active');
    }

    set active(value) {
      if (value) {
        console.log('activate');
        this.setAttribute('active', '');
      } else {
        this.removeAttribute('active');
      }
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        this.render();
      }
    }

    open() {
      this.active = true;
    }

    close() {
      this.active = false;
    }

    render() {
      this.menuIcon.active = this.active;
    }
  }
);
