import './page-header.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        .line {
            text-align: center;
            color: blue;
        }
    </style>
    <page-header></page-header>
`;

class PageTemplate extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('page-template', PageTemplate);