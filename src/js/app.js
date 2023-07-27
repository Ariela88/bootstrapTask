import { Todo } from "./todo";
import { DbService } from "./service";
import { Manager } from "./manager";
import confetti from "canvas-confetti";


function addEventToButtons(){
  const sortTitleBtn = document.getElementById('sort-button-title')
  sortTitleBtn.addEventListener('click',()=> orderByTitle())

  const sortDateBtn = document.getElementById('sort-button-date')
  sortDateBtn.addEventListener('click',()=> orderByDate())

  const checkBtn = document.getElementById('sort-button-check')
  checkBtn.addEventListener('click',()=> orderByChecked())

  const addToDo = document.getElementById('add-to-do')
  addToDo.addEventListener('click',()=> addTodoWithTitle())

  
}
addEventToButtons();

let manager;
DbService.getAllTodos().then((todos) => {
  manager = new Manager(todos);
  render();
});

function render() {
  
  
  const snippetContent = document.getElementById("snippetContent");
  const divZero = document.createElement('div')
   

  //divZero.classList.add('container')
  divZero.classList.add('bootstrap')
  divZero.classList.add('snippets')
  divZero.classList.add('bootdeys')

  divZero.style.display = 'flex'
  divZero.style.flexWrap = 'wrap'
  divZero.style.gap = '30px'
  divZero.style.alignItems = 'center'
  divZero.style.justifyContent = 'center'
  divZero.style.margin = '0px'

  snippetContent.innerHTML = "";

  snippetContent.classList.add('containerDiv')
  // snippetContent.classList.add('bootstrap')
  // snippetContent.classList.add('snippets')
  // snippetContent.classList.add('bootdeys')
  for (let i = 0; i < manager.todoArray.length; i++) {
    const todo = manager.todoArray[i];

    // const headerH4 = document.createElement("h4");
    // const nodeH4 = document.createTextNode("To Do");
    // headerH4.appendChild(nodeH4);
    // headerH4.classList.add('title')
    

    const div1 = document.createElement('div')
    
    const div2 = document.createElement('div')

    const div3 = document.createElement('div')

    const div4 = document.createElement("div");

    div1.appendChild(div2)
    div2.appendChild(div3)
    div3.appendChild(div4)
    divZero.appendChild(div1)
   
    
    
    div1.classList.add('col-md-4')
    div1.classList.add('col-sm-6')
    div1.classList.add('content-card')

    div2.classList.add('big-shadow')

    div3.classList.add('card')
    div3.classList.add('card-just-text')
    

    div4.classList.add('content')

     //Data
    const dateH6 = document.createElement("h6");
    const dateNode = document.createTextNode(todo.creationDate.toISOString());

    dateH6.appendChild(dateNode);
    dateH6.classList.add('category')

    div4.appendChild(dateH6);
    
    //Title 
    const titleH4 = document.createElement("h4");
    const titleNode = document.createTextNode(todo.title);
    titleH4.appendChild(titleNode);
    titleH4.classList.add('title')
    // div4.appendChild(headerH4);
    div4.appendChild(titleH4);


    snippetContent.style.display = 'flex'
    snippetContent.style.flexWrap = 'wrap'
    snippetContent.style.gap = '30px'


    

   
    const completeBtn = document.createElement("button");

    const completeNode = document.createTextNode(todo.isCompleted ? '✘ Da fare' : '✔ Completato');

    completeBtn.appendChild(completeNode)

        div4.appendChild(completeBtn)

        completeBtn.classList.add('btn')
        completeBtn.classList.add('btn-light')
        completeBtn.classList.add('btn-compl')

    completeBtn.addEventListener("click", () => {

      if(!todo.isCompleted){
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

      }
      
      

      
      const modifiedTodo = { ...todo };
      

      modifiedTodo.isCompleted = !modifiedTodo.isCompleted;
      

      DbService.updateTodo(modifiedTodo).then((res) => {
        manager.changeCompleteStatus(i);
        render();
      });
    });

    if (todo.isCompleted) {
     
   
      //div.classList.add('todo-completed');
     div3.style.backgroundColor = '#bde4a8cc'
      ;

     
  }

    // completeBtn.appendChild(document.createTextNode("Da completare"));
    
 
   

    const deleteBtn = document.createElement("button");

    const deleteNode = document.createTextNode("🗑️ Elimina");

    deleteBtn.appendChild(deleteNode);

    

    div4.appendChild(deleteBtn);
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-light");
    deleteBtn.classList.add('btn-compl')

    deleteBtn.addEventListener("click", () => {
     

      DbService.deleteTodo(todo.id).then(() => {
        manager.deleteTodo(i);

        render();
      });
    });



    

    snippetContent.appendChild(divZero);
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

    

    input.value = ''
  }

  render()
}

export function orderByTitle() {
  manager.orderoDosByTitle();
  render();
}

export function orderByDate() {
  manager.ordertodosByDate();
  render();
}

export function orderByChecked(){

 
  manager.ordertodosByChecked();
  render();
  
  
}


// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
// myInput.focus()
// })