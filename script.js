let size = prompt("Enter preferred canvas size: ");
checkSize(size);
function checkSize(size) {
    if (size > 0 && size <= 100) {
        const currentSize = document.getElementById('current-size');
        currentSize.textContent = size + " x " + size;
    }
    else {
        let newSize = prompt("Enter preferred canvas size (max. 100): ");
        checkSize(newSize);
    }
}
const drawingArea = document.getElementById('drawing-area');
function makeRows(size) {
    drawingArea.innerHTML = ""; 
    drawingArea.style.setProperty('--grid-size', size);
    for (c = 0; c < (size*size); c++) {
        let cell = document.createElement("div");
        drawingArea.appendChild(cell).className = "grid-item";
    };
};
makeRows(size);
const colorPalette = document.getElementById('color-palette');
let pickedColor = 'lightgrey';
colorPalette.addEventListener('input', () => {
    pickedColor = colorPalette.value;
    const paletteCircle = document.querySelector('.palette-circle');
    paletteCircle.style.backgroundColor = pickedColor; 
    colorPalette.value = pickedColor;
})
const colorModeButton = document.getElementById('color-mode');
const rainbowModeButton = document.getElementById('rainbow-mode');
const eraserButton = document.getElementById('eraser');
const clearButton = document.getElementById('clear');
function disableAllButtons() {
    const buttons = document.querySelectorAll('.control-button');
    buttons.forEach((button) => {
        button.className = 'control-button';
    });
}
colorModeButton.addEventListener("click", () => {
    disableAllButtons();
    colorModeButton.classList.add('active');
});
rainbowModeButton.addEventListener("click", () => {
    disableAllButtons();
    rainbowModeButton.classList.add('active');
});
eraserButton.addEventListener("click", () => {
    disableAllButtons();
    eraserButton.classList.add('active');
});
clearButton.addEventListener("click", () => {
    disableAllButtons();
    clearButton.classList.add('active');
    size = prompt("Enter preferred canvas size: ");
    checkSize(size);
    makeRows(size);
    disableAllButtons();
    painting();
});
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}
function painting() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
        item.addEventListener("mouseover", () => {
            if (colorModeButton.classList.contains('active')) {
                item.style.backgroundColor = pickedColor;
            }
            else if (rainbowModeButton.classList.contains('active')) {
                item.style.backgroundColor = random_rgba();
            }
            else if (eraserButton.classList.contains('active')) {
                item.style.backgroundColor = "white";
            }
        })
    });
}
painting();
    