//Получим все элементы

const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todolist = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button');

inputBox.onkeyup = () => {
     let userData = inputBox.value; // получаем введенное пользователем значение
     if(userData.trim() != 0) { // если пользовательские значения — это не только пробелы
        addBtn.classList.add("active");
     } else {
        addBtn.classList.remove("active");
     }
}
showTasks();

addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New todo");// Получение localstorage
    if(getLocalStorage == null) { //Если ls null то
        listArr = []; // создаем пустой массив
    } else {
        listArr = JSON.parse(getLocalStorage);// преобразовываем строку в обьект
    }
    listArr.push(userData);
    localStorage.setItem("New todo", JSON.stringify(listArr)); // преобразовываем обьект в строку
    showTasks(); //
} 


// функция которая добавляет запись в список
function showTasks() {
    let getLocalStorage = localStorage.getItem("New todo");// Получение localstorage
    if(getLocalStorage == null) { //Если ls null то
        listArr = []; // создаем пустой массив
    } else {
        listArr = JSON.parse(getLocalStorage);// преобразовываем строку в обьект
    }
    const pendingNumb = document.querySelector('.pendingNumb');
    pendingNumb.textContent = listArr.length; // общее количество задач
    if(listArr.length > 0) { // Если в списке 0 заданий то кнопка становится активной в противном случае неактивна
        deleteAllBtn.classList.add("active");
    }else {
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick='deleteTask(${index})'><i class="fa-solid fa-trash"></i></span></li>`
    });

    todolist.innerHTML = newLiTag; //Добавляем новый li в ul
    inputBox.value = ''; // при добавлении очищает строку
}

// функция удаления элемента

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New todo");
    listArr = JSON.parse(getLocalStorage);

    listArr.splice(index, 1); // удалить определенный элемент списка
    // После удаления элемента снова обновить localstorage
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTasks();
}

// функция удаления всех элементов

deleteAllBtn.onclick = () => {
    listArr = []; // Пустой массив
    // После удаления элементов снова обновить localstorage
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTasks();
}