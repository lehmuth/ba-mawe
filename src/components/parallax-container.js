const template = document.createElement('template');
template.innerHTML = `
    <style>
        #container {
            position: absolute;
            right: 0;
            top: 120vh;
        }
    </style>

    <div id="container">
        <slot></slot>
    </div>
`;