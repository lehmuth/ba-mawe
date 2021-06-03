'use strict';

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

const parallax = document.querySelector('#parallax');

// element speed in relation to scroll speed 
// { 2 }    => moving twice as fast as default in the same direction
// (1;inf)  => moving faster than default elements in same direction (coming from top to leave on default position)
// { 1 }    => moving with exactly the same speed as scrolling -> never visible
// (0;1)    => moving slower than default elements in same direction
// { 0 }    => moving with same speed as default elements -> no result
// (-inf;0) => moving faster than default elements in opposite direction
// { -1 }   => moving twice as fast as default elements in opposite direction
const speedRatio = 0.2;
const range = 30;
const fps = 40;
// parallax.style.transitionDuration = 1 / fps;

function render () {
    // Load window bounds and scroll direction
    const winTop = document.documentElement.scrollTop || document.body.scrollTop;
    const winBottom = winTop + window.innerHeight;

    // load element bounds
    const elemTop = parallax.offsetTop;
    const offset = Math.floor((winBottom - elemTop) * speedRatio);
    const elemBottom = elemTop + parallax.offsetHeight;

    // check if element is visible
    const visible = (winBottom + range) - (elemTop + offset) >= 0 && (winTop - range) - (elemBottom + offset) < 0;

    console.log(winTop, elemBottom, visible);

    if (visible) {
        parallax.style.transform = `translate(0,${offset}px)`;
    }
}

setInterval(render, 1000 / fps);