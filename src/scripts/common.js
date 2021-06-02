
            const progressBar = document.querySelector('#bar-1');
            console.log(progressBar);

function add(value) {
    progressBar.current += value;
}

function substract(value) {
    progressBar.current -= value;
}