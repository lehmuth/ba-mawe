import { html, css, attach, defineComponent } from '../scripts/utils.js';

const template = html`
  <div id="container">
    <div id="horizontal" class="bar"></div>
    <div id="vertical" class="bar"></div>
  </div>
`;

const styles = css`
  #container {
    padding: 0.5em 0.25em;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 3em;
    height: 3em;
    background-color: #000;
    border: solid black 0.2em;
    transition: all 0.2s linear;
    cursor: pointer;
  }

  :host([rotate]) #container {
    padding: 0.25em 0.5em;
  }

  .bar {
    height: 0.2em;
    width: 100%;
    background-color: #fff;
    transition: all 0.2s linear;
  }

  #vertical {
    transform: translate(0, -0.1em) rotate(90deg);
  }

  #container:hover {
    background-color: #fff;
  }

  #container:hover .bar {
    background-color: #000;
  }
`;

defineComponent(
  'plus-button',
  class extends HTMLElement {
    constructor() {
      super();
      attach(this, template, styles);
    }
  }
);
