import { html, css, attach, defineComponent } from '../utils/components.js';
import { sizes } from '../utils/shopping-cart.js';

const template = html`<select></select>`;

const styles = css`
  select {
    appearance: none;
    border: none;
    padding: 0.2em 1em 0.2em 0.2em;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    line-height: inherit;
    background-image: url(/assets/arrow-down.svg);
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: bottom 0.35em right 0.2em;
    background-size: 0.48em;
  }

  select:focus {
    outline: none;
  }
`;

defineComponent(
  'size-select',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['value'];
    }

    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.select = shadowRoot.querySelector('select');
      for (let i = 0; i < sizes.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = sizes[i];
        option.value = i;
        this.select.appendChild(option);
      }
      this.updateValue = this.updateValue.bind(this);
    }

    connectedCallback() {
      this.select.addEventListener('change', this.updateValue);
    }

    disconnectedCallback() {
      this.select.removeEventListener('change', this.updateValue);
    }

    get value() {
      return +this.getAttribute('value');
    }

    set value(value) {
      this.setAttribute('value', value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        switch (name) {
          case 'value':
            this.select.value = this.value;
            this.dispatchEvent(
              new CustomEvent('change', { detail: { value: this.value } })
            );
        }
      }
    }

    updateValue() {
      this.value = this.select.value;
    }
  }
);
