const container = document.querySelector('.container');
const button = document.querySelector('.btn');
const InputBox = document.querySelector('#input-box');
const TODOBOX = document.querySelector(".LIST-CARD");

function updateStorage() {
    const items = Array.from(container.querySelectorAll('.LIST-CARD')).map(item => {
        return {
            text: item.querySelector('span').innerText,
            checked: item.querySelector('input[type="checkbox"]').checked
        };
    });
    localStorage.setItem('LISTS', JSON.stringify(items));
}

function loadItems() {
    const storedItems = localStorage.getItem('LISTS');
    if (storedItems) {
        const items = JSON.parse(storedItems);
        items.forEach(item => {
            addItem(item.text, item.checked);
        });
    }
}

function addItem(text, checked = false) {
    const div = document.createElement("div");
    div.className = "LIST-CARD";
    const div2 = document.createElement('div');
    div2.id = "LIST";

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = checked;

    const span = document.createElement('span');
    span.innerText = text;

    const DeleteImage = document.createElement('img');
    DeleteImage.src = 'delete.svg';

    div.appendChild(div2);
    div2.appendChild(input);
    div2.append(span);
    div.append(DeleteImage);

    container.append(div);

    function inputcheck() {
        if (input.checked) {
            span.style.textDecoration = "line-through";
        } else {
            span.style.textDecoration = "none";
        }
        updateStorage();
    }

    input.addEventListener('change', inputcheck);
    inputcheck();

    DeleteImage.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.parentNode.remove();
            updateStorage();
        }
    });

    updateStorage();
}

function main() {
    if (InputBox.value != '') {
        addItem(InputBox.value);
        InputBox.value = '';
    }
}

button.addEventListener('click', main);

button.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
        main();
    }
});

// Load items when the page loads
document.addEventListener('DOMContentLoaded', loadItems);

