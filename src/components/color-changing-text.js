const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
        }

        #bg-white {
            background-color: #fff;
            z-index: 0;
        }

        #bg-black {
            background-color: #000;
            z-index: 1;
        }

        #text {
            max-width: 40rem;
            margin: auto;
            color: white;
            mix-blend-mode: difference;
            z-index: 2;
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
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('color-changing-text', ColorChangingText);