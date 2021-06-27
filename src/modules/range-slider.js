import { html, css, attach, defineComponent } from '../utils/components.js';
import './text-field.js';

const template = html`
  <div id="container">
    <input type="range" id="range" />
    <text-field suffix="€" id="output" placeholder="0" disabled></text-field>
  </div>
`;

const styles = css`
  :host {
    display: block;
    font-size: 1em;
  }

  #container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  #range {
    flex: 1 1 100%;
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    margin-right: 1em;
    height: 8px;
    background: #000;
    outline: none;
  }

  #range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background-color: #000;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 0 0.7em #fff;
  }

  #range::-moz-range-thumb {
    width: 1.5em;
    height: 1.5em;
    background-color: #000;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 0 0.7em #fff;
  }

  #output {
    flex: 0 1 4em;
    min-width: 80px;
  }
`;

defineComponent(
  'range-slider',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['min', 'max', 'value'];
    }

    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.input = shadowRoot.querySelector('#range');
      this.output = shadowRoot.querySelector('#output');
      this.min = this.min || 0;
      this.max = this.max || 500;
      this.input.value = this.value || this.min;
      this.render = this.render.bind(this);
    }

    connectedCallback() {
      this.input.addEventListener('input', this.render);
      this.render();
    }

    disconnectedCallback() {
      this.input.removeEventListener('input', this.render);
    }

    get min() {
      return +this.getAttribute('min');
    }

    set min(value) {
      this.setAttribute('min', value);
    }

    get max() {
      return +this.getAttribute('max');
    }

    set max(value) {
      this.setAttribute('max', value);
    }

    get value() {
      return +this.getAttribute('value');
    }

    set value(value) {
      this.setAttribute('value', value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal != newVal) {
        switch (name) {
          case 'value':
            this.dispatchEvent(
              new CustomEvent('change', { detail: { value: this.value } })
            );
        }
        this.render();
      }
    }

    render() {
      this.input.min = this.min;
      this.input.max = this.max;
      this.value = this.input.value;
      this.output.placeholder = this.input.value;
    }
  }
);
