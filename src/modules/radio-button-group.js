import { html, css, attach, defineComponent } from '../utils/components.js';
import './radio-button.js';

const template = html`
  <div id="container">
    <slot></slot>
  </div>
`;

const styles = css`
  :host {
    display: block;
    --child-count: 3;
  }

  #container {
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  :host([column]) #container {
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
  }

  ::slotted(*) {
    display: none;
  }

  ::slotted(radio-button) {
    display: block;
    flex: 1;
    width: calc(100% / var(--child-count));
  }

  :host([column]) ::slotted(radio-button) {
    width: 100%;
  }
`;

defineComponent(
  'radio-button-group',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['value'];
    }

    constructor() {
      super();
      attach(this, template, styles);
      this.radioBtns = this.querySelectorAll('radio-button');
      this.handleChange = this.handleChange.bind(this);
    }

    connectedCallback() {
      this.radioBtns.forEach((radioBtn) => {
        if (radioBtn.checked) {
          this.setActive(radioBtn);
        }
        radioBtn.addEventListener('change', this.handleChange);
      });
    }

    disconnectedCallback() {
      this.radioBtns.forEach((radioBtn) => {
        radioBtn.removeEventListener('change', this.handleChange);
      });
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
          case 'value':
            this.dispatchEvent(
              new CustomEvent('change', { detail: { value: this.value } })
            );
        }
      }
    }

    handleChange(event) {
      this.setActive(event.target);
    }

    setActive(target) {
      if (this.checkedElement) {
        this.checkedElement.checked = false;
      }
      this.checkedElement = target;
      this.value = target.value;
    }
  }
);
