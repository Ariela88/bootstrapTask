import { Todo } from "./todo";
import { Manager } from "./manager";

export class DbService {

    //GET

    static getAllTodos() {

        const url = 'https://64b512c7f3dbab5a95c6a4db.mockapi.io/todos/'

        return fetch(url)
            .then(resp => resp.json())
            .then(result => this.convertTodoArray(result))
            .catch(error => console.log(error.message))

    }


    //DELETE
    static deleteTodo(id) {



        const deleteUrl = 'https://64b512c7f3dbab5a95c6a4db.mockapi.io/todos/' + id;

        return fetch(deleteUrl, { method: 'delete' })
        .then(resp => resp.json())
    }

    static convertTodoArray(genericArray) {

        const tempArray = []

        for (const obj of genericArray) {

            const newTodo = new Todo(obj.title, new Date(obj.creationDate), obj.isCompleted, obj.id)

            tempArray.push(newTodo)


        }

        return tempArray


    }

    static convertTodo(obj) {
        const newTodo = new Todo(obj.title, new Date(obj.creationDate), obj.isCompleted, obj.id)
        return newTodo
    }


    //PUT


    static updateTodo(todo) {
        const updateUrl = 'https://64b512c7f3dbab5a95c6a4db.mockapi.io/todos/' + todo.id
       return fetch(updateUrl, {
            method: 'put', body: JSON.stringify(todo),
            headers: {
                'content-type': 'application/json'
            }
        }).then(resp => resp.json())
            .then(res => this.convertTodo(res))


    }


    //UPDATE

    static saveTodo(todo) {
        const postUrl = 'https://64b512c7f3dbab5a95c6a4db.mockapi.io/todos/'
        return fetch(postUrl, {
            method: 'post',
            body: JSON.stringify(todo),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(res => this.convertTodo(res))


    }


}