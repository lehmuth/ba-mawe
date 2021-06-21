import { html, css, attach, defineComponent } from '../scripts/utils.js';

const template = html`
    <input type="text">
`;

const styles = css``;

defineComponent('text-field', class extends HTMLElement {
    getObservedAttributes() {
        return ['placeholder'];
    }

    constructor() {
        super();
        const shadowRoot = attach(this, template, styles);
    }
})