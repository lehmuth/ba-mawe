import { html, css, attach, defineComponent } from '../scripts/utils.js';

const template = html`
  <div id="icon">
    <div id="inner">
      <div class="bar" id="bar-1"></div>
      <div class="bar" id="bar-2"></div>
      <div class="bar" id="bar-3"></div>
    </div>
  </div>
`;

const styles = css`
  :host {
    display: inline-block;
  }

  #icon {
    /* icon is a square with font size as edge length */
    --burger-menu-icon-size: 1em;
    /* one bar has a height of 0.08 * font-size to match default height of 4px on 50px edge length */
    --burger-menu-icon-bar-height: calc(var(--burger-menu-icon-size) * 0.08);
    /* the height of the inner rectangle which contains the three bars */
    --burger-menu-icon-height: calc(var(--burger-menu-icon-size) * 0.5);

    cursor: pointer;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    height: var(--burger-menu-icon-size);
    width: var(--burger-menu-icon-size);
  }

  #inner {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    height: var(--burger-menu-icon-height);
    width: 100%;
  }

  .bar {
    flex: 0 0 var(--burger-menu-icon-bar-height);
    width: 100%;
    background: #fff;
    transition-property: all;
    transition-timing-function: linear;
    transition-duration: var(--burger-menu-animation-duration);
    opacity: 1;
    transform-origin: right;
  }

  :host([active]) #bar-2 {
    opacity: 0;
    width: 0;
  }
`;

defineComponent(
  'burger-menu-icon',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['active'];
    }

    constructor() {
      super();
      const shadowRoot = attach(this, template, styles);
      this.icon = shadowRoot.querySelector('#icon');
      this.innerRect = shadowRoot.querySelector('#inner');
      this.bar1 = shadowRoot.querySelector('#bar-1');
      this.bar2 = shadowRoot.querySelector('#bar-2');
      this.bar3 = shadowRoot.querySelector('#bar-3');
      this.toggle = this.toggle.bind(this);
      this.active = this.active || false;
    }

    connectedCallback() {
      this.icon.addEventListener('click', this.toggle);
      this.render();
    }

    disconnectedCallback() {
      this.icon.removeEventListener('click', this.toggle);
    }

    get active() {
      return this.hasAttribute('active');
    }

    set active(value) {
      if (value) {
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

    toggle() {
      const handle = this.dispatchEvent(
        new CustomEvent(this.active ? 'close' : 'open', {
          cancelable: true,
          detail: { active: !this.active },
        })
      );
      if (handle) {
        this.active = !this.active;
      }
    }

    render() {
      if (this.active) {
        // calculate rotation angle of the bars threw arctan
        const angle = Math.atan(
          (this.innerRect.offsetHeight - this.bar1.offsetHeight) /
            this.icon.offsetHeight
        );
        // rotate first and last bar in opposite directions
        this.bar1.style.transform = `skewY(${-angle}rad)`;
        this.bar3.style.transform = `skewY(${angle}rad)`;
      } else {
        // reset rotation on inactive burger menu
        this.bar1.style.transform = `skewY(0)`;
        this.bar3.style.transform = `skewY(0)`;
      }
    }
  }
);
