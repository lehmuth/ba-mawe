import { html, css, attach, defineComponent } from '../utils/components.js';

const template = html`
  <div id="container">
    <input type="text" />
    <div id="background"></div>
  </div>
`;

const styles = css`
  :host {
    font-size: 1em;
    display: block;
  }

  #container {
    padding: 0.3em 0.3em 0.2em 0.3em;
    display: inline-flex;
    width: 100%;
    box-sizing: border-box;
    flex-flow: row-reverse nowrap;
    align-items: baseline;
    position: relative;
  }

  input {
    flex: 1;
    color: #fff;
    mix-blend-mode: difference;
    background-color: transparent;
    display: block;
    border: none;
    font-size: 1em;
    font-family: active, sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    z-index: 2;
    width: 100%;
  }

  input::placeholder {
    color: #fff;
    opacity: 1;
  }

  input:focus::placeholder {
    opacity: 0;
  }

  input:focus,
  input:active {
    outline: none;
  }

  #suffix {
    flex: 0;
    color: #fff;
    mix-blend-mode: difference;
    font-size: 1em;
    z-index: 2;
    padding-left: 0.2em;
  }

  #suffix ~ input {
    text-align: right;
  }

  #background {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transition: height 0.3s linear;
    background-color: #000;
    z-index: 1;
  }

  input:not([disabled]):focus ~ #background,
  input:not([disabled]):active ~ #background,
  :host([value]:not([value=''])) input:not([disabled]) ~ #background {
    height: 4px;
  }
`;

defineComponent(
  'text-field',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['placeholder', 'suffix', 'value', 'disabled'];
    }

    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.input = shadowRoot.querySelector('input');
      this.container = shadowRoot.querySelector('#container');
      this.suffixElement = document.createElement('span');
      this.suffixElement.id = 'suffix';
      this.updateValue = this.updateValue.bind(this);
    }

    connectedCallback() {
      this.render();
      this.input.addEventListener('change', this.updateValue);
    }

    disconnectedCallback() {
      this.input.removeEventListener('change', this.updateValue);
    }

    get suffix() {
      return this.getAttribute('suffix');
    }

    set suffix(value) {
      this.setAttribute('suffix', value);
    }

    get value() {
      return this.getAttribute('value');
    }

    set value(value) {
      this.setAttribute('value', value);
      this.input.value = value;
    }

    get placeholder() {
      return this.getAttribute('placeholder');
    }

    set placeholder(value) {
      this.setAttribute('placeholder', value);
    }

    get disabled() {
      return this.hasAttribute('disabled');
    }

    set disabled(value) {
      if (value) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        this.render();
      }
    }

    updateValue() {
      this.value = this.input.value;
    }

    render() {
      if (this.suffix) {
        this.suffixElement.innerHTML = this.suffix;
        if (!this.container.contains(this.suffixElement)) {
          this.container.prepend(this.suffixElement);
        }
      } else if (this.container.contains(this.suffixElement)) {
        this.suffixElement.remove();
      }

      if (this.placeholder) {
        this.input.placeholder = this.placeholder;
      } else {
        this.input.plceholder = '';
      }

      this.input.disabled = this.disabled;
    }
  }
);
