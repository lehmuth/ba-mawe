import { html, css, attach, defineComponent } from '../scripts/utils.js';

const template = html`
  <a id="container">
    <span id="label">
      <slot>Label</slot>
    </span>
    <span id="bracket">&gt;</span>
  </a>
`;

const styles = css`
  :host {
    display: inline-block;
  }

  #container {
    /* Sizing */
    min-width: 100%;
    box-sizing: border-box;

    /* Align children */
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;

    /* Appearance */
    padding: 10px;
    background-color: #000;
    color: #fff;

    /* Reset default a styles */
    text-decoration: none;
    text-transform: uppercase;
  }

  .clickable {
    cursor: pointer;
  }

  #label {
    flex: 0;
    white-space: nowrap;
  }

  #bracket {
    display: none;
  }

  .linking > #bracket {
    display: block;
    flex: 0;
    margin-left: 10px;
  }
`;

defineComponent(
  'bold-button',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['href', 'onclick', 'nobracket'];
    }

    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.container = shadowRoot.querySelector('#container');
    }

    connectedCallback() {
      this.render();
    }

    get href() {
      return this.getAttribute('href');
    }

    set href(value) {
      this.setAttribute('href', value);
    }

    get onclick() {
      return this.getAttribute('onclick');
    }

    set onclick(value) {
      this.setAttribute('onclick', value);
    }

    get nobracket() {
      return this.hasAttribute('nobracket');
    }

    set nobracket(value) {
      if (value) {
        this.setAttribute('nobracket', '');
      } else {
        this.removeAttribute('nobracket');
      }
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        switch (name) {
          case 'href':
            this.href = newVal;
            break;
          case 'onclick':
            this.onclick = newVal;
            break;
          case 'nobracket':
            this.nobracket = newVal;
            break;
        }
        this.render();
      }
    }

    render() {
      let clickable;
      if (!this.href) {
        this.container.removeAttribute('href');
        clickable = false;
      } else {
        this.container.setAttribute('href', this.href);
        clickable = true;
      }

      if (this.onclick) {
        clickable = true;
      }

      if (clickable) {
        this.container.classList.add('clickable');
        if (!this.nobracket) {
          this.container.classList.add('linking');
        }
      } else {
        this.container.classList.remove('clickable', 'linking');
      }
    }
  }
);