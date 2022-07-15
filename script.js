const list = document.getElementById('lista-tarefas');

function onClickChangeBgColor(element) {
  element.addEventListener('click', (event) => {
    const selected = document.getElementsByClassName('selectedItem')[0];
    if (selected) {
      selected.classList.remove('selectedItem');
    }
    event.target.classList.add('selectedItem');
  });
}

function doubleClickEvent(element) {
  element.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('completed')) {
      event.target.classList.remove('completed');
    } else {
      event.target.classList.add('completed');
    }
  });
}
function createItem(text) {
  const listItem = document.createElement('li');
  listItem.innerText = text;
  onClickChangeBgColor(listItem);
  doubleClickEvent(listItem);
  list.appendChild(listItem);
}
function createCompletedItem(text) {
  const listItem = document.createElement('li');
  listItem.innerText = text;
  listItem.classList.add('completed');
  onClickChangeBgColor(listItem);
  doubleClickEvent(listItem);
  list.appendChild(listItem);
}

const addButton = document.getElementById('criar-tarefa');
addButton.addEventListener('click', () => {
  const inputText = document.getElementById('texto-tarefa').value;
  document.getElementById('texto-tarefa').value = '';
  createItem(inputText);
});

const clearButton = document.getElementById('apaga-tudo');
clearButton.addEventListener('click', () => {
  const allListItems = document.getElementsByTagName('li');
  for (let index = allListItems.length - 1; index >= 0; index -= 1) {
    allListItems[index].remove();
  }
});

const clearFinishedButton = document.getElementById('remover-finalizados');
clearFinishedButton.addEventListener('click', () => {
  const completedTasks = document.getElementsByClassName('completed');
  for (let index = completedTasks.length - 1; index >= 0; index -= 1) {
    completedTasks[index].remove();
  }
});

function isCompleted(element) {
  if (element.classList.contains('completed')) {
    return true;
  }
  return false;
}

const saveButton = document.getElementById('salvar-tarefas');
saveButton.addEventListener('click', () => {
  const allListItems = document.getElementsByTagName('li');
  const listItemsValues = [];
  for (let index = 0; index < allListItems.length; index += 1) {
    listItemsValues.push({
      value: allListItems[index].innerText,
      isCompleted: isCompleted(allListItems[index]),
    });
  }
  localStorage.setItem('items', JSON.stringify(listItemsValues));
});

const moveUpButton = document.getElementById('mover-cima');
moveUpButton.addEventListener('click', () => {
  const selectedItem = document.getElementsByClassName('selectedItem')[0];
  if (selectedItem && selectedItem.previousSibling !== null) {
    list.insertBefore(selectedItem, selectedItem.previousSibling);
  }
});

const moveDownButton = document.getElementById('mover-baixo');
moveDownButton.addEventListener('click', () => {
  const selectedItem = document.getElementsByClassName('selectedItem')[0];
  if (selectedItem && selectedItem.nextSibling !== null) {
    list.insertBefore(selectedItem.nextSibling, selectedItem);
  }
});

const removeSelectedButton = document.getElementById('remover-selecionado');
removeSelectedButton.addEventListener('click', () => {
  const selectedItem = document.getElementsByClassName('selectedItem')[0];
  selectedItem.remove();
});

function validateAndCreate(index, iterable) {
  if (iterable[index].isCompleted) {
    createCompletedItem(iterable[index].value);
  } else {
    createItem(iterable[index].value);
  }
}

window.onload = () => {
  if (localStorage.getItem('items') !== null) {
    const itemsValues = JSON.parse(localStorage.getItem('items'));
    for (let index = 0; index < itemsValues.length; index += 1) {
      validateAndCreate(index, itemsValues);
    }
  }
};
