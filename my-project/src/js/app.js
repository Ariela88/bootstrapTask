import { Todo } from "./todo";
import { DbService } from "./service";
import { Manager } from "./manager";

let manager;
DbService.getAllTodos().then((todos) => {
  manager = new Manager(todos);
  render();
});

function render() {
  const mainContainer = document.getElementById("main-container");

  mainContainer.innerHTML = "";

  mainContainer.style.display = 'flex'
  mainContainer.style.flexWrap = 'wrap'
  mainContainer.style.gap = '30px'
  for (let i = 0; i < manager.todoArray.length; i++) {
    const todo = manager.todoArray[i];

    const headerH5 = document.createElement("h5");
    const nodeH5 = document.createTextNode("To Do");
    headerH5.appendChild(nodeH5);
    
    const div = document.createElement("div");
    const titleStrong = document.createElement("strong");
    const titleNode = document.createTextNode(todo.title);
    div.appendChild(headerH5);
    div.classList.add("card");
    div.classList.add("text-bg-info");
    div.classList.add("mb-3");
    div.style.width ='300px';


    // if (todo.isCompleted) {

    //     div.classList.add('todo-completed')

    // }

    titleStrong.appendChild(titleNode);
    div.appendChild(titleStrong);

    const completeBtn = document.createElement("button");

    completeBtn.addEventListener("click", () => {
      const modifiedTodo = { ...todo };

      modifiedTodo.isCompleted = !modifiedTodo.isCompleted;

      DbService.updateTodo(modifiedTodo).then((res) => {
        manager.changeCompleteStatus(i);
        render();
      });
    });

    completeBtn.appendChild(document.createTextNode("completo"));
    div.appendChild(completeBtn);
    completeBtn.classList.add("completBtn");
    // completeBtn.addEventListener('mouseover', () => div.style.borderWidth = '3px')
    // completeBtn.addEventListener('mouseleave', () => div.style.borderWidth = '1px')

    const deleteBtn = document.createElement("button");

    const deleteNode = document.createTextNode("cancella");

    deleteBtn.appendChild(deleteNode);

    div.appendChild(deleteBtn);
    deleteBtn.classList.add("dltBtn");

    deleteBtn.addEventListener("click", () => {
      DbService.deleteTodo(todo.id).then(() => {
        manager.deleteTodo(i);

        render();
      });
    });

    const dateSpan = document.createElement("span");
    const dateNode = document.createTextNode(todo.creationDate.toISOString());

    dateSpan.appendChild(dateNode);
    div.appendChild(dateSpan);

    mainContainer.appendChild(div);
  }
}

function addTodoWithTitle() {
  const input = document.getElementById("eventIn");

  const title = input.value;

  if (title.trim() !== "") {
    const newTodo = new Todo(title, new Date(), false);

    DbService.saveTodo(newTodo).then((res) => {
      manager.addTodo(res);
      input.value = "";

      render();
    });

    manager.addTodoWithTitle(title)

    input.value = ''
  }

  render()
}

function orderByTitle() {
  manager.orderoDosByTitle();
  render();
}

function orderByDate() {
  manager.ordertodosByDate();
  render();
}
