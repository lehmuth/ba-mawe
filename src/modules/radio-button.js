import { html, css, attach, defineComponent } from '../utils/components.js';

const template = html`
  <div id="container">
    <span id="outer">
      <span id="inner"></span>
    </span>
    <p id="label">
      <slot></slot>
    </p>
  </div>
`;

const styles = css`
  :host {
    display: block;
    font-size: 1.5em;
  }

  #container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    max-width: 100%;
    margin: 0.5em 0.5em 0.5em 0;
  }

  #outer {
    flex: 0 0 1em;
    height: 1em;
    background-color: #000;
    border-radius: 50%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }

  #inner {
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.2s ease-in-out;
  }

  #label {
    flex: 0 auto;
    margin: 0;
    margin-left: 0.5em;
  }

  :host([checked]) #inner {
    width: 0.6em;
    height: 0.6em;
  }
`;

defineComponent(
  'radio-button',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['value', 'checked'];
    }

    constructor() {
      super();
      attach(this, template, styles);
      this.activate = this.activate.bind(this);
    }

    connectedCallback() {
      this.addEventListener('click', this.activate);
    }

    disconnectedCallback() {
      this.removeEventListener('click', this.activate);
    }

    get checked() {
      return this.hasAttribute('checked');
    }

    set checked(value) {
      if (value) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }
    }

    get value() {
      return this.getAttribute('value');
    }

    set value(value) {
      this.setAttribute('value', value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        switch (name) {
          case 'checked':
            this.dispatchEvent(
              new CustomEvent('change', {
                detail: { checked: this.checked, value: this.value },
              })
            );
        }
      }
    }

    activate() {
      this.checked = true;
    }
  }
);
