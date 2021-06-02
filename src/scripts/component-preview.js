
const progressBar = document.querySelector('#bar-1');

function add(value) {
    progressBar.current += value;
}

function subtract(value) {
    progressBar.current -= value;
}

function reset() {
    progressBar.reset();
}