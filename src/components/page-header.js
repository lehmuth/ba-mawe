const template = document.createElement('template');
template.innerHTML = `
    <style>

    </style>
    <div id="container">
        <div id="logo">name</div>
        <nav>
            <a class="nav-item" href="#">NavItem</a>
            <a href="#">NavItem</a>
            <a href="#">NavItem</a>
            <a href="#">NavItem</a>
        </nav>
    </div>
`;

class Header extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('page-header', Header);