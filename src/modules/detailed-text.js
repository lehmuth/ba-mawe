import { html, css, attach, defineComponent } from '../utils/components.js';

const template = html`
    <div id="container">
        <div id="content">
            <slot></slot>
        </div>
        <div id="extend"><span>&gt;</span></div>
    </div>
`;

const styles = css`
    :host {
        display: block;
        --line-count: 5;
    }
    
    #container {
        color: #fff;
        padding: 1.5em 3em 0.7em;
        background-color: #000;
    }
    
    #content {
        line-height: 1.2em;
        max-height: calc(var(--line-count) * 1.2em);
        transition: max-height .3s linear;
        overflow: hidden;
    }

    :host([extended]) #content {
        max-height: 2000px;
    }

    #extend {
        margin: 0.7em auto 0;
        width: 2em;
        height: 2em;
        background-color: #000;
        border: solid .2em #000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all .3s linear;
    }

    #extend:hover {
        background-color: #fff;
        color: #000;
    }

    #extend span {
        font-size: 2em;
        display: block;
        transform: rotate(90deg);
        transition: all .3s linear;
    }

    :host([extended]) #extend span {
        transform: rotate(-90deg);
    }
`;

defineComponent('detailed-text', class extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = attach(this, template, styles);
        this.extendBtn = shadowRoot.querySelector('#extend');
        this.toggle =this.toggle.bind(this);
    }

    connectedCallback() {
        this.extendBtn.addEventListener('click', this.toggle);
    }

    disconnectedCallback() {
        this.extendBtn.removeEventListener('click', this.toggle);
    }

    get extended() {
        return this.hasAttribute('extended');
    }

    set extended(value) {
        if(value) {
            this.setAttribute('extended', '');
        } else {
            this.removeAttribute('extended');
        }
    }

    toggle() {
        this.extended = !this.extended;
    }
});