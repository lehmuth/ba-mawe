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
    box-sizing: boder-box;
  }

  #container {
    min-width: 100%;
    background-color: #000;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 10px;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    box-sizing: border-box;
  }

  .clickable {
    cursor: pointer;
  }

  #label {
    flex: 0;
  }

  #bracket {
    flex: 0;
  }

  .unlinked > #bracket {
    display: none;
  }
`;

defineComponent(
  'bold-button',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['href', 'onclick'];
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

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        switch (name) {
          case 'href':
            this.href = newVal;
            this.clickable = newVal ? true : false;
            break;
          case 'onclick':
            this.clickable = newVal ? true : false;
            break;
        }
        this.render();
      }
    }

    render() {
      if (!this.href) {
        this.container.removeAttribute('href');
        this.container.classList.add('unlinked');
      } else {
        this.container.setAttribute('href', this.href);
        this.container.classList.remove('unlined');
      }

      if (this.clickable) {
        this.container.classList.add('clickable');
      } else {
        this.container.classList.remove('clickable');
      }
    }
  }
);
