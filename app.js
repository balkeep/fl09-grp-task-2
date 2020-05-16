const root = document.querySelector('#mosaic-root');

const spawnItem = (tag, text, parent, classes, id) => {
    const item = document.createElement(tag);
    if (text) {
        item.appendChild(document.createTextNode(text));
    }
    if (parent) {
        parent.appendChild(item);
    }
    if (classes) {
        for (const c of classes) {
            item.classList.add(c);
        }
    }
    if (id) {
        item.id = id;
    }
    return item;
};

const funnyRandom = (n, sum) => {
    let acc = 0;
    let arrRes = [];
    let random = Math.random;
    let floor = num => num | 0;
    do {
        const num = floor(random() * n) + 1;
        arrRes.push(num);
        acc = arrRes.reduce((acc, el) => acc += el);
    } while (acc < sum - n);
    arrRes.push(sum - acc);

    //TODO: Remove this
    //arrRes.push(arrRes.reduce((acc, el) => acc += el));

    return arrRes;
}

for (let r = 0; r < 160; r++) {
    const tr = spawnItem('tr', '', root, ['table-row']);
    const spans = funnyRandom(10, 250);
    for (let s of spans) {
        const td = spawnItem('td', ' ', tr, ['table-cell']);
        td.colSpan = s;
    }
}
