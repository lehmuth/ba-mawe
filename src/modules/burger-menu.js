const template = document.createElement('template');
template.innerHTML = `
    <style>
        #icon {
            cursor: pointer;
            position: fixed;
            top: 60px;
            right: 50px;
            z-index: 110;
        }

        #icon > div {
            height: 4px;
            width: 66px;
            background-color: #000;
            margin: 15px 0;
            transition: background-color .3s linear;
        }

        nav.active > #icon > div {
            background-color: #fff;
        }

        #menu {
            background-color: #000;
            position: fixed;
            top: 0;
            right: 0;
            text-align: right;
            padding: 145px 50px 50px;
            z-index: 100;
            opacity: 0;
            width: 100%;
            max-width: 800px;
            transition: opacity .3s linear;
            visibility: hidden;
            font-size: 1.5rem;
            text-transform: uppercase;
        }

        #menu > a{
            display: block;
            color: #fff;
            text-decoration: none;
        }

        nav.active > #menu {
            opacity: 1;
            visibility: visible;
        }

        nav.active {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: red;
        }
    </style>
    <nav>
        <div id="icon">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div id="menu">
            <a href="#">Shirts & Patches</a>
            <a href="#">Themen & Missstände</a>
            <a href="#">Spenden</a>
            <a href="#">Mein Konto</a>
            <a href="#">Warenkorb</a>
        </div>
    </nav>
`;

class BurgerMenu extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.icon = shadowRoot.querySelector('#icon');
        this.nav = shadowRoot.querySelector('nav');
        this.active = false;
    }

    connectedCallback() {
        this.icon.addEventListener('click', this.toggle);
    }

    close() {
        this.active = false;
        this.nav.classList.remove('active');
        this.nav.removeEventListener('click', this.close);
    }

    open() {
        this.active = true;
        this.nav.classList.add('active');
        this.nav.addEventListener('click', this.close);
    }

    toggle() {
        if(this.active) {
            this.close();
        } else {
            this.open();
        }
    }


}

window.customElements.define('burger-menu', BurgerMenu);