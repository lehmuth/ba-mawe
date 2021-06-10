const template = document.createElement('template');
template.innerHTML = `
    <style>
        #frame {
            border: solid 7px #000;
            width: 100%;
            box-sizing: border-box;
            height: 40px;
            background: #fff;
        }

        #progress {
            width: 0;
            height: 100%;
            background-color: #000;
            transition: width .2s ease-in-out;
        }
    </style>
    <div id="frame">
        <div id="progress"></div>
    </div>
`;

class ProgressBar extends HTMLElement {
    static get observedAttributes() {
        return ['min', 'max', 'current'];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.progress = shadowRoot.querySelector('#progress');
        if(!this.min) {
            this.min = 0;
        }

        if(!this.max) {
            this.max = 100;
        }

        if(!this.current) {
            this.current = 0;
        }
    }

    connectedCallback() {
        this.render();
    }

    get min() {
        return +this.getAttribute('min');
    }

    set min(value) {
        this.setAttribute('min', value);
    }

    get max() {
        return +this.getAttribute('max');
    }

    set max(value) {
        this.setAttribute('max', value);
    }

    get current() {
        return +this.getAttribute('current');
    }

    set current(value) {
        if(value > this.max) {
            value = this.max;
        }
        if(value < this.min) {
            value = this.min;
        }
        this.setAttribute('current', value);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(oldVal !== newVal) {
            switch(name) {
                case 'min':
                    this.min = newVal;
                    break;
                case 'max':
                    this.max = newVal;
                    break;
                case 'current':
                    this.current = newVal;
                    break;
            }
            this.render();
        }
    }


    async reset() {
        this.progress.style.width = '100%';
        setTimeout(() => {
            this.progress.style.float = 'right';
            this.progress.style.width = '0%';
            setTimeout(() => {
                this.progress.style.float = 'left';
                this.render();
            }, 200)
        }, 400)
    }

    async render() {
        this.progress.style.width = (this.current - this.min) / (this.max - this.min) * 100 + '%';
    }
}

window.customElements.define('progress-bar', ProgressBar);