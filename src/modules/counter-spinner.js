import { html, css, attach, defineComponent } from '../utils/components.js';

const template = html`
  <div id="display"></div>
  <div id="up"></div>
  <div id="down"></div>
`;

const styles = css`
  :host {
    display: inline-block;
    position: relative;
    padding: 0.2em 0.2em 0.2em 1em;
  }

  #display {
    width: 100%;
    height: 100%;
    text-align: right;
  }

  #up,
  #down {
    position: absolute;
    padding: 0.2em;
    left: 0;
    right: 0;
    background-size: 0.48em;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  #up {
    top: 0;
    bottom: 50%;
    padding-bottom: 0;
    background-image: url(../assets/arrow-up.svg);
    background-position: bottom 0.02em left 0.2em;
  }

  #down {
    top: 50%;
    bottom: 0;
    padding-top: 0;
    background-image: url(../assets/arrow-down.svg);
    background-position: top 0.02em left 0.2em;
  }
`;

defineComponent(
  'counter-spinner',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['min', 'max', 'value', 'step'];
    }

    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.display = shadowRoot.querySelector('#display');
      this.upBtn = shadowRoot.querySelector('#up');
      this.downBtn = shadowRoot.querySelector('#down');
      this.countUp = this.countUp.bind(this);
      this.countDown = this.countDown.bind(this);
    }

    connectedCallback() {
      this.min = this.min || 0;
      this.max = this.max || 1000;
      this.value = this.value || 1;
      this.step = this.step || 1;
      this.upBtn.addEventListener('click', this.countUp);
      this.downBtn.addEventListener('click', this.countDown);
      this.render();
    }

    disconnectedCallback() {
      this.upBtn.removeEventListener('click', this.countUp);
      this.downBtn.removeEventListener('click', this.countDown);
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

    get step() {
      return +this.getAttribute('step');
    }

    set step(value) {
      this.setAttribute('step', value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        switch (name) {
          case 'value':
            this.dispatchEvent(
              new CustomEvent('change', {
                detail: { value: this.value },
              })
            );
        }
        this.render();
      }
    }

    countUp() {
      if (this.value + this.step <= this.max) {
        this.value = this.value + this.step;
      }
    }

    countDown() {
      if (this.value - this.step >= this.min) {
        this.value = this.value - this.step;
      }
    }

    render() {
      this.display.innerHTML = this.value;
    }
  }
);
