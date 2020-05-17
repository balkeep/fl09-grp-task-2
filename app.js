const root = document.querySelector('#mosaic-root');
let clickedCell;

const floor = num => num | 0;
const mathRandom = Math.random;
const random = (min, max) => {
    return floor(mathRandom() * max + min);
}

const indexOfElement = (element, arr) => {
    for (let row = 0; row < arr.length; row++) {
        const column = arr[row].indexOf(element);
        if (column > -1) {
            return {
                row,
                column
            }
        }
    }
    return null;
}
const elHlength = (elInd, arr, range) => {
    if (!elInd) {
        return
    }
    let row = elInd.row;
    let column = elInd.column;
    const el = arr[row][column];

    let counter = 0;

    while (range > 0 && column < arr[row].length && arr[row][column] === el) {
        counter += 1;
        column += 1;
        range -= 1;
    }

    return counter;
}
const elVlength = (elInd, arr, range) => {
    let row = elInd.row;
    let column = elInd.column;
    const el = arr[row][column];

    let counter = 0;

    while (range > 0 && row < arr.length && arr[row][column] === el) {
        counter += 1;
        row += 1;
        range -= 1;
    }

    return counter;
}

const spawnItem = (root, itemId, dotSize, coords, w, h) => {
    const item = document.createElement('div');
    root.appendChild(item);

    const classes = ['cell'];
    for (const c of classes) {
        item.classList.add(c);
    }

    item.id = itemId;
    item.tabIndex = 0;

    item.style.top = coords.row * dotSize;
    item.style.left = coords.column * dotSize;
    item.style.width = w * dotSize;
    item.style.height = h * dotSize;

    return item;
};

const setBorderColor = color => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.borderColor = color;
    })
}

const generateMosaic = (rootEl, mosaicX, mosaicY, randRange) => {
    rootEl.innerHTML = '';

    const matrix = [];
    for (let row = 0; row < mosaicY; row++) {
        matrix[row] = new Array(mosaicX).fill(0);
    }

    let indOfZero = indexOfElement(0, matrix);
    for (let index = 1; indOfZero; index++) {
        let widthRandom = random(1, randRange);
        let widthMax = elHlength(indOfZero, matrix, randRange);
        let width = widthRandom < widthMax ? widthRandom : widthMax;

        let heightRandom = random(1, randRange);
        let heightMax = elVlength(indOfZero, matrix, randRange);
        let height = heightRandom < heightMax ? heightRandom : heightMax;

        for (let i = indOfZero.row; i < indOfZero.row + height && i < matrix.length; i++) {
            matrix[i].fill(index, indOfZero.column, indOfZero.column + width)
        }

        spawnItem(rootEl, index, 5, indOfZero, width, height);

        indOfZero = indexOfElement(0, matrix);
    }

    return rootEl;
}

document.querySelector('#generate').onclick = () => {
    generateMosaic(root, MOSAIC_WIDTH, MOSAIC_HEIGHT, RANDOM_RANGE);
    setBorderColor(document.querySelector('#border-color').value);
}
document.querySelector('#mosaic-root').onclick = e => {
    clickedCell = e.target;
}
document.querySelector('#border-color').onchange = e => {
    setBorderColor(e.target.value);
}
document.querySelector('#fragment-color').onchange = e => {
    clickedCell.style.backgroundColor = e.target.value;
}

const MOSAIC_WIDTH = 250;
const MOSAIC_HEIGHT = 160;
const RANDOM_RANGE = 20;

generateMosaic(root, MOSAIC_WIDTH, MOSAIC_HEIGHT, RANDOM_RANGE);
setBorderColor(document.querySelector('#border-color').value);