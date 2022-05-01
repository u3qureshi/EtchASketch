let color = 'black';
let currentSize;
let count = 0;
let click = false;
initializeGrid(16);

const slider = document.querySelector('#my-slider');
const sliderOutput = document.querySelector('.slider-output');
slider.oninput = function() {
    let input = this.value;
    const text = document.querySelector('.text');

    initializeGrid(input);
    sliderOutput.innerText = `Grid size: ${input} x ${input}`
}

function initializeGrid(size) {
    currentSize = size;
    const grid = document.querySelector(".grid-container");

    //Select all the divs/cells inside the grid and remove each of them
    const cells = grid.querySelectorAll('div');
    cells.forEach(div => div.remove());

    const totalCells = size * size;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < totalCells; i++) {
        let cell = document.createElement("div");
        //In this for loop, we call & create a separate function for EACH CELL! (colorCell function)
        cell.addEventListener('mouseover', colorCell);
        grid.insertAdjacentElement("beforeend", cell);
    }
}

document.querySelector('.grid-container').addEventListener('click', () => {
    click = !click;
    //What this does is if click is true, it becomes false and vice-versa
    const mode = document.querySelector('.mode');
    if (click)
        mode.innerText = 'MODE: Drawing';
    else
        mode.innerText = 'MODE: Drawing Stopped';
});

function colorCell() {
    if (click) {
        if (color === 'rainbow') {
            this.style.backgroundColor = `hsl(${Math.random() *360}, 90%, 60%)`;
        } else if (color === 'grayscale') {
            this.style.backgroundColor = `hsl(0, 0%, ${Math.random() *60}%)`;
        } else if (color === 'bee') {
            let newColor = alternatingBee();
            this.style.backgroundColor = `${newColor}`;
        } else
        //The this keyword refers to the cell that is currently being called in the for loop above.
            this.style.backgroundColor = color;
    }
}

function alterColor(newColor) {

    color = newColor;
}

function clearPad() {
    initializeGrid(currentSize);
}

function alternatingBee() {
    count++;
    if (count % 2 == 0)
        return 'black';
    else
        return 'yellow';
}
// function alterSize(input) {

//     const text = document.querySelector('.text');

//     if (input >= 2 && input <= 200) {
//         initializeGrid(input);
//         text.innerText = 'Enter a value from 2 - 200';
//     } else
//         text.innerText = 'Invalid input, please enter a value between 2 - 200';
// }