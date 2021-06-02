const template = document.createElement('template');
template.innerHTML = `
    <style>
        #container {
            background-color: #000;
            padding: 10px;
            color: #fff;
            text-decoration: none;
            text-transform: uppercase;
        }

        .clickable {
            cursor: pointer;
        }

        #label {

        }

        .bracket {

        }
    </style>
    <a id="container">
        <span id="label">
            <slot>Label</slot>
        </span>
    </a>
`;

const bracket = document.createElement('span');
bracket.setAttribute('class', 'bracket');
bracket.innerHTML = '>';

class BoldButton extends HTMLElement {
    static get observedAttributes () {
        return ['href'];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.container = shadowRoot.querySelector('#container');
    }

    connectedCallback() {
        this.render();
    }

    get href() {
        return this.getAttribute('href');
    }

    set href(value) {
    this.setAttribute('href', value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(oldVal !== newVal) {
            switch(name) {
                case 'href': 
                    this.href = newVal;
                    break;
            }
            this.render();
        }
    }

    render() {
        const bracketNodes = this.container.getElementsByClassName('bracket');
        if(!this.href) {
            if(bracketNodes) {
                while(bracketNodes.length > 0) {
                    bracketNodes[0].parentNode.removeChild(bracketNodes[0]);
                }
            }
            this.container.removeAttribute('href');
            this.container.classList.remove('clickable');
        } else {
            if(!bracketNodes || bracketNodes.length === 0) {
                this.container.appendChild(bracket);
            }
            this.container.setAttribute('href', this.href);
            this.container.classList.add('clickable');
        }
    }
}

window.customElements.define('bold-button', BoldButton);