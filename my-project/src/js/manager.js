import { DbService } from "./service";
import { Todo } from "./todo";

export class Manager {

    constructor(todoArray = []) {
        this.todoArray = todoArray

    }

    addTodo(todo) {

        this.todoArray.push(todo)

    }

    addTodoWithTitle(title) {

        const newTodo = new Todo(title)

        this.addToDo(newTodo)
        


    }

    orderoDosByTitle() {

        this.todoArray.sort((todo1, todo2) => todo1.compareByTitle(todo2))


    }

    ordertodosByDate() {


        this.todoArray.sort((todo1, todo2) => todo1.compareByDate(todo2))


    }

    changeCompleteStatus(index) {
        const todo = this.todoArray[index]
        todo.isCompleted = !todo.isCompleted
        
    }


    deleteTodo(index) {

        
        
        this.todoArray.splice(index, 1);
        
        

    }


}