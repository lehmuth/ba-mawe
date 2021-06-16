const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
        }

        #bg-white {
            background-color: #fff;
        }

        #bg-black {
            background-color: #000;
        }

        #text {
            max-width: 80%;
            margin: auto;
            color: white;
            mix-blend-mode: difference;
        }
    </style>
    <div id="bg-black">
        <div id="bg-white">
            <p id="text">
                <slot></slot>
            </p>
        </div>
    </div>
`;

class ColorChangingText extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('color-changing-text', ColorChangingText);