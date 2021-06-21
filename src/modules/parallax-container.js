import { html, css, attach, defineComponent } from '../scripts/utils.js';

const template = html`
  <div id="container">
    <slot></slot>
  </div>
`;

const styles = css`
  :host {
    display: block;
  }

  #container {
    transition-property: transform;
    transition-timing-function: linear;
  }
`;

defineComponent(
  'parallax-container',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['distance', 'fps'];
    }

    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.container = shadowRoot.querySelector('#container');
    }

    connectedCallback() {
      this.fps = this.fps || 60;
      this.distance = this.hasAttribute('distance') ? this.distance : 200;
      this.currOffset = 0;

      this.intervall = setInterval(this.render.bind(this), 1000 / this.fps);
      this.container.style.transitionDuration = 1 / this.fps;
    }

    disconnectedCallback() {
      clearInterval(this.intervall);
    }

    get distance() {
      return +this.getAttribute('distance');
    }

    set distance(value) {
      this.setAttribute('distance', value);
    }

    get fps() {
      return +this.getAttribute('fps');
    }

    set fps(value) {
      this.setAttribute('fps', value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        this.render();
      }
    }

    render() {
      // Load window bounds (currently visible range on y axis)
      const windowTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowBounds = {
        top: windowTop,
        bottom: windowTop + window.innerHeight,
        height: window.innerHeight,
      };

      // load current container bounds
      const containerBounds = this.container.getBoundingClientRect();

      const baseline = +(
        windowBounds.top + containerBounds.top - this.currOffset <
        windowBounds.height
          ? windowBounds.top + containerBounds.top - this.currOffset
          : windowBounds.height
      ).toFixed(2);
      const animationBounds = {
        offset: baseline - containerBounds.top + this.currOffset,
        total: baseline + containerBounds.height + this.distance,
      };
      let scrollRatio = +(
        animationBounds.offset / animationBounds.total
      ).toFixed(2);
      scrollRatio = Math.min(Math.max(scrollRatio, 0), 1);
      this.currOffset = scrollRatio * this.distance;
      this.container.style.transform = `translate(0,${this.currOffset}px)`;
    }
  }
);
